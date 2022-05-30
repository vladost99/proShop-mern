const AdminService = require("../services/AdminService");

class AdminController {

    async getAllUsers(req,res, next) {
        try {
            const users = await AdminService.getAllUsers();
            return res.json(users);
        }
        catch(e) {
            next(e);
        }
    }
    async deleteUser(req,res, next) {
        try {
            await AdminService.deleteUser(req.params.id);
            return res.json({message: 'User removed'});
        }
        catch(e) {
            next(e);
        }
    }

    async getUserById(req,res, next) {
        try {
            let user = await AdminService.getUserById(req.params.id);
            return res.json(user);
        }
        catch(e) {
            next(e);
        }
    }

    async updateUser(req,res,next) {
        try {
            let updateUser = await AdminService.updateUser(req.params.id, req.body);
            return res.json(updateUser); 
        }   
        catch(e) {
            next(e);
        }
    }

    async getAllOrders(req, res, next) {
        try {
            let orders = await AdminService.getAllOrders();
            res.json(orders);
        }
        catch(e) {
            next(e)
        }
    }

    async updateOrderToDelivered(req,res, next) {
        try {
            let updateOrder = await AdminService.updateOrderToDelivered(req);
            res.json(updateOrder);
        }
        catch(e) {
            next(e);
        }
    }

    async createProduct(req,res, next) {
        try {
            const createProduct = await AdminService.createProduct(req);
            res.json(createProduct);
        }
        catch(e) {
            next(e);
        }
    }

    async updateProduct(req,res,next) {
        try {
            const updateProduct = await AdminService.updateProduct(req);
            res.json(updateProduct);
        }
        catch(e) {
            next(e);
        }
    }

    async deleteProduct(req,res, next) {
        try {
            const deleteProduct = await AdminService.deleteProduct(req);
            res.json(deleteProduct);
        }
        catch(e) {
            next(e);
        }
    }
}


module.exports = new AdminController();