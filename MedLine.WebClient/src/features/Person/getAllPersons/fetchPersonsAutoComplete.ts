import apiClient from "../../../app/apiClient";

export const fetchPersonsAutoComplete = async (searchString: any) => {
    try {
        const response = await apiClient.get(`${import.meta.env.VITE_API_URL}User/GetPersonsAutoComplete?searchString=${searchString}`);
        return response.data
    } catch (e){
        console.error('Ошибка загрузки данных (fetchPersonsAutoComplete)');
    }
}