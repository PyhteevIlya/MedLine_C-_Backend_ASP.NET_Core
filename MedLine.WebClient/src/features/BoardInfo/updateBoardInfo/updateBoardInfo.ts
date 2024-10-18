import { BoardInfo } from "../../../entities/BoardInfo/model/type/boardInfo";
import apiClient from "../../../app/apiClient";

export const updateBoard = async (board: BoardInfo) => {
    try {
        const response = await apiClient.put(`${import.meta.env.VITE_API_URL}BoardInfo/UpdateBoard/${board.id}`, board, {withCredentials: true});
        
        return response;
    } catch (e) {
        console.error('Ошибка загрузки данных (updateDoctor)');
    }

}