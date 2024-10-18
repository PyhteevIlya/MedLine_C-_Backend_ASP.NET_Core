import apiClient from "../../../../app/apiClient";

export const fetchDoctor = async (params: any) => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}Doctors/GetDoctor?id=${params.id}`, {withCredentials: true});
        return response.data
    } catch (e){
        console.error('Ошибка загрузки данных (fetchDoctor)');
    }
}