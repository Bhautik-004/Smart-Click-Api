const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Order = require('../../Modals/Order Modal/OrderModal.js');

router.use(bodyParser.json());

router.post('/', async (req, res) => {

    if (Array.isArray(req.body.productId)) {
        (req.body.productId)?.map((productId) => {
            const order = new Order({
                userId: req.body.userId,
                productId: productId,
                address: req.body.address
            })
            order.save()
        })
        return (
            res.status(200).json({
                status: true,
                msg: 'Products ordered...!',
                data: []
            })
        )
    } else {
        const order = new Order({
            userId: req.body.userId,
            productId: req.body.productId,
            address: req.body.address
        })
        order.save()
            .then((product) => {
                res.status(200).json({
                    status: true,
                    msg: 'Product ordered...!',
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