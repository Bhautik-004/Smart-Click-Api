const express = require('express');
const router = express.Router();
const Cart = require('../../Modals/Cart Modal/CartModal.js');

router.post('/:id', async (req, res) => {
    const product = await Cart.findById(req.params.id)

    if (product.quantity !== 1) {
        await Cart.findByIdAndUpdate(req.params.id, {
            $set: { quantity: product.quantity - 1 }
        })
            .then((result) => {
                res.status(200).json({
                    status: true,
                    msg: "Quantity decreased...!",
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
    } else {
        return(
            res.status(200).json({
                status: true,
                msg: "You can not decreased quantity, Please remove product...!",
            }) 
        )
    }
})

module.exports = router;