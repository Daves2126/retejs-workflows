import { ClassicPreset as Classic } from 'rete';
import { DataflowNode } from 'rete-engine';
import { Exec } from './Exec';

export class StartNode extends Classic.Node implements DataflowNode {
    width = 180;
    height = 80;

    constructor(socket: Classic.Socket) {
        super('Start');
        this.addOutput('exec', new Classic.Output(socket, 'Exec', false));
    }

    data(): { exec: Exec[] } {
        return {
            exec: [{ executed: true, nodeId: this.id } as Exec]
        };
    }
}
