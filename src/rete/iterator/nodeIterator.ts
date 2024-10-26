import { DataflowEngine } from 'rete-engine';
import { AddNode, EndNode, DisplayImageNode } from "../nodes";
import { ImageDisplayControl } from "../control";
import { ClassicPreset as Classic, NodeEditor } from 'rete';
import { AreaPlugin } from 'rete-area-plugin';
import AreaExtra from "../area/areaExtra";
import Schemes from "../schemes/scheme";
import { StartNode } from "../nodes/executionNodes/StartNode";
import { Exec } from '../nodes/executionNodes/Exec';

export default async function iterateNodes(dataFlow: DataflowEngine<Schemes>, nodeEditor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>) {

  dataFlow.reset();

  // Start processing from the StartNode
  const startNode = nodeEditor.getNodes().find(node => node instanceof StartNode) as StartNode;
  if (!startNode) {
    console.error('No Start Node found');
    return;
  }

  const queue: Array<{ node: Classic.Node, inputs: Record<string, any> }> = [{ node: startNode, inputs: {} }];
  const visited = new Set();

  while (queue.length > 0) {
    const { node, inputs } = queue.shift()!;
    const outputData = await dataFlow.fetch(node.id);
    if (visited.has(node.id)) {
      continue;
    }
    visited.add(node.id);
    console.log(node.id, 'produces', outputData);

    // output  find the datatype exec[]
    const execs = outputData['exec'] || [] as Exec[];
    var executionResult = execs[0];
    console.log('Execution Result:', executionResult);
    const nodeView = area.nodeViews.get(node.id);

    if (executionResult?.executed === false) {
      const errorNode = area.nodeViews.get(executionResult?.nodeId);
      errorNode?.element?.style.setProperty('background', 'red', 'important');
      console.log('Execution failed at node:', node.id);
      break;
    } else {
      nodeView?.element?.style.setProperty('background', 'green', 'important');
    }

    if (node instanceof AddNode) {
      area.update('control', (node.controls['result'] as Classic.InputControl<'number'>).id);
    }

    if (node instanceof DisplayImageNode) {
      console.log('Updating DisplayImageNode', node.controls['imageUrlControl']);
      area.update('control', (node.controls['imageUrlControl'] as ImageDisplayControl).id);
    }

    const connections = nodeEditor.getConnections();
    const connection = Object.values(connections).find(output => output?.source == node.id && output?.sourceOutput === 'exec');
    if (connection) {
      const nextNode = nodeEditor.getNode(connection.target);
      if (nextNode) {
        queue.push({ node: nextNode, inputs: inputs });
      }
    }

    // reset background color
    setTimeout(() => {
      nodeView?.element?.style.setProperty('background', '', 'important');
    }, 500);
    if (node instanceof EndNode) {
      console.log('Process finished at EndNode:', node.id);
      break;
    }
  }
}
