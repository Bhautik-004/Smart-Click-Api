const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: Array,
    price: Number,
    discount: Number,
    rate: Number,
    extraOff: Number,
    about: String,
    description: Object,
    saller: String,
    createDate: Date,
    updateDate: Date
})

module.exports = mongoose.model('Product', productSchema);