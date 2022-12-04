const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: String,
    productId: {
        type: String, ref: 'Product'
    },

    quantity: Number
})

module.exports = mongoose.model('cart', cartSchema, 'cart');