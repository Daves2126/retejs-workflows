import { ClassicPreset as Classic } from 'rete';

export class ImageDisplayControl extends Classic.Control {
    constructor(public imageUrl: string) {
        super();
    }
}
