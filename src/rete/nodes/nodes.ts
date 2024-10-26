import {
    NumberNode,
    AddNode,
    StartNode,
    EndNode,
    LoadDogNode,
    DisplayImageNode
  } from './index';

type Node = NumberNode | AddNode | StartNode | EndNode | LoadDogNode | DisplayImageNode;

export default Node;
