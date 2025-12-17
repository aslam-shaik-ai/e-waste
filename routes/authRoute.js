const express=require('express')
const { login } = require('../controllers/authControllers')
const auth = require('../middleware/auth')
const authRouter=express.Router()
authRouter.post('/login', login)
module.exports=authRouter