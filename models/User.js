const mongoose=require('mongoose')

const userSchema=mongoose.Schema(
    {
        name: {type:String, required:true},
        email: {type:String, required:true, unique:true, lowercase:true},
        passwordHash: {type:String, required:true},
        role: {type:String, enum:['user', 'technician', 'admin'], default: 'user'},
        phone :{type:Number, default:null},
        createdAt :{type:Date, default:Date.now}
    }
)
module.exports=mongoose.model('User', userSchema)