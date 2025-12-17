const STATUS_FLOW=require('../utils/statusFlow')

const canMoveToStatus=(currentStatus, nextStatus)=>
{
    const allowedNext=STATUS_FLOW[currentStatus]||[]
    return allowedNext.includes(nextStatus)
}
module.exports = canMoveToStatus
