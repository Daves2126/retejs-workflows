
import { NodeEditor } from 'rete';
import Schemes from '../../schemes/scheme';
import { AreaPlugin } from 'rete-area-plugin';
import AreaExtra from '../../area/areaExtra';
import iterateNodes from '../../iterator/nodeIterator';
import { DataflowEngine } from 'rete-engine';

export default function setupRunWorkflowButton(
    container: HTMLElement,
    editor: NodeEditor<Schemes>,
    area: AreaPlugin<Schemes, AreaExtra>, flow: DataflowEngine<Schemes>
) {
    const runButton = document.createElement('button');
    runButton.innerText = 'Run Workflow';
    runButton.style.position = 'absolute';
    runButton.style.top = '10px'; // Adjust as needed
    runButton.style.right = '10px'; // Adjust as needed
    runButton.style.zIndex = '1000'; // Ensure it's above other elements
    container.appendChild(runButton);

    runButton.addEventListener('click', async () => {
        await iterateNodes(flow, editor, area); // Call the process function when the button is clicked
    });
}
