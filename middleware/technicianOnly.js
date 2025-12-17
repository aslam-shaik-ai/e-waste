const technicianOnly=async(req, res, next)=>
{
    try
    {
        if(req.user.role!=='technician')
            return res.status(404).json({message: "Technician Access Only"})
        next()
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}
module.exports=technicianOnly