const EDGE_API_URL = "http://127.0.0.1:5000/api/v1/health-dehumidifier/data-records/latest";

const EdgeService = {
    async getLatestHealthRecord(deviceId: string): Promise<object> {
        const response = await fetch(`${EDGE_API_URL}?device_id=${deviceId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });
        if (!response.ok) {
            const errorDetails = await response.text();
            console.error(`Error fetching latest health record: ${response.status} - ${errorDetails}`);
            throw new Error("Error fetching latest health record");
        }
        return response.json();
    },
};

export default EdgeService;

