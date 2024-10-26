
import { NodeEditor } from 'rete';
import Schemes from '../../schemes/scheme';

export default function setupExportWorkflowButton(
    container: HTMLElement,
    editor: NodeEditor<Schemes>
) {
    const exportButton = document.createElement('button');
    exportButton.innerText = 'Export Workflow';
    exportButton.style.position = 'absolute';
    exportButton.style.top = '50px';
    exportButton.style.right = '10px';
    exportButton.style.zIndex = '1000';
    container.appendChild(exportButton);

    exportButton.addEventListener('click', async () => {
        const workflowData = await exportWorkflow(editor);
        const blob = new Blob([JSON.stringify(workflowData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workflow.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}

async function exportWorkflow(editor: NodeEditor<Schemes>) {
    const nodes = editor.getNodes().map(node => {
        return node;
    });

    const connections = editor.getConnections().map(connection => {
        return {
            source: connection.source,
            sourceOutput: connection.sourceOutput,
            target: connection.target,
            targetInput: connection.targetInput,
        };
    });

    return {
        nodes,
        connections,
    };
}