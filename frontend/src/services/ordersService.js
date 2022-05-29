
import axios  from "../http/index";



export default class OrderService {
    
    static async createOrder(data) {
        return axios.post(`/api/orders`, data);
    }

    static async getOrderById(id) {
        return axios.get(`/api/orders/${id}`);
    }

    static async orderPaid(id, paymentResult) {
        return axios.put(`/api/orders/${id}/pay`, paymentResult);
    }

    static async getPayPalConfig() {
        return axios.get(`/api/config/paypal`);
    }

    static async getMyOrders() {
        return axios.get('/api/orders/myorders');
    }

    static async getAllOrders() {
        return axios.get('/api/orders');
    }

    static async orderDeliveredUpdate(id, data) {
        return axios.put(`/api/orders/${id}/delivered`,data);
    }

}