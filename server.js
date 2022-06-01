const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./backend/config/db');
const colors = require('colors');
const {notFound, errorHandler} = require('./backend/middleware/errorMiddleware');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();


if(process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   credentials: true,
   origin: true
}))


app.use('/api/products', require('./backend/routes/products'));
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/orders', require('./backend/routes/order'));

app.use('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


if(process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '/frontend/build')))
 
   app.get('*', (req, res) => {

      let fullPath = path.resolve(__dirname, 'frontend', 'build', 'index.html');
      console.log('path', fullPath);
      res.sendFile(fullPath)

   })
 } else {
   app.get('/', (req, res) => {
     res.send('API is running....')
   })
 }

//app.use(notFound);
app.use(errorHandler);

connectDB()
.then(() => {
   app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
})







