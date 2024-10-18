import apiClient from "../../../app/apiClient";

export const fetchBoard = async () => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}BoardInfo/GetBoard`);
        return response.data
    } catch (e){
        console.error('Ошибка загрузки данных (fetchBoard)');
    }
}