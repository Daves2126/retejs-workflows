export interface ControlData {
    id: string;
    type: string;
    options: {
      initial?: number | string;
      readonly?: boolean;
    };
    readonly: boolean;
    value: number | string;
  }
  