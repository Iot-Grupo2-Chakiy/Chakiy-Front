const API_BASE_URL = "https://chakiyiotsupermain-aqd8ephjbra0e5bf.canadacentral-01.azurewebsites.net/api/v1/iot-devices";

const IoTDevicesService = {
  /**
   * Create a new IoT device.
   * @param {Object} deviceData - The data for the new IoT device.
   * @returns {Promise<void>}
   */
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

  /**
   * Update the state of an IoT device by ID.
   * @param {number} id - The ID of the IoT device.
   * @param {Object} estadoData - The new state data.
   * @returns {Promise<void>}
   */
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

  /**
   * Get all IoT devices.
   * @returns {Promise<Object[]>} - A list of all IoT devices.
   */
  async getAllIoTDevices(): Promise<object[]> {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error fetching IoT devices");
    }
    return response.json();
  },

  /**
   * Get a specific IoT device by ID.
   * @param {number} id - The ID of the IoT device.
   * @returns {Promise<Object>} - The IoT device data.
   */
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