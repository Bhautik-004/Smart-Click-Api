const express = require('express');
const router = express.Router();
const Cart = require('../../Modals/Cart Modal/CartModal.js');

router.get('/:id', async (req, res) => {
    const products = await Cart.find({ userId: req.params.id }).populate({ path: "productId", select: ["name", "image", "price", "discount", "rate", "extraOff"] });

    let totalItems = 0;
    let totalRate = 0;
    let totalSaving = 0;

    products.map((product) => {
        for (let qty = 0; qty < product.quantity; qty++) {
            totalItems = totalItems + 1;
            totalRate = totalRate + product.productId.rate;
            totalSaving = totalSaving + product.productId.extraOff;
        }
    })
    res.status(200).json({
        status: true,
        msg: "Cart details...",
        data: {
            totalItems,
            totalRate,
            totalSaving
        }
    })
})

module.exports = router;