import type {HealthRecord} from "@/types/HealthRecord.ts";

const EDGE_API_URL = "https://cb42b2bc7d28.ngrok-free.app/api/v1/health-dehumidifier/data-records/latest";
const API_KEY = "apichakiykey";

const EdgeService = {
    async getLatestHealthRecord(deviceId: string): Promise<HealthRecord> {
        const response = await fetch(`${EDGE_API_URL}?device_id=${deviceId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-API-Key": API_KEY,
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
