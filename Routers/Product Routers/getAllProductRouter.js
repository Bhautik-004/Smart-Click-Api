const express = require('express');
const router = express.Router();
const Product = require('../../Modals/Product Modal/ProductModal.js');

router.get('/', async (req, res) => {
    await Product.find()
        .then((result) => {
            res.status(200).json({
                status: true,
                msg: "All product...",
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