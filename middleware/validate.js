
const validate=async(req, res, next)=>
{
    const data=req.body
    console.log('Data', data)
    
    console.log('Middleware Check happend Successfully!')
    next()
}
module.exports=validate