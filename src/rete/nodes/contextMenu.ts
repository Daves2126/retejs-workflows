import {
    NumberNode,
    AddNode,
    StartNode,
    EndNode,
    LoadDogNode,
    DisplayImageNode
} from './index';
import { ContextMenuPlugin, Presets as ContextMenuPresets } from 'rete-context-menu-plugin';
import Schemes from '../schemes/scheme';
import { ClassicPreset as Classic} from 'rete';

export default function contextMenuPlugin(socket: Classic.Socket): ContextMenuPlugin<Schemes> {
    return new ContextMenuPlugin<Schemes>({
        items: ContextMenuPresets.classic.setup([
            ['Number', () => new NumberNode(socket, 1)],
            ['Add', () => new AddNode(socket)],
            ['Start', () => new StartNode(socket)],
            ['End', () => new EndNode(socket)],
            ['Load Dog', () => new LoadDogNode(socket)],
            ['Display Image', () => new DisplayImageNode(socket)],
        ]),
    });
}
