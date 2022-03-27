interface IObjectKeys {
  [key: string]: string | number | Date | any;
}

interface Device {
  name: string
}

interface DataItem {
  x: number;
  y: number;
}

export interface DataModel extends IObjectKeys {
  timestamp?: number;
  device: Device;
  data: DataItem[];
}
