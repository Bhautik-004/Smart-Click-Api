const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Product = require('../../Modals/Product Modal/ProductModal.js');

router.use(bodyParser.json());

router.post('/', async (req, res) => {

    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        discount: req.body.discount,
        extraOff: Math.ceil((req.body.price * req.body.discount) / 100),
        rate: req.body.price - Math.ceil((req.body.price * req.body.discount) / 100),
        about: req.body.about,
        description: req.body.description,
        saller: req.body.saller,
        createDate: Date()
    })
    product.save()
        .then((result) => {
            res.status(200).json({
                status: true,
                msg: "Product added...",
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