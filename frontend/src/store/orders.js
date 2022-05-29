import OrderService from "services/ordersService";
import ErrorService from "services/errorService";
import { clearAnyTimeout } from "utils/clearAnyTimeout";
import { makeAutoObservable } from 'mobx';

class Orders {
    //rootStore
    loading = false;
    success = false;
    order = null;
    error = '';
    myOrders = [];
    loadingMyOrders = false;
    successDelivered = false;
    loadingDelivered = false;

    constructor(rootStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }

    changeLoading(value) {
        this.loading = value;
    }

    changeOrder(data) {
        this.order = data;
    }
    clearMyOrders() {
        this.myOrders = [];
    }
    changeUpdateDelivered(value) {
        this.successDelivered = value;
    }

   async createOrder(data) {
      
        this.loading = true;
        this.order = null;
        this.error = '';
      
        try {
            const response = await OrderService.createOrder(data);
            this.order = response.data;
            this.success = true;
            this.rootStore.cartStore.clearCartItems();
        }
        catch(error) {
            this.order = null;
            this.success = false;
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500,() => {this.error = ''});
        }
        finally {
            this.loading = false;
            this.order = null;
            clearAnyTimeout(100,() => {this.success = false});
        }
    }

    async getOrderDetails(id) {
        this.loading = true;
        this.order = null;
        this.error = '';
        try {
            const response = await OrderService.getOrderById(id)
            this.order = response.data;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500,() => {this.error = ''});
        }
        finally {
            this.loading = false;
        }
    }

    async getMyOrders() {
        this.myOrders = [];
        this.loadingMyOrders = true;
        this.error = '';
        try {
            const response = await OrderService.getMyOrders();
            this.myOrders = response.data;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500,() => {this.error = ''});
        }
        finally {
            this.loadingMyOrders = false;
        }
    }

    async getAllOrders() {
        this.myOrders = [];
        this.loadingMyOrders = true;
        this.error = '';
        try {
            const response = await OrderService.getAllOrders();
            this.myOrders = response.data;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500,() => {this.error = ''});
        }
        finally {
            this.loadingMyOrders = false;
        }
    }

    async orderDeliveredUpdate(data) {
        this.loadingDelivered = true;
        this.error = '';
        try {
           const response = await OrderService.orderDeliveredUpdate(data?._id,data);
            this.successDelivered = true;
            this.order = response.data;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500,() => {this.error = ''});
        }
        finally {
            this.loadingDelivered = false;
        }
    }

}


//const orders = new Orders();

//injectStores({orders});

export default Orders;