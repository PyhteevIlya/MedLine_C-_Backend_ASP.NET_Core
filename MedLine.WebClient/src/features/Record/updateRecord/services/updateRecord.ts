import { Record } from "../../../../entities/Record/model/type/record";
import apiClient from "../../../../app/apiClient";

export const updateRecord = async (id: any, record: Record) => {
    try {
        const response = await apiClient.put(`${import.meta.env.VITE_API_URL}RecordsAppointment/UpdateRecord/${id}`, record, {withCredentials: true});
        
        return response;
    } catch (e) {
        console.error('Ошибка загрузки данных (updateRecord)');
    }

}