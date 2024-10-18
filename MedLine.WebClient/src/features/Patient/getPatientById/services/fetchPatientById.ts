import apiClient from "../../../../app/apiClient";

export const fetchPatientById = async (id: any) => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}Patients/GetPatientById?id=${id}`, id);
        return response;
    } catch (e) {
        console.error('Ошибка загрузки данных (fetchPatientById)');
    }

}