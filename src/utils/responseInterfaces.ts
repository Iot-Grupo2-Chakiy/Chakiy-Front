export interface IoTDeviceResponse {
  id: number;
  name: string;
  sensorId: number;
  descripcion?: string;
  temperaturaMin: number;
  temperaturaMax: number;
  humedadMin: number;
  humedadMax: number;
  calidadDeAireMin: number;
  calidadDeAireMax: number;
  estado: boolean;
  // Propiedades de UI
  temperatura?: string;
  humedad?: string;
  ica?: string;
  umbrales?: string;
  ultimaAccion?: string;
  imagen?: string;
  activo?: boolean;
  isMainDevice?: boolean;
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