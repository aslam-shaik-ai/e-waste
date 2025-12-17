const mongoose=require('mongoose')

const connectDB=async()=>
{
    try
    {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongoose Got Connected')
    }
    catch(err)
    {
        console.error("Please check the mongoose DB")
        process.exit(1)
    }
}
module.exports=connectDB