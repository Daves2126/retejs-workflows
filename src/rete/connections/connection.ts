import { ClassicPreset as Classic } from 'rete';
import Node from '../nodes/nodes';

export default class Connection<A extends Node, B extends Node> extends Classic.Connection<A, B> { }
