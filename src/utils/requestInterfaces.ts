// En requestInterfaces.ts
export interface CreateRoutineRequest {
  name: string;
  deviceId: number;
  condition: string;
  days: string[];
  startTime: string;
  endTime: string;
  ubication?: string;
  isDry?: boolean;
}

export interface UpdateRoutineRequest {
  name: string;
  deviceId: number;
  condition: string;
  days: string[];
  startTime: string;
  endTime: string;
  ubication: string;
  isDry: boolean;
}