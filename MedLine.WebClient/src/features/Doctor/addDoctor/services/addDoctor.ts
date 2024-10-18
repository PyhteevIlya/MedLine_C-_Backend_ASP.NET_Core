import apiClient from "../../../../app/apiClient";

export const addDoctor = async (doctor: any) => {
    try {
        const request = await apiClient.post(`${import.meta.env.VITE_API_URL}Doctors/CreateDoctor`, {
            id: doctor.id,
            fullName: doctor.fullName,
            specialization: doctor.specialization,
            description: doctor.description,
        });
        return request.data;
    } catch (e) {
        console.error('Ошибка загрузки данных (addDoctor)');
    }
}