import axios from "axios";
import StorageService from "./storageService";

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.receive('userInfo')?.token}`
    }
}

export default class UserService {

    static async login(data) {
        return axios.post('/api/auth/login', data, config);
    }
    static async register(data) {
        return axios.post('/api/auth/register', data, config);
    }
    static async getProfile() {
        return axios.get('/api/auth/profile', config);
    }

    static async updateProfile(data) {
        return axios.put('/api/auth/profile',data, config);
    }

    static async getListUsers() {
        return axios.get('/api/auth/users', config);
    }

    static async deleteUser(id) {
        return axios.delete(`/api/auth/user/${id}`, config);
    }

    static async getUserById(id) {
        return axios.get(`/api/auth/user/${id}`, config);
    }
    static async updateUser(id, data) {
        return axios.put(`/api/auth/user/${id}`, data, config);
    }
}