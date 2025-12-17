const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/jwt')
const User = require("../models/User")
const bcrypt=require('bcrypt')

const login=async(req, res)=>
{
    try
    {
        const {email, password}=req.body
        const user=await User.findOne({email})
        if(!user)
            return res.status(400).json({message: "Invalid Email or Password"})
        const isMatch=await bcrypt.compare(password, user.passwordHash)
        if(!isMatch)
            return res.status(400).json({message: "Invalid Email or Password"})

        const token=jwt.sign({id:user._id, role:user.role}, JWT_SECRET, {expiresIn:'1d'})
        res.status(200).json({message: "Login Successfull", token: token})
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}
module.exports={login}