const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const App = express();

const connectionUrl = process.env.CONNECTION_URL;
mongoose.connect(connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB Connected successfully.......!')
    })

App.use(cors());


App.use('/signup', require('./Routers/User Routers/signupRouter.js'));
App.use('/login', require('./Routers/User Routers/loginRouter.js'));
App.use('/findUser', require('./Routers/User Routers/findUserRouter.js'));
App.use('/editUserAddress', require('./Routers/User Routers/editUserAddressRouter.js'));

App.use('/addProduct', require('./Routers/Product Routers/addProductRouter.js'));
App.use('/getAllProducts', require('./Routers/Product Routers/getAllProductRouter.js'));
App.use('/getProduct', require('./Routers/Product Routers/getProductRouter.js'));

App.use('/addToCart', require('./Routers/Cart Routers/addToCartRouter.js'));
App.use('/getCart', require('./Routers/Cart Routers/getCartRouter.js'));
App.use('/removeFromCart', require('./Routers/Cart Routers/removeFromCartRouter.js'));
App.use('/increaseQty', require('./Routers/Cart Routers/increaseQtyRouter.js'));
App.use('/decreaseQty', require('./Routers/Cart Routers/decreaseQtyRouter.js'));
App.use('/getCartDetails', require('./Routers/Cart Routers/getCartDetailsRouter'));
App.use('/clearCart', require('./Routers/Cart Routers/clearCartRouter.js'));
App.use('/cartCount', require('./Routers/Cart Routers/getCartCountRouter'));

App.use('/addOrder', require('./Routers/Order Routes/addOrderRouter.js'));
App.use('/getOrders', require('./Routers/Order Routes/getOrderRouter.js'));
App.use('/cancelOrder', require('./Routers/Order Routes/cancelOrderRouter.js'));


App.use('/', (req, res) => {
    res.status(404).json({
        status: false,
        msg: 'Bad request....!'
    })
})


module.exports = App;