import { makeAutoObservable } from 'mobx';
//import {injectStores} from '@mobx-devtools/tools';
import ProductService from 'services/productService';
import ErrorService from 'services/errorService';
import { clearAnyTimeout } from 'utils/clearAnyTimeout';

class Products {
    //rootStore
    loading = false;
    error = '';
    errorProductsTop = '';
    products = [];
    productsTop = [];
    loadingProductsTop = false;
    detailProduct = null;
    message = '';
    page = 1;
    pages = 1;


    constructor(rootStore) {
        makeAutoObservable(this, { rootStore: false })
        //this.rootStore = rootStore
    }

   

    async getProducts(keyword = '', pageNumber) {
        this.loading = true;
        this.products = [];
        this.error = '';
        try {
            const response = await ProductService.getAll(keyword, pageNumber);
            this.products = response.data.products;
            this.page = response.data.page;
            this.pages = response.data.pages;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            this.page = 1;
            this.pages = 1;
            clearAnyTimeout(1700, () => {this.error = ''});
        }
        finally {
            this.loading = false;
        }
    }

    async getProductsTop() {
        this.loadingProductsTop = true;
        this.productsTop = [];
        this.error = '';
        try {
            const response = await ProductService.getTop();
            this.productsTop = response.data;
        }
        catch(error) {
            this.errorProductsTop = ErrorService.receiveMessage(error);
            clearAnyTimeout(1700, () => {this.errorProductsTop = ''});
        }
        finally {
            this.loadingProductsTop = false;
        }
    }

    async getDetailProduct(id) {
        this.loading = true;
        this.error = '';
        this.deleteProduct = null;
        try {
            const response = await ProductService.getDetail(`${id}`);
            this.detailProduct = response.data;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            
        }
        finally {
            this.loading = false;
        }
    }

   async delete (id) {
        this.loading = true;
        this.error = '';
        try {
            const response = await ProductService.deleteProduct(id);
            this.products = this.products.filter(product => product._id !== id);
            this.message = response.data.message;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500, () => {this.error = ''});
            
        }
        finally {
            this.loading = false;
        }
    }

    async createProduct() {
        this.loading = true;
        this.error = '';
        try {
            const response = await ProductService.create();
            this.products.push(response.data);
            return response.data._id;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500, () => {this.error = ''});
            
        }
        finally {
            this.loading = false;
        }
    }

    async updateProduct(id, data) {
        this.loading = true;
        this.error = '';
        try {
            const response = await ProductService.update(id,data);
            this.detailProduct = response.data;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500, () => {this.error = ''});
            
        }
        finally {
            this.loading = false;
        }
    }
}



export default Products;