const API_BASE_URL = "https://chakiyiotsupermain-aqd8ephjbra0e5bf.canadacentral-01.azurewebsites.net/api/v1/iot-devices";
const EDGE_API_URL = "http://127.0.0.1:5000";

const IoTDevicesService = {
  async createIoTDevice(deviceData: object): Promise<void> {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deviceData),
    });
    if (!response.ok) {
      console.log("Edge API URL:", EDGE_API_URL);
      throw new Error("Error creating IoT device");
    }
  },

  async updateIoTDeviceById(id: number, deviceData: object): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deviceData),
    });
    if (!response.ok) {
      throw new Error("Error updating IoT device");
    }
  },

  async updateIoTDeviceEstado(id: number, estadoData: object): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}/estado`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estadoData),
    });
    if (!response.ok) {
      throw new Error("Error updating IoT device state");
    }
  },

  async getAllIoTDevices(): Promise<object[]> {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error fetching IoT devices");
    }
    return response.json();
  },

  async getIoTDeviceById(id: number): Promise<object> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching IoT device by ID: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },

  async updateIoTMainDeviceById(id: number, mainDeviceData: object): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}/main-device`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mainDeviceData),
    });
    if (!response.ok) {
      throw new Error("Error updating IoT main device");
    }
  },

  async deleteIoTDeviceById(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(`Error deleting IoT device: ${response.status} - ${errorDetails}`);
      throw new Error("Error deleting IoT device");
    }
  }
};

export default IoTDevicesService;