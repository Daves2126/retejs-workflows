import { ClassicPreset as Classic, NodeEditor } from 'rete';
import { AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { ReactPlugin, Presets as ReactPresets } from 'rete-react-plugin';
import { createRoot } from 'react-dom/client';
import { DataflowEngine } from 'rete-engine';
import { AutoArrangePlugin, Presets as ArrangePresets } from 'rete-auto-arrange-plugin';
import { MinimapPlugin } from 'rete-minimap-plugin';
import { NumberNode } from './nodes/dataNodes/NumberNode';
import { AddNode } from './nodes/operationalNodes/AddNode';
import { StartNode } from './nodes/executionNodes/StartNode';
import { EndNode } from './nodes/executionNodes/EndNode';
import { LoadDogNode } from './nodes/operationalNodes/LoadDogNode';
import { DisplayImageNode } from './nodes/outputNodes/DisplayImageNode';
import AreaExtra from './area/areaExtra';
import Schemes from './schemes/scheme';
import Connection from './connections/connection';
import contextMenuPlugin from './nodes/contextMenu';
import setupAddNodePipeline from './pipelines/addNode';
import setupConnectionCreatedPipeline from './pipelines/connectionCreated';
import setupControlTrigger from './control/controlTrigger';
import setupLoadWorkflowButton from './workflowListeners/buttons/loadWorkflow';
import setupRunWorkflowButton from './workflowListeners/buttons/runWorkflow';
import setupExportWorkflowButton from './workflowListeners/buttons/exportWorkflow';

const mainSocket = new Classic.Socket('mainSocket');

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const reactRender = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  const contextMenu = contextMenuPlugin(mainSocket);
  const minimap = new MinimapPlugin<Schemes>();

  editor.use(area);
  area.use(reactRender);
  area.use(connection);
  area.use(contextMenu);
  area.use(minimap);
  setupAddNodePipeline(editor);
  setupConnectionCreatedPipeline(editor);
  connection.addPreset(ConnectionPresets.classic.setup());
  reactRender.addPreset(ReactPresets.classic.setup());
  reactRender.addPreset(ReactPresets.contextMenu.setup());
  reactRender.addPreset(ReactPresets.minimap.setup());
  reactRender.addPreset(setupControlTrigger());

  const dataflow = new DataflowEngine<Schemes>();
  editor.use(dataflow);

  const a = new NumberNode(mainSocket, 1);
  const b = new NumberNode(mainSocket, 1);
  const add = new AddNode(mainSocket);
  const start = new StartNode(mainSocket);
  const end = new EndNode(mainSocket);
  const loadDog = new LoadDogNode(mainSocket);
  const displayImage = new DisplayImageNode(mainSocket);
  await editor.addNode(a);
  await editor.addNode(b);
  await editor.addNode(add);
  await editor.addNode(start);
  await editor.addNode(end);
  await editor.addNode(loadDog);
  await editor.addNode(displayImage);

  await editor.addConnection(new Connection(a, 'value', add, 'a'));
  await editor.addConnection(new Connection(b, 'value', add, 'b'));
  await editor.addConnection(new Connection(start, 'exec', add, 'exec'));
  await editor.addConnection(new Connection(add, 'exec', loadDog, 'exec'));
  await editor.addConnection(new Connection(loadDog, 'exec', displayImage, 'exec'));
  await editor.addConnection(new Connection(loadDog, 'imageUrl', displayImage, 'imageUrl'));
  await editor.addConnection(new Connection(displayImage, 'exec', end, 'exec'));

  const arrange = new AutoArrangePlugin<Schemes>();
  arrange.addPreset(ArrangePresets.classic.setup());
  area.use(arrange);
  await arrange.layout();

  AreaExtensions.zoomAt(area, editor.getNodes());
  AreaExtensions.simpleNodesOrder(area);

  const selector = AreaExtensions.selector();
  const accumulating = AreaExtensions.accumulateOnCtrl();
  AreaExtensions.selectableNodes(area, selector, { accumulating });

  // Listeners
  setupLoadWorkflowButton(container, editor, area, mainSocket);
  setupRunWorkflowButton(container, editor, area, dataflow);
  setupExportWorkflowButton(container, editor);

  return {
    destroy: () => area.destroy(),
  };
}
