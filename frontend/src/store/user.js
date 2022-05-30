import { makeAutoObservable} from 'mobx';
import { clearAnyTimeout } from 'utils/clearAnyTimeout';
import UserService from 'services/userService';
import ErrorService from 'services/errorService';
import StorageService from 'services/storageService';


const LOCALSTORAGE_USERINFO = 'userInfo';

class User {
    
    userInfo = null;
    loading = false;
    error = '';
    user = null;
    success = false;
    userList = [];
    message = '';
    selectedUser = null;
    token = StorageService.receive('token') ? StorageService.receive('token') : null;

    constructor(rootStore) {
        makeAutoObservable(this, { rootStore: false })
        this.rootStore = rootStore;
    }


    async login(data) {
        this.loading = true;
        this.error = ''
        try {
            let response = await UserService.login(data);
            this.userInfo = {...response.data.user};
            this.user = {...response.data.user};
            this.token = response.data.accessToken;
            StorageService.save('token', response.data.accessToken);
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500, () => {this.error = ''});
        }
        finally {
            this.loading = false
        }
    }

    async checkAuth() {
        this.loading = true;
        this.error = '';
        try {
            let response = await UserService.refresh();
            this.userInfo = {...response.data.user};
            this.user = {...response.data.user};
            this.token = response.data.accessToken;
            StorageService.save('token', response.data.accessToken);
        }
        catch(error) {
            this.user = null;
            this.userInfo = null;
            StorageService.remove(LOCALSTORAGE_USERINFO);
            StorageService.remove('token');
            
        }
        finally {
            this.loading = false
        }
    }

    logout() {
        StorageService.remove('token');
        UserService.logout();
        this.userInfo = null;
        this.user = null;
        this.userList = [];
        this.rootStore.ordersStore.clearMyOrders();
    }
    
   async  register(data) {
        this.loading = true;
        this.error = '';
        try {
            let response = await UserService.register(data);
            this.userInfo = {...response.data.user};
            this.token = response.data.accessToken;
            StorageService.save('token', response.data.accessToken);
        }
        catch(error) {
            this.error = ErrorService.receiveMessage(error);
            clearAnyTimeout(1500, () => {this.error = ''});
        }
        finally {
            this.loading = false
        }
    }

   async getUserDetail() {
    this.loading = true;
    this.error = '';
    this.user = null;
    try {
        let response = await UserService.getProfile();
        this.user = response.data;
        this.userInfo = response.data;
    }
    catch(error) {
        this.error = ErrorService.receiveMessage(error);
        clearAnyTimeout(1500, () => {this.error = ''});
    }
    finally {
        this.loading = false
    }

   }

   async updateProfile(data) {
    this.loading = true;
    this.error = '';
    this.success = false;
    try {
        let response = await UserService.updateProfile(data);
        this.user = response.data;
        this.userInfo = response.data;
        this.success = true;
        StorageService.save(LOCALSTORAGE_USERINFO, this.userInfo);
    }
    catch(error) {
        this.success = false;
        this.error = ErrorService.receiveMessage(error);
        clearAnyTimeout(1500, () => {this.error = ''});
    }
    finally {
        clearAnyTimeout(1500, () => this.success = null);
        this.loading = false;
    }
   }

   async getUserList() { 
    this.loading = true;
    this.error = '';
    this.userList = [];
    try {
        let response = await UserService.getListUsers();
       
        this.userList = response.data;
        
    }
    catch(error) {
        this.error = ErrorService.receiveMessage(error);
        clearAnyTimeout(1500, () => {this.error = ''});
    }
    finally {
        this.loading = false;
    }
   }

   async deleteUser(id) {
    this.loading = true;
    this.error = '';
    this.message = '';
    try {
        let response = await UserService.deleteUser(id);
        this.message = response.data.message;
        this.userList = this.userList.filter(user => user._id !== id);
        
    }
    catch(error) {
        this.error = ErrorService.receiveMessage(error);
        clearAnyTimeout(1500, () => {this.error = ''});
    }
    finally {
        this.loading = false;
        clearAnyTimeout(2000, () => {this.message = ''});
    }
   }

   async getUserById(id) {
    this.loading = true;
    this.error = '';
    this.selectedUser = null;
    try {
        let response = await UserService.getUserById(id)
        this.selectedUser = response.data;
        
    }
    catch(error) {
        this.error = ErrorService.receiveMessage(error);
        clearAnyTimeout(1500, () => {this.error = ''});
    }
    finally {
        this.loading = false;
    }
   }

   async updateUser(id, data) {
    this.loading = true;
    this.error = '';
    try {
        let response = await UserService.updateUser(id, data);
        this.selectedUser = response.data;
        
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



export default User;