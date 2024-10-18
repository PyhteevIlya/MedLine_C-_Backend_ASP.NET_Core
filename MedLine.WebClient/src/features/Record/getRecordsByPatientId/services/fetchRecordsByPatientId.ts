import apiClient from "../../../../app/apiClient";

export const fetchRecordsByPatientId = async (patientId: any) => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}RecordsAppointment/GetRecordsByPatientId?patientId=${patientId}`, patientId);
        return response;
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchRecordsByPatientId)');
    }

}