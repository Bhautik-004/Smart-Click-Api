const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../../Modals/User Modal/UserModal.js')

router.use(bodyParser.json());

router.post('/', async(req, res) => {
    let isUserExist = await User.findOne({ email: req.body.email });

    if (isUserExist !== null) {
        res.status(400).json({
            status: false,
            msg: "User already exist...!"
        })
    } else {
        bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
            if (err) {
                res.status(401).json({
                    status: false,
                    msg: "Something went wrong please try again later...!",
                    data: err
                })
            } else {
                const user = new User({
                    fName: req.body.fName,
                    lName: req.body.lName,
                    email: req.body.email,
                    contact: req.body.contact,
                    password: hashPassword,
                    createDate: Date()

                })

                user.save()
                    .then((result) => {
                        res.status(200).json({
                            status: true,
                            msg: "Signup successfully...!",
                            data: {
                                fName: result.fName,
                                lName: result.lName,
                                email: result.email,
                                contact: result.email
                            }
                        })
                    })
                    .catch((err) => {
                        res.status(401).json({
                            status: false,
                            msg: "Something wrong try agail...!",
                            data: err
                        })
                    })
            }


        })
    }
})

module.exports = router;