import { NodeEditor } from 'rete';
import Schemes from '../schemes/scheme';
import { StartNode, EndNode } from '../nodes';

export default function setupAddNodePipeline(editor: NodeEditor<Schemes>) {
    editor.addPipe((context) => {
        if (context.type === 'nodecreated') {
          const startNodeCount = editor.getNodes().filter(node => node instanceof StartNode).length;
          const endNodeCount = editor.getNodes().filter(node => node instanceof EndNode).length;
    
          if (context.data.label == 'Start' && startNodeCount > 1) {
            alert('You cannot add more than one Start Node. The newly added node will be deleted.');
            editor.removeNode(context.data.id);
            return;
          }
    
          if (context.data.label == 'End' && endNodeCount > 1) {
            alert('You cannot add more than one End Node. The newly added node will be deleted.');
            editor.removeNode(context.data.id);
            return;
          }
        }
        return context;
      });
}