export interface IoTDeviceResponse {
  id: number;
  name: string;
  sensorId: number;
  estado: boolean;
}

export interface RoutineResponse {
  id?: number;
  name: string;
  device: IoTDeviceResponse;
  condition: string;
  days: string[];
  startTime: string;
  endTime: string;
  ubication?: string;
  isDry?: boolean;
}