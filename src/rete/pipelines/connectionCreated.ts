import { NodeEditor } from 'rete';
import Schemes from '../schemes/scheme';

export default function setupConnectionCreatedPipeline(editor: NodeEditor<Schemes>) {
    editor.addPipe((context) => {
        if (context.type === 'connectioncreated') {
            console.log('Connection created source', editor.getNode(context.data.source));
            console.log('Connection created target', editor.getNode(context.data.target));

            /*var sourceType = context.data.targetInput;
            var targetType = context.data.sourceOutput;
            if (sourceType !== targetType) {
              alert('You cannot connect different data types');
              editor.removeConnection(context.data.id);
              return;
            }*/
        }

        if (context.type === 'connectionremoved') {
            console.log('Connection removed:', context.data);
        }
        return context;
    });
}