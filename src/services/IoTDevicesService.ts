import axios from 'axios';

const BASE_URL = 'http://localhost:8091/api/v1/iot-devices';

export const IoTDevicesService = {
    /**
     * Create a new IoT device.
     * @param {Object} deviceData - The data for the new IoT device.
     * @returns {Promise<void>}
     */
    createIoTDevice: async (deviceData) => {
        await axios.post(BASE_URL, deviceData);
    },

    /**
     * Update the state of an IoT device by ID.
     * @param {number} id - The ID of the IoT device.
     * @param {Object} estadoData - The new state data.
     * @returns {Promise<void>}
     */
    updateIoTDeviceEstado: async (id, estadoData) => {
        await axios.patch(`${BASE_URL}/${id}/estado`, estadoData);
    },

    /**
     * Get all IoT devices.
     * @returns {Promise<Object[]>} - A list of all IoT devices.
     */
    getAllIoTDevices: async () => {
        const response = await axios.get(BASE_URL);
        return response.data;
    },

    /**
     * Get a specific IoT device by ID.
     * @param {number} id - The ID of the IoT device.
     * @returns {Promise<Object>} - The IoT device data.
     */
    getIoTDeviceById: async (id) => {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    },
};