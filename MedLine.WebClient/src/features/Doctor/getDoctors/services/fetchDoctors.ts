import apiClient from "../../../../app/apiClient";

export const fetchDoctors = async () => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}Doctors/GetDoctors`, {withCredentials: true});
        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchDoctors)');
    }
}