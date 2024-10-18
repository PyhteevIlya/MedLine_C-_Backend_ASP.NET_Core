import axios from "axios";
import rootStore from "./StoreProvider/rootStore/rootStore";

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
});
apiClient.defaults.withCredentials = true;
apiClient.interceptors.request.use(
(config) => {
    const token = localStorage.getItem('token')
    if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
},
(error) => {
    return Promise.reject(error)
}
)
apiClient.interceptors.response.use(
    (response) => { 
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // if(error.response.status === 401) {
            console.log(error)
            originalRequest._retry = true;
            try {
                const response = await apiClient.post(`${import.meta.env.VITE_API_URL}Auth/GenerateToken`, rootStore.User);
                console.log(response)
                console.log(localStorage.getItem('token'))
                const token = response.data;
                console.log(token)
                localStorage.setItem('token', token)
                console.log(localStorage.getItem('token'))
                apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
                originalRequest.headers['Authorization'] =  `Bearer ${token}`;
                console.log(apiClient(originalRequest))
                return apiClient(originalRequest)
            } catch (e) {
                console.error('Failed to refresh token', e);
            }
        // }
        return Promise.reject(error)
    }
)

export default apiClient