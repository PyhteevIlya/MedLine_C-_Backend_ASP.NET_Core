import { RecordsCreateModel } from "../../../../entities/Record/model/type/recordsCreateModel";
import apiClient from "../../../../app/apiClient";

export const createRecord = async (record: RecordsCreateModel) => {
    try {
        const response = await apiClient.post(`${import.meta.env.VITE_API_URL}RecordsAppointment/CreateRecord`, record, {withCredentials: true});

        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (createRecord)');
    }

}