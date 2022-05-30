const User = require('../models/user');
const Order = require('../models/order');
const ApiError = require('../exception/apiError');
const OrderError = require('../exception/orderError');

class AdminService {
    
    async getAllUsers() {
        try {
            const users = await User.find({});
            return users;
        }
        catch(e) {
            throw ApiError.BadRequest();    
        }
    }

    async deleteUser(userId) {
       
       try {
        const user = await User.findById(userId);
        if(user) return await user.remove();

       } catch(e) {
         throw ApiError.BadRequest();
       }

    }

    async getUserById(id) {       
        try {
            const user = await User.findById(id);
            if(user) return user;

            throw ApiError.UserNotFound();
        }
        catch(e) {
            throw ApiError.BadRequest();
        }
        
    }

    async updateUser(id, body) {
    
        try {
            const user = await User.findById(id);

            if(user) {
                user.name = body.name || user.name;
                user.email= body.email || user.email;
                user.isAdmin = body.isAdmin || user.isAdmin;
                
                const updateUser = await user.save();
                return {...new UserDto(updateUser)};
            }
        
              throw ApiError.UserNotFound();
        
            } catch(e) {
                throw ApiError.BadRequest();
            }
    }

    async getAllOrders() {
      try {
        const allOrders = await Order.find({}).populate('user', 'id name');
        return allOrders;
      }
      catch(e) {
          throw ApiError.BadRequest();
      }
    }

    async updateOrderToDelivered(req) {
       try {
        const order = await Order.findById(req.params.id);

        if(!order) throw OrderError.OrderNotFound()

       
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        return updatedOrder;
        
       }
       catch(e) {
           throw ApiError.BadRequest();
       }
    }
    
}


module.exports = new AdminService();