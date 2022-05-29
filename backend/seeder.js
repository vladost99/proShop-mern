const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products');
const Product = require('./models/product');
const Order = require('./models/order');
const User = require('./models/user');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const destroyData = async () => {
   try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data destroyed!.'.red.inverse);
    process.exit();
   }
   catch(err) {
       console.log(`${err}`.red.inverse);
       process.exit(1);
   }
}

const importData = async () => {
    try {
    
      //const createUsers = await User.insertMany(users);
      const adminUser = `626545495ffa6c839291aab5`;

      const sampleProducts = products.map((product, ind) => {
          return {...product, user: adminUser};
      });

      await Product.insertMany(sampleProducts);

      console.log('Data Imported!'.green.inverse);
      process.exit();
    }
    catch(error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}



if(process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}