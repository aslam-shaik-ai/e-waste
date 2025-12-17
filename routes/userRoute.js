const {createUser, getAllUsers, getUserById, updateUser, deleteUser}=require('../controllers/userController')
const express=require('express')
const validate = require('../middleware/validate')
const router=express.Router()

router.post('/user', validate, createUser)
router.get('/users', validate, getAllUsers)
router.get('/users/:id', validate, getUserById)
router.put('/user/:id', validate, updateUser)
router.delete('/user/:id', validate, deleteUser)

module.exports=router