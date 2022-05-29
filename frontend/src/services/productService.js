import axios  from "../http/index";



export default class ProductService {

   static async getAll(keyword = '', pageNumber =  1) {
       return axios.get(`/api/products?keyword=${keyword}&&pageNumber=${pageNumber}`);
   }

   static async getTop() {
       return axios.get(`/api/products/top`);
   }

   static async getDetail(id) {
       return axios.get(`/api/products/${id}/detail`);
   }
   static async deleteProduct(id) {
       return axios.delete(`/api/products/${id}`);
   }

   static async create() {
       return axios.post(`/api/products/create`,{});
   }

   static async update(id, data) {
       return axios.put(`/api/products/${id}`, data);
   }

   static async createReview(id, data) {
       return axios.post(`/api/products/${id}/reviews`, data);
   }
   
}