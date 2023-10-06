const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const { UserModel } = require("../models/userModel");
const limiter = require("../middleware/rateLimiter.middleware");
const userRoute = express()
require("dotenv").config()

userRoute.post("/register",limiter, async (req, res,next) => {
    
    try {
        const { name, email, password } = req.body;
        if (!name && !email && !password) return res.send("please provide name email and password")
        if (!name) return res.send("please provide name");
        if (!email) return res.send("please provide email");
        if (!password) return res.send("please provide password");
        if (!validator.isEmail(email)) return res.send("please provide correct email");
        if (password.length < 6) return res.send("please provide password length of 6 or greator then 6");
        if (password.length > 126) return res.send("please provide password length less then 126")

        const userInDb = await UserModel.findOne({ email: email });

        if (userInDb) return res.send("this email is already present");

        var hashPassword = await bcrypt.hash(password, 5)

        var user = await UserModel({ name, email, password: hashPassword }).save()
        res.send("user register successfully!")
    } catch (error) {
       next(error)
    }
})

userRoute.post("/login",limiter, async (req, res,next) => {
try{

    const { email, password } = req.body;


        if (!email && !password) return res.send("please provide email and password");
        if (!email) return res.send("please provide email");
        if (!password) return res.send("please provide password");
        if (!validator.isEmail(email)) return res.send("please provide correct email");

        const userInDb = await UserModel.findOne({ email: email })

        if (!userInDb) return res.send("you have to register first this email is not exist in db");

        const passwordResult = await bcrypt.compare(password, userInDb.password)

        if (!passwordResult) return res.send("wrong password")

        var token = jwt.sign({ email: email }, process.env.tokenKey);
        console.log(token)
        res.send({
            message: "login success",
            token: token
        })

    } catch (error) {
        next(error)
    }
})

module.exports = { userRoute }