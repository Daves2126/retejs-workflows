import Node from "../nodes/nodes";
import Connections from "../connections/connections";
import { GetSchemes } from 'rete';

type Schemes = GetSchemes<Node, Connections>;

export default Schemes;