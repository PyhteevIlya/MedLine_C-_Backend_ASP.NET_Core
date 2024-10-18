import { Doctor } from "../../../../entities/Doctor/model/type/doctor";
import apiClient from "../../../../app/apiClient";

export const updateDoctor = async (doctor: Doctor) => {
    try {
        const response = await apiClient.put(`${import.meta.env.VITE_API_URL}Doctors/UpdateDoctor/${doctor.id}`, doctor, {withCredentials: true});
        
        return response;
    } catch (e) {
        console.error('Ошибка загрузки данных (updateDoctor)');
    }

}