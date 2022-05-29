import ErrorService from "services/errorService";
import OrderService from "services/ordersService";
import { clearAnyTimeout } from "utils/clearAnyTimeout";
import { makeAutoObservable } from 'mobx';


class Payment {
    loadingPay = false;
    successPay = null;
    error = '';
    constructor(rootStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    async orderPay(id, resultData) {
        this.loadingPay = true;
        this.error = '';
        try {
            const response = await OrderService.orderPaid(id, resultData);
            this.rootStore.ordersStore.changeOrder(response.data);
            this.successPay = true;
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500,() => {this.error = ''});
        }
        finally {
            this.loadingPay = false;
            this.successPay = false;
        }
    }
}



export default Payment;