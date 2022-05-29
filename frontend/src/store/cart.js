import { makeAutoObservable } from 'mobx';
//import {injectStores} from '@mobx-devtools/tools';
import ErrorService from 'services/errorService';
import ProductService from 'services/productService';
import StorageService from 'services/storageService';

const CART_ITEMS_LOCALSTORAGE = 'cartItems';
const CART_SHIPPING_ADDRES_LOCALSTORAGE = 'shippingAddress';
const CART_PAYMENT_METHOD_LACALSTORAGE = 'paymentMethod';

class Cart {
   // rootStore
    cartItems =   StorageService.receive(CART_ITEMS_LOCALSTORAGE) || [];
    error = '';
    loading = false;
    shippingAddress = StorageService.receive(CART_SHIPPING_ADDRES_LOCALSTORAGE) || {};
    paymentMethod =  StorageService.receive(CART_PAYMENT_METHOD_LACALSTORAGE) || '';


    constructor(rootStore) {
        makeAutoObservable(this, { rootStore: false })
        //this.rootStore = rootStore
    }

    clearCartItems() {
        this.cartItems = [];
        StorageService.remove(CART_ITEMS_LOCALSTORAGE);
    }

    async addToCart(id, qty) {
        this.loading = true;
       try {
        const {data} =  await ProductService.getDetail(id);
        const item = {
            product: data?._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }; 
        const existItem = this.cartItems.find(x => x.product === item.product);

        if(existItem) {
              this.cartItems = this.cartItems.map(x => x.product === existItem.product ? item : x);  
        }
        else {
            this.cartItems = [...this.cartItems, item];
        }

        StorageService.save(CART_ITEMS_LOCALSTORAGE, this.cartItems);
       }
       catch(error) {
            this.error = ErrorService.receiveMessage(error);
       }
       finally {
            this.loading = false
       }
    }
    removeItem(id) {
        this.cartItems = this.cartItems.filter(item => item.product !== id);
        StorageService.save(CART_ITEMS_LOCALSTORAGE, this.cartItems);
    }

    saveShippingAddress(data) {
        this.shippingAddress = data;
        StorageService.save(CART_SHIPPING_ADDRES_LOCALSTORAGE, this.shippingAddress);
    }
    savePaymentMethod(payload) {
        this.paymentMethod = payload;
        StorageService.save(CART_PAYMENT_METHOD_LACALSTORAGE, payload);
    }
}

//const cart = new Cart();

//injectStores({cart});

export default Cart;