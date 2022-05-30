const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const ApiError = require('../exception/apiError');
const OrderError = require('../exception/orderError');
const ProductError = require('../exception/productError');
const storageService = require('../services/StorageService');

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

    async createProduct(req) {
        try {
              const createProduct = await Product.create({
                name: 'Sample name',
                price: 0,
                user: req.user._id,
                image: '/image/sample.jpg',
                brand: 'Sample Brand',
                category: 'Sample category',
                countInStock: 0,
                numReviews: 0,
                description: 'Sample description'
              })
              return createProduct;
        }
        catch(e) {
            throw ApiError.BadRequest();
        }
    }

    async updateProduct(req) {
        try {
            const {name, price, description, image, brand, category, countInStock} = req.body;
            const product = await Product.findById(req.params.id);

            if(!product) throw ProductError.productNotFound()
         
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image && image !== '/image/sample.jpg' ? await storageService.upload(req.params.id,image) : product.image;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.countInStock = countInStock || product.countInStock;

            const updateProduct = await product.save();
            return updateProduct;
        }

        catch(e) {
            throw ApiError.BadRequest();
        }
    }

    async deleteProduct(req) {
        try {
            const product = await Product.findById(req.params.id);

            if(!product) throw ProductError.productNotFound()
            
            await product.remove();
            return {message: 'Product removed'};
                       
        }
        catch(e) {
            throw ApiError.BadRequest();
        }
    }
    
}


module.exports = new AdminService();