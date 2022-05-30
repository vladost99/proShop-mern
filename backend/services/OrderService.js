const Order = require('../models/order');
const ApiError = require('../exception/apiError');
const OrderError = require('../exception/orderError');

class OrderService {

    async createOrder(body, user) {
        const {orderItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice, totalPrice} = body;
        
        if(orderItems && orderItems.length === 0) throw OrderError.OrdersNotFound()
            const order =  new Order({
                orderItems,
                shippingAddress,
                paymentMethod,
                itemPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                user: user._id
            });

           try {
            const createdOrder = await order.save();
            return createdOrder;
           } catch(e) { 
               throw ApiError.BadRequest() 
            }

    }

    async getOrderById(req) {
        try {
            const order = await Order.findById(req.params.id).populate('user', 'name email');

            if(!order) throw OrderError.OrderNotFound()

            return order;

        }
        catch(e) {
            throw ApiError.BadRequest()
        }    
    }


    async updateOrderToPaid(req) {
        try {
        const order = await Order.findById(req.params.id);

        if(!order) throw OrderError.OrderNotFound()


        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
            }

            const updateOrder = await order.save();
            return updateOrder;
     }

        catch(e) {
            throw ApiError.BadRequest();
        }
    }

    async getMyOrders(req) {
        try {
            const orders = await Order.find({user: req.user._id});
            return orders;
        }
        catch(e) {
            throw ApiError.BadRequest();
        }
    }

}


module.exports = new OrderService();