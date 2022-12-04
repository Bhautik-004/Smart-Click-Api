const express = require('express');
const router = express.Router();
const bodyPasrser = require('body-parser');
const User = require('../../Modals/User Modal/UserModal.js');

router.use(bodyPasrser.json());

router.post('/:id', async (req, res) => {

    await User.findByIdAndUpdate(req.params.id, {
        $push: {
            address: req.body.address
        }
    })
        .then((result) => {
            res.status(200).json({
                status: true,
                msg: "Address added...!",
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