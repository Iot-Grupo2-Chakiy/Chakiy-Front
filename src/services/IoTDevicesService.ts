import type { IoTDeviceResponse } from "@/utils/responseInterfaces";

const API_BASE_URL = "http://localhost:8091/api/v1/iot-devices";

const IoTDevicesService = {
  async getAllIoTDevices(): Promise<IoTDeviceResponse[]> {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error fetching IoT devices");
    }
    return response.json();
  }
}

export default IoTDevicesService;