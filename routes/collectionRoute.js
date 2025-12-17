
const express=require('express')
const router=express.Router()
const { createCollection, getAllCollections, updateCollection, deleteCollection, assignTechnician, getAssignedCollection, markPicked, markCompleted }=require('../controllers/collectionController')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')
const adminOnly = require('../middleware/adminOnly')
const technicianOnly = require('../middleware/technicianOnly')

router.post('/collection', auth, createCollection)
router.get('/collections', auth, adminOnly, getAllCollections)
router.get('/collection/:id', auth, getAllCollections)
router.get('/collections/assigned', auth, technicianOnly, getAssignedCollection)
router.put('/collection/:id', updateCollection)
router.put('/collection/assign/:id', auth, adminOnly, assignTechnician)
router.put('/collection/pick/:id', auth, technicianOnly, markPicked)
router.put('/collection/complete/:id', auth, technicianOnly, markCompleted)
router.delete('/collection/:id', validate, deleteCollection)


module.exports=router