import apiClient from "../../../../app/apiClient";

export const fetchRecordsByDoctorId = async (params: any) => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}RecordsAppointment/GetRecordsByDoctorId?doctorId=${params.id}`, {withCredentials: true, method: 'GET'});
        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchRecordsByDoctorId)');
    }

}