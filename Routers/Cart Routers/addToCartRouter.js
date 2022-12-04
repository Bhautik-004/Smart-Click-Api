const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Cart = require('../../Modals/Cart Modal/CartModal.js');

router.use(bodyParser.json());

router.post('/', async (req, res) => {

    const product = await Cart.findOne({ $and: [{ userId: req.body.userId }, { productId: req.body.productId }] });

    if (product !== null) {
        await Cart.findByIdAndUpdate(product._id, {
            $set: { quantity: product.quantity + 1 }
        })
            .then((product) => {
                res.status(200).json({
                    status: true,
                    msg: 'Product added...!',
                    data: product
                })
            })
    } else {
        const cart = new Cart({
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: 1
        })
        cart.save()
            .then((product) => {
                res.status(200).json({
                    status: true,
                    msg: 'Product added...!',
                    data: product
                })
            })
            .catch((error) => {
                console.log(error)
                res.status(401).json({
                    status: false,
                    msg: 'Something went wrong, Try again...',
                    data: error
                })
            })
    }
})

module.exports = router;