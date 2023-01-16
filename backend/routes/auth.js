const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
    body,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require("../config")
const jwt = require('jsonwebtoken');
//middleWare fetchuser to the the user data
const fetchUser = require("../middleware/fetchUser")
//declaring a secret that is to be signed with the token
const JWT_SECRET = config.authentication.JWT_SECRET;

//ROUTE 1:  create a user using : POST "api/auth/". no login required
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
            user: {
                id: user.id
            }
        }

        // data will be signed with JWT_SECRET which is a string
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);

        console.log(user);
        res.json({
            authToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("some error occured")

    }
})


// ROUTE 2: authenticate a user using : POST "api/auth/". no login required
router.post("/login", [
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter valid password").exists().isLength({
        min: 5
    })
], async (req, res) => {

    let success = false;
    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    // using javascript destructuring to remove email and password from req.body
    const {
        email,
        password
    } = req.body;

    try {
        //checking if the user exits in the db
        let user = await User.findOne({
            email
        });

        //if does not exits send an error
        if (!user) {
            return res.status(400).json({
                success,
                error: "Please login with correct credentials"
            })
        }

        //compare the password with the password from db.
        //bcrypt internally works to remove the salt from the password and compares the the entered password
        const passwordCompare = await bcrypt.compare(password, user.password);

        //if password does not match
        if (!passwordCompare) {
            return res.status(400).json({
                success,
                error: "Please login with correct credentials"
            })
        }

        // data object with user id will be send as token to the user        
        const data = {
            user: {
                id: user.id
            }
        }

        // data will be signed with JWT_SECRET which is a string
        const authToken = jwt.sign(data, JWT_SECRET);

        //sending authToken
        success = true;
        res.json({
            success,
            authToken
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("some error occured")
    }
})


// ROUTE 3: Get loggedin user details using post "/api/auth/getUser". Login required

router.post("/getUser", fetchUser , async (req, res) => {
    try {
       const userId = req.user.id;
       const user = await User.findById(userId).select("-password");
       res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error");
    }

})

module.exports = router;