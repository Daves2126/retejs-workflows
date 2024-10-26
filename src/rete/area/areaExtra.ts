import Schemes from "../schemes/scheme";
import { Area2D } from 'rete-area-plugin';
import { ReactArea2D } from 'rete-react-plugin';
import { ContextMenuExtra } from 'rete-context-menu-plugin';
import { MinimapExtra } from 'rete-minimap-plugin';


type AreaExtra =
  | Area2D<Schemes>
  | ReactArea2D<Schemes>
  | ContextMenuExtra
  | MinimapExtra;

export default AreaExtra;