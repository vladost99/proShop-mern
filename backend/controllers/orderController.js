const OrderService = require('../services/OrderService');

class OrderController {
    async createOrder(req,res, next) {
        try {
            const createOrder = await OrderService.createOrder(req.body, req.user);
            res.status(201).json(createOrder);
        }
        catch(e) {
            next(e)
        }
    }

    async getOrderById(req,res,next) {
        try {
            let order = await OrderService.getOrderById(req);
            res.json(order);
        }
        catch(e) {
            next(e)
        }
    }

    async updateOrderToPaid(req,res, next) {
        try {
            let updateOrder = await OrderService.updateOrderToPaid(req);
            res.json(updateOrder);
        }
        catch(e) {
            next(e)
        }
    }

    async getMyOrders(req,res,next) {
        try {
            const orders = await OrderService.getMyOrders(req);
            res.json(orders);
        }
        catch(e) {
            next(e)
        }
    }
}


module.exports = new OrderController();


