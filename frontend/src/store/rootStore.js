
import cartStore from 'store/cart';
import userStore from 'store/user';
import productStore from 'store/products';
import ordersStore from 'store/orders';
import paymentStore from 'store/payment';
import reviewsStore from 'store/reviews';

class RootStore {
    constructor() {
        this.userStore = new userStore(this);
        this.cartStore = new cartStore(this);
        this.productsStore = new productStore(this);
        this.ordersStore = new ordersStore(this);
        this.paymentStore = new paymentStore(this);
        this.reviewsStore = new reviewsStore(this);
    }
}



export default RootStore;