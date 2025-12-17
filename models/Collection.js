const mongoose=require('mongoose')
const collectionSchema=mongoose.Schema(
    {
        requester: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
        requesterName: {type:String, required:true},
        requesterPhone: {type:String, required:true},
        items: {type:mongoose.Schema.Types.ObjectId, ref:'EwasteItem', required:true},
        address: {type:String, required:true},
        preferredSlot: {type:String, default:null},
        status: {type:String, enum:['requested', 'assigned', 'picked', 'completed', 'cancelled'], required:true, default:'requested'},
        assignedTo: {type:mongoose.Schema.Types.ObjectId, ref:'User', default:null},
        pickupAt: {type:String, default:null},
        completedAt: {type:String, default:null},
        notes: {type:String, default:null},
        createdAt: {type:Date, default:Date.now},
        updatedAt: {type:String, default:null}
    }
)
module.exports=mongoose.model('Collection', collectionSchema)