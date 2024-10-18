import axios from "axios";

export const fetchPerson = async (userId: any) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}Auth/Auth?userId=${userId}`, {withCredentials: true});
        const token = response.data.token;
        localStorage.setItem('token', token)
        return response.data.user
    } catch (e){
        console.error('Ошибка загрузки данных (fetchPerson)');
    }
}