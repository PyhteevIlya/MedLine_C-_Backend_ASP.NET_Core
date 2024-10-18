import apiClient from "../../../../app/apiClient";

export const cancelingRecord = async (id: any) => {
    try {
        const response = await apiClient.put(`${import.meta.env.VITE_API_URL}RecordsAppointment/cancelingRecord/${id}`, id, {withCredentials: true});
        return response;
    } catch (e) {
        console.error('Ошибка загрузки данных (cancelingRecord)');
    }

}