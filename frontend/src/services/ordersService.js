
import axios  from 'axios';
import StorageService from './storageService';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${StorageService.receive('userInfo')?.token}`
    }
}

export default class OrderService {
    
    static async createOrder(data) {
        return axios.post(`/api/orders`, data, config);
    }

    static async getOrderById(id) {
        return axios.get(`/api/orders/${id}`, config);
    }

    static async orderPaid(id, paymentResult) {
        return axios.put(`/api/orders/${id}/pay`, paymentResult, config);
    }

    static async getPayPalConfig() {
        return axios.get(`/api/config/paypal`);
    }

    static async getMyOrders() {
        return axios.get('/api/orders/myorders', config);
    }

    static async getAllOrders() {
        return axios.get('/api/orders', config);
    }

    static async orderDeliveredUpdate(id, data) {
        return axios.put(`/api/orders/${id}/delivered`,data, config);
    }

}