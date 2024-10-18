import apiClient from "../../../../app/apiClient";

export const deleteRecordAppointment = async (id: any) => {
    try {
        const response = await apiClient.delete(`${import.meta.env.VITE_API_URL}RecordsAppointment/DeleteRecord/${id}`, {withCredentials: true, method: 'DELETE'});
        return response;
    } catch (e) {
        console.error('Ошибка загрузки данных (deleteRecordAppointment)');
    }
}