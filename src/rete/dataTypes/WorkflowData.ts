import { NodeData } from './NodeData';
import { ConnectionData } from './ConnectionData';

export interface WorkflowData {
  nodes: NodeData[];
  connections: ConnectionData[];
}
