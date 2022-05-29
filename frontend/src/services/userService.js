import axios  from "../http/index";



export default class UserService {

    static async login(data) {
        return axios.post('/api/auth/login', data);
    }
    static async register(data) {
        return axios.post('/api/auth/register', data);
    }

    static async refresh() {
        return axios.get(`/api/auth/refresh`, {withCredentials: true});
    }

    static async getProfile() {
        return axios.get('/api/auth/profile');
    }

    static async updateProfile(data) {
        return axios.put('/api/auth/profile',data);
    }

    static async getListUsers() {
        return axios.get('/api/auth/users');
    }

    static async deleteUser(id) {
        return axios.delete(`/api/auth/user/${id}`);
    }

    static async getUserById(id) {
        return axios.get(`/api/auth/user/${id}`);
    }
    static async updateUser(id, data) {
        return axios.put(`/api/auth/user/${id}`, data);
    }
    
    static async logout() {
        axios.post(`/api/auth/logout`);
    }
}