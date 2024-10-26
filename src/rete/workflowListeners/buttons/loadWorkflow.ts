import { ClassicPreset as Classic, NodeEditor } from 'rete';
import Schemes from '../../schemes/scheme';
import { WorkflowData } from '../../dataTypes/WorkflowData';
import {
    AddNode,
    DisplayImageNode,
    EndNode,
    LoadDogNode,
    NumberNode,
    StartNode

} from '../../nodes';
import { NodeData } from '../../dataTypes/NodeData';
import Connection from '../../connections/connection';
import { AutoArrangePlugin, Presets as ArrangePresets } from 'rete-auto-arrange-plugin';
import { AreaPlugin } from 'rete-area-plugin';
import AreaExtra from '../../area/areaExtra';
import Node from '../../nodes/nodes';

export default function setupLoadWorkflowButton(container: HTMLElement, editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>, socket: Classic.Socket) {
    const loadButton = document.createElement('button');
    loadButton.innerText = 'Load Workflow';
    loadButton.style.position = 'absolute';
    loadButton.style.top = '90px';
    loadButton.style.right = '10px';
    loadButton.style.zIndex = '1000';
    container.appendChild(loadButton);

    loadButton.addEventListener('click', async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';

        fileInput.addEventListener('change', async (event) => {
            const input = event.target as HTMLInputElement;
            if (!input || !input.files || input.files.length === 0) return;

            const file = input.files[0];

            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target?.result;
                if (typeof result === 'string') {
                    const workflowData = JSON.parse(result);
                    await loadWorkflow(workflowData, editor, area, socket);
                }
            };

            reader.readAsText(file);
        });

        fileInput.click();
    });
}

async function loadWorkflow(workflowData: WorkflowData, editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>, socket: Classic.Socket) {
    const { nodes, connections } = workflowData;

    var cleared = await editor.clear();
    console.log('Current workflow Cleared:', cleared);

    // Create a record to map node ids to node instances
    const nodeInstances: Record<string, Node> = {};  // Specify the type of nodeInstances

    // Iterate over each node and create an instance
    for (const nodeData of nodes) {
        const node = createNodeInstance(nodeData, socket);
        await editor.addNode(node);
        nodeInstances[nodeData.id] = node;  // Safely assign the node using its id
    }

    // Iterate over each connection and link nodes
    for (const connectionData of connections) {
        const sourceNode = nodeInstances[connectionData.source];
        const targetNode = nodeInstances[connectionData.target];

        if (sourceNode && targetNode) {
            await editor.addConnection(new Connection(sourceNode, connectionData.sourceOutput, targetNode, connectionData.targetInput));
        }
    }

    // Use the AutoArrangePlugin to layout nodes
    const arrange = new AutoArrangePlugin<Schemes>();
    arrange.addPreset(ArrangePresets.classic.setup());
    area.use(arrange);
    await arrange.layout();
}

function createNodeInstance(nodeData: NodeData, socket: Classic.Socket) {
    switch (nodeData.label) {
        case 'Number':
            const value = Number(nodeData.controls['value'].value) || 0;
            return new NumberNode(socket, value);
        case 'Add':
            return new AddNode(socket);
        case 'Start':
            return new StartNode(socket);
        case 'End':
            return new EndNode(socket);
        case 'Load Dog':
            return new LoadDogNode(socket);
        case 'Display Image':
            return new DisplayImageNode(socket);
        default:
            throw new Error(`Unknown node type: ${nodeData.label}`);
    }
}
