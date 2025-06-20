const API_BASE_URL = "https://chakiyiotsupermain-aqd8ephjbra0e5bf.canadacentral-01.azurewebsites.net/api/v1/log";

const AuditTrailService = {
    async getAllLogs(): Promise<object[]> {
        const response = await fetch(`${API_BASE_URL}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Error fetching logs");
        }
        return response.json();
    },

    async getLogById(id: number): Promise<object> {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Error fetching log by ID");
        }
        return response.json();
    },
};

export default AuditTrailService;