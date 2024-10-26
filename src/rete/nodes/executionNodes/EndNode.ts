import { ClassicPreset as Classic } from 'rete';
import { DataflowNode } from 'rete-engine';
import { Exec } from './Exec';

export class EndNode extends Classic.Node implements DataflowNode {
    width = 180;
    height = 80;

    constructor(socket: Classic.Socket) {
        super('End');
        this.addInput('exec', new Classic.Input(socket, 'Exec', false));
    }

    data(inputs: { exec: Exec[] }) {
        return {
            exec: inputs.exec || { executed: true, nodeId: this.id } as Exec,
        };
    }
}
