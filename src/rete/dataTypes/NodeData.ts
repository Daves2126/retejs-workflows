import { InputOutputData } from './InputOutputData';
import { ControlData } from './ControlData';

export interface NodeData {
  id: string;
  label: string;
  width: number;
  height: number;
  inputs: Record<string, InputOutputData>;
  outputs: Record<string, InputOutputData>;
  controls: Record<string, ControlData>;
}
