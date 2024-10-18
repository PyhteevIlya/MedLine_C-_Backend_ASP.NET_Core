import { useEffect, useState } from "react"
import packageJson from '../../package.json'
import apiClient from "./apiClient"

export default function Version() {
    const [currentVersion] = useState(packageJson.version)
    
    useEffect(() => {
        const checkVersion = async () => {
            try {
                const response = await apiClient.get(`${import.meta.env.VITE_API_URL}Auth/Version`, {withCredentials: true});
                const latestVersion = response.data.version;
                if(currentVersion !== latestVersion) {
                    alert('Доступна новая версия!');
                    window.location.reload();
                }
            } catch (error) {
                console.error('Ошибка при проверке версии:', error)
            }
        }
        checkVersion();
    })
}