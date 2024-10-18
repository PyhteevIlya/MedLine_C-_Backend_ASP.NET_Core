import apiClient from "../../../../app/apiClient";

export const fetchAllRecordsWithName = async () => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}RecordsAppointment/GetRecordsWithName`, {withCredentials: true});
        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchAllRecordsWithName)');
    }
}