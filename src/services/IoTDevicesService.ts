//const API_BASE_URL = "https://chakiyiotsupermain-aqd8ephjbra0e5bf.canadacentral-01.azurewebsites.net/api/v1/iot-devices";
const API_BASE_URL = "http://localhost:8091/api/v1/iot-devices";

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
      throw new Error("Error creating IoT device");
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
    });
    if (!response.ok) {
      throw new Error("Error fetching IoT device by ID");
    }
    return response.json();
  },
};

export default IoTDevicesService;