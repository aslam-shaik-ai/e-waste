const EwasteItem = require('../models/EwasteItem');
const EWasteItem = require('../models/EwasteItem');

// POST

const createItem=async(req, res)=>
{
    try
    {
        const data=req.body
        console.log('Data: ', data)
        const item=await EWasteItem.create(data)
        res.status(201).json(item)
    }
    catch(err)
    {
        res.status(400).json({message: err.message})
    }
}
// GET

const getAllItems=async(req, res)=>
{
    try
    {
        const items=await EWasteItem.find()
        res.status(200).json(items)
    }
    catch(err)
    {
        res.status(400).json({message: err.message})
    }
}

// GET BY ID

const getItemById=async(req, res)=>
{
    const id=req.params.id
    try
    {
        const item=await EWasteItem.findById(id)

        if(!item)
            return res.status(404).json({message: "Item Not Found"})
        res.json(item)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

// PUT By ID

const updateItem=async(req, res)=>
{
    const id=req.params.id
    const data=req.body
    try
    {
        const item=await EwasteItem.findByIdAndUpdate(id, data)
        if(!item)
            return res.status(500).json({message: "Item Not Found"})
        res.json({message: "Item Updated Successfully!"})
    }
    catch(err)
    {
        res.status(400).json({message: err.message})
    }
}

// DELETE By ID

const deleteItem=async(req, res)=>
{
    const id=req.params.id
    try
    {
        const item=await EWasteItem.findByIdAndDelete(id)
        if(!item)
            return res.status(400).json({message: "Record Not Found"})
        res.json({message: "Item got Deleted"})
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}
module.exports={createItem, getAllItems, getItemById, updateItem, deleteItem}
