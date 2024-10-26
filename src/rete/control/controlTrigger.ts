import { ClassicPreset as Classic } from 'rete';
import { Presets as ReactPresets } from 'rete-react-plugin';
import { ImageDisplayControl } from './imageDisplayControl/ImageDisplayControl';
import { CustomImage } from './imageDisplayControl/components/DisplayImage';

export default function setupControlTrigger() {
    return ReactPresets.classic.setup({
        customize: {
            control(data) {
                console.log('Customizing control:', data);
                if (data.payload instanceof ImageDisplayControl) {
                    console.log('Customizing ImageDisplayControl');
                    return CustomImage;
                }
                if (data.payload instanceof Classic.InputControl) {
                    return ReactPresets.classic.Control;
                }
                return null;
            },
        }
    })
}
