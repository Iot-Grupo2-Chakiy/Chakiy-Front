
export interface CreateRoutineRequest {
  name: string;
  deviceId: number;
  condition: string;
  days: string[];
  startTime: string;
  endTime: string;
  ubication?: string;
}

export interface UpdateRoutineRequest {
  name: string;
  deviceId: number;
  condition: string;
  days: string[];
  startTime: string;
  endTime: string;
  ubication?: string;
}