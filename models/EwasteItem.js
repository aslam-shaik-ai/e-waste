const mongoose=require('mongoose')
const itemSchema=mongoose.Schema(
    {
        category: {type:String, required:true},
        brand: {type:String},
        model: {type:String},
        description: {type:String},
        condition: {type:String, enum: ['working', 'non-working', 'broken', 'parts'], required:true},
        quantity: {type:Number, required:true, default:1},
        weightkg: {type:Number, default:0},
        createdAt: {type:Date, default:Date.now}
    }
)
module.exports=mongoose.model('EwasteItem', itemSchema)