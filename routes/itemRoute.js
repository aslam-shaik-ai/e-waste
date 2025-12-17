const express=require('express')
const {createItem, getAllItems, getItemById, updateItem, deleteItem}=require('../controllers/itemController')
const validate = require('../middleware/validate')
const router=express.Router()

router.post('/item', validate, createItem)
router.get('/items', validate, getAllItems)
router.get('/item/:id', validate, getItemById)
router.put('/item/:id', validate, updateItem)
router.delete('/item/:id', validate, deleteItem)

module.exports=router