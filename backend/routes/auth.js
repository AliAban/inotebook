const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
    body,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const  config= require("../config")
const jwt = require('jsonwebtoken');

//declaring a secret that is to be signed with the token
const JWT_SECRET = config.authentication.JWT_SECRET;

//creat a user using : POST "api/auth/". no login required
router.post("/createUser", [
    body("name", "Enter a valid name").isLength({
        min: 3
    }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter valid password").isLength({
        min: 5
    })
], async (req, res) => {
    console.log(req.body);


    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {

        // if user does not exist then create a user and store in db        
        let user = await User.findOne({
            email: req.body.email
        });

        //if user exits send status 400 and a error json
        if (user) {
            return res.status(400).json({
                error: "Sorry a user with this email already exists!"
            })
        }
        
        // password salt. salt is a string that is added in the backend to make the password secure
        const salt = await bcrypt.genSalt()

        //creating a hash of the password
        let secPass = await bcrypt.hash(req.body.password, salt)
        
        // if user does not exits create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // data object with user id will be send as token to the user        
        const data = {
            user:{
                id: user.id
            }
        }
        
        // data will be signed with JWT_SECRET which is a string
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);

        console.log(user);
        res.json({authToken});
    } catch (error) {
        console.error(error);
        res.status(500).send("some error occured")

    }
})

module.exports = router;