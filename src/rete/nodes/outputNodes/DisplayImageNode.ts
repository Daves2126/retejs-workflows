import { ClassicPreset as Classic } from 'rete';
import { DataflowNode } from 'rete-engine';
import { Exec } from '../executionNodes/Exec';
import { ImageDisplayControl } from '../../control/imageDisplayControl/ImageDisplayControl';

export class DisplayImageNode extends Classic.Node implements DataflowNode {
    width = 180;
    height = 280;

    constructor(socket: Classic.Socket) {
        super('Display Image');

        this.addInput('exec', new Classic.Input(socket, 'Exec'));
        this.addInput('imageUrl', new Classic.Input(socket, 'Image URL', false));
        this.addOutput('exec', new Classic.Output(socket, 'Exec', false));

        const imageUrlControl = new ImageDisplayControl('https://static.wikia.nocookie.net/cowboybebop/images/d/d1/2_Ein2.png');
        this.addControl('imageUrlControl', imageUrlControl);
    }

    async data(inputs: { exec: Exec[]; imageUrl: string }) {
        const execInput = inputs.exec[0];

        if (execInput.executed) {
            const imageUrl = inputs.imageUrl || '';
            const imageUrlControl = this.controls['imageUrlControl'] as ImageDisplayControl;
            imageUrlControl.imageUrl = imageUrl[0];
            return {
                exec: { executed: true, nodeId: this.id } as Exec
            };
        }

        console.error('Error displaying image:', inputs);
        return {
            exec: { executed: false, nodeId: this.id } as Exec
        };
    }
}
