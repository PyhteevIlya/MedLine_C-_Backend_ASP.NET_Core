import apiClient from "../../../../app/apiClient";

export const fetchRecordsById = async (params: any) => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}RecordsAppointment/GetRecordById?id=${params.recordid}`, {withCredentials: true});

        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchRecordsById)');
    }

}