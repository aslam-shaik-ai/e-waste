const express=require('express')
const activityRouter=express.Router()

const auth=require('../middleware/auth')
const { getCollectionLogs } = require('../controllers/activityController')
const logsAccessControl = require('../middleware/logAccessControl')

activityRouter.get('/collections/:id/logs', auth, logsAccessControl, getCollectionLogs)
module.exports=activityRouter