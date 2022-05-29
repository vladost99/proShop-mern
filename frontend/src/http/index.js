import axios from 'axios';
import StorageService from 'services/storageService';
import UserService from 'services/userService';
import rootStore from 'store/rootStore';
//export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${StorageService.receive('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response =  await UserService.refresh();
            localStorage.setItem('token', response.data.accessToken);
            rootStore.userStore.user = response.data.user;
            rootStore.userStore.userInfo = response.data.user;
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})

export default $api;