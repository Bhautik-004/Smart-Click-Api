const express = require('express');
const router = express.Router();
const Order = require('../../Modals/Order Modal/OrderModal.js');

router.post('/:id', async (req, res) => {
    await Order.findByIdAndRemove(req.params.id )
        .then((result) => {
            res.status(200).json({
                status: true,
                msg: "Order canceled...!",
                data: result
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(401).json({
                status: false,
                msg: 'Something went wrong, Try again...',
                data: err
            })
        })
})

module.exports = router;