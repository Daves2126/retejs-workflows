import { SocketData } from './SocketData';
import { ControlData } from './ControlData';

export interface InputOutputData {
  socket: SocketData;
  label: string;
  id: string;
  control?: ControlData | null;
  showControl?: boolean;
  multipleConnections?: boolean;
}
