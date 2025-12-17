const adminOnly = (req, res, next) =>{
    try
    {
        if(req.user.role!=='admin')
            return res.status(404).json({message: "Admin access only"})
        next()
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
};

module.exports = adminOnly;
