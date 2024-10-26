import {
    NumberNode,
    AddNode,
    StartNode,
    EndNode,
    LoadDogNode,
    DisplayImageNode
  } from '../nodes/index';
import Connection from './connection';

type Connections =
  | Connection<NumberNode, AddNode>
  | Connection<AddNode, AddNode>
  | Connection<AddNode, NumberNode>
  | Connection<StartNode, AddNode>
  | Connection<AddNode, EndNode>
  | Connection<StartNode, LoadDogNode>
  | Connection<LoadDogNode, EndNode>
  | Connection<LoadDogNode, DisplayImageNode>
  | Connection<DisplayImageNode, EndNode>;

export default Connections;