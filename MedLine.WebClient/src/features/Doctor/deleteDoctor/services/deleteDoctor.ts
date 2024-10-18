import apiClient from "../../../../app/apiClient";

export const deleteDoctor = async (id: any) => {
    try {
        const response = await apiClient.delete(`${import.meta.env.VITE_API_URL}Doctors/DeleteDoctor/${id}`, id);
        return response;
    } catch (e) {
        console.error('Ошибка загрузки данных (deleteDoctor)');
    }
}