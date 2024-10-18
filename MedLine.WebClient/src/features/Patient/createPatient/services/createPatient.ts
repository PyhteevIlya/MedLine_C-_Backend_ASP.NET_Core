import { Patient } from "../../../../entities/Patient/model/type/patient";
import apiClient from "../../../../app/apiClient";

export const createPatient = async (patient: Patient) => {
    try {
        const response = await apiClient.post(`${import.meta.env.VITE_API_URL}Patients/CreatePatient`, patient);

        return response.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (createPatient)');
    }

}