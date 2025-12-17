const { hash } = require('bcrypt')
const User=require('../models/User')

// POST

const createUser=async(req, res)=>
{
    try
    {
        const{name, email, password, role, phone}=req.body
        if(!name||!email||!password)
        {
            return res.status(400).json({message: "name, email and password are required"})
        }
        const exists=await User.findOne({email})
        if(exists)
        {
            return res.status(400).json({message: "Email is already Registered!"})
        }
        const passwordHash=await hash(password, 10)

        const user=await User.create({name, email, passwordHash, role, phone})
        res.status(200).json({message: "User Got Created Successfully!"})
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

// GET

const getAllUsers=async(req, res)=>
{
  try
  {
    const users=await User.find()
    res.status(200).json(users)
  }
  catch(err)
  {
    res.status(400).json({message: err.message})
  }
}

// GET By ID

const getUserById=async(req, res)=>
{
  try
  {
    const data=req.params.id
    const user=await User.findById(data)
    res.status(200).json(user)
  }
  catch(err)
  {
    res.status(500).json({message: err.message})
  }
}

// PUT By ID

const updateUser=async(req, res)=>
{
  try
  {
    const id=req.params.id
    const data=req.body
    const user=await User.findByIdAndUpdate(id, data)
    res.status(200).json(user)
  }
  catch(err)
  {
    res.status(400).json({message: err.message})
  }
}

// DELETE By ID

const deleteUser=async(req, res)=>
{
  try
  {
    const data=req.params.id
    const user=await User.findByIdAndDelete(data)
    res.status(201).json({message: "Data Got Deleted Successfully!"})
  }
  catch(err)
  {
    res.status(404).json({message: err.message})
  }
}
module.exports={createUser, getAllUsers, getUserById, updateUser, deleteUser}

