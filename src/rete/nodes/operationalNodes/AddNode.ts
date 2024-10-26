import { ClassicPreset as Classic } from 'rete';
import { DataflowNode } from 'rete-engine';
import { Exec } from '../executionNodes/Exec';

export class AddNode extends Classic.Node implements DataflowNode {
    width = 180;
    height = 260;

    constructor(socket: Classic.Socket) {
        super('Add');

        this.addInput('exec', new Classic.Input(socket, 'Exec', false));
        this.addOutput('exec', new Classic.Output(socket, 'Exec', false));
        this.addInput('a', new Classic.Input(socket, 'A'));
        this.addInput('b', new Classic.Input(socket, 'B'));
        this.addOutput('value', new Classic.Output(socket, 'Number'));
        this.addControl('result', new Classic.InputControl('number', { initial: 0, readonly: true }));
    }

    data(inputs: { exec: Exec[]; a?: number[]; b?: number[] }) {
        const { a = [], b = [], exec } = inputs;
        const sum = (a[0] || 0) + (b[0] || 0);
        (this.controls['result'] as Classic.InputControl<'number'>).setValue(sum);

        return {
            value: sum,
            exec: { executed: true, nodeId: this.id } as Exec
        };
    }
}