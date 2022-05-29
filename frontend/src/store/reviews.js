import { makeAutoObservable} from 'mobx';
import ProductService from 'services/productService';
import ErrorService from 'services/errorService';
import { clearAnyTimeout } from 'utils/clearAnyTimeout';

class Reviews {

    loading = false;
    errorRev = '';
    success = false;

    constructor() {
        makeAutoObservable(this, { rootStore: false })
        //this.rootStore = rootStore;
    }

    changeSuccess(value) {
        this.success = value;
    }
    clearError() {
        this.errorRev = '';
    }


    async createProductReview(data) {
        this.loading = true;
        this.success = false;
        this.errorRev = '';
        try {
           await ProductService.createReview(data?._id, data);
           this.success = true;
        }
        catch(error) {
            this.errorRev = ErrorService.receiveMessage(error);
            clearAnyTimeout(500, () => {this.errorRev = ''});
           // setTimeout(() => this.clearError(), 600)
        }
        finally {
            this.loading = false;
            this.success = false;
        }
    }
}


export default Reviews;