const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../../Modals/User Modal/UserModal.js');

router.use(bodyParser.json());

router.post('/:id', async (req, res) => {
    await User.findOne({ token: req.params.id })
        .then((user) => {
            if (user === null) {
                return (
                    res.status(204).json({
                        status: false,
                        msg: "User does not found...!"
                    })
                )
            } else {
                return (
                    res.status(200).json({
                        status: true,
                        msg: "User find successfully...!",
                        data: {
                            _id: user._id,
                            fName: user.fName,
                            lName: user.lName,
                            email: user.email,
                            contact: user.contact,
                            address: user.address,
                            token: user.token
                        }
                    })
                )
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(401).json({
                status: false,
                msg: "Something went wrong, Please try again latter...!"
            })
        })
})

module.exports = router;