import apiClient from "../../../app/apiClient";

export const fetchPersons89Department = async () => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}User/Get89Department`);
        return response.data
    } catch (e){
        console.error('Ошибка загрузки данных (fetchPersons89Department)');
    }
}