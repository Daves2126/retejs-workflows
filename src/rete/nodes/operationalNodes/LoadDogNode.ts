import { ClassicPreset as Classic } from 'rete';
import { DataflowNode } from 'rete-engine';
import { Exec } from '../executionNodes/Exec';
import axios from 'axios';

export class LoadDogNode extends Classic.Node implements DataflowNode {
    width = 180;
    height = 160;

    constructor(socket: Classic.Socket) {
        super('Load Dog');
        this.addInput('exec', new Classic.Input(socket, 'Exec', false));
        this.addOutput('exec', new Classic.Output(socket, 'Exec', false));
        this.addOutput('imageUrl', new Classic.Output(socket, 'Image URL'));
    }

    async data(inputs: { exec: Exec[] }) {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            const imageUrl = response.data.message;
            return {
                imageUrl: imageUrl,
                exec: { executed: true, nodeId: this.id } as Exec
            };
        } catch (error) {
            console.error('Error fetching dog image:', error);
            return {
                imageUrl: null,
                exec: { executed: false, nodeId: this.id } as Exec
            };
        }
    }
}
