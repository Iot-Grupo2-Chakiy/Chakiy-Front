import type { CreateRoutineRequest, UpdateRoutineRequest } from "@/utils/requestInterfaces";
import type { RoutineResponse } from "@/utils/responseInterfaces";

const API_BASE_URL = "http://localhost:8091/api/v1/routine";


const RoutineService = {
  // Obtener todas las rutinas
  async getAllRoutines(): Promise<RoutineResponse[]> {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error fetching routines");
    }
    return response.json();
  },

  // Obtener una rutina por ID
  async getRoutineById(id: number): Promise<RoutineResponse> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error fetching routine with ID ${id}`);
    }
    return response.json();
  },

  // Crear una nueva rutina
  async createRoutine(
    resource: CreateRoutineRequest
  ): Promise<RoutineResponse> {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });
    if (!response.ok) {
      throw new Error("Error creating routine");
    }
    return response.json();
  },

  // Actualizar una rutina existente
  async updateRoutine(
    id: number,
    resource: UpdateRoutineRequest
  ): Promise<RoutineResponse> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });
    if (!response.ok) {
      throw new Error(`Error updating routine with ID ${id}`);
    }
    return response.json();
  },

  // Eliminar una rutina
  async deleteRoutine(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting routine with ID ${id}`);
    }
  },
};

export default RoutineService;
