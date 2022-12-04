const dotenv = require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../../Modals/User Modal/UserModal.js');

router.use(bodyParser.json());

router.post('/', async(req, res) => {

    await User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user == null) {
                res.status(401).json({
                    status: false,
                    msg: " User does not found...!"
                })

            } else {
                bcrypt.compare(req.body.password, user.password, async(err, result) => {
                    if (!result) {
                        res.status(401).json({
                            status: false,
                            msg: "Password does not match...!"
                        })

                    } else {
                        const token = jwt.sign({
                                userName: user.fName,
                                userName: user.lName,
                                email: user.email,
                                contact: user.contact

                            },
                            process.env.TOKEN_SECRET_KEY, {
                                expiresIn: "24h"
                            }
                        );
                        await User.findOneAndUpdate({ email: user.email }, {
                            $set: { token: token }
                        })
                        res.status(200).json({
                            status: true,
                            msg: "Login successfully...!",
                            data: {
                                _id: user._id,
                                fName: user.fName,
                                lName: user.lName,
                                email: user.email,
                                contact: user.contact,
                                address: user.address,
                                token: token
                            }
                        })
                    }
                })
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