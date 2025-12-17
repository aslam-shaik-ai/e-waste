const Collection=require('../models/Collection')

// Admin Dashboard Controller

const adminDashboard = async (req, res) => {
  try 
  {
    const total = await Collection.countDocuments();
    const requested = await Collection.countDocuments({ status: 'requested' });
    const assigned = await Collection.countDocuments({ status: 'assigned' });
    const picked = await Collection.countDocuments({ status: 'picked' });
    const completed = await Collection.countDocuments({ status: 'completed' });
    res.status(200).json({total, requested, assigned, picked, completed});
  } 
  catch(err) 
  {
    res.status(500).json({ message: err.message });
  }
}

// Technician Dashboard Controller 

const technicianDashboard = async (req, res) => {
  try 
  {
    const technicianId = req.user.id;
    const assigned = await Collection.countDocuments({assignedTo: technicianId, status: 'assigned'});
    const picked = await Collection.countDocuments({assignedTo: technicianId, status: 'picked'});
    const completed = await Collection.countDocuments({assignedTo: technicianId, status: 'completed'});
    res.status(200).json({assigned, picked, completed});
  } 
  catch(err) 
  {
    res.status(500).json({ message: err.message });
  }
}
module.exports={adminDashboard, technicianDashboard}