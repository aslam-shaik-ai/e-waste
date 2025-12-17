const Collection=require('../models/Collection')
const logActivity=require('../utils/logActivity')
const createCollection=async(req, res)=>
{
    try
    {
        const data=req.body
        data.requester=req.user.id
        const collection=await Collection.create(data)
        res.status(200).json(collection)
    }
    catch(err)
    {
        res.status(404).json({message: err.message})
    }
}

// GET

const getAllCollections=async(req, res)=>
{
    try
    {
        const collections=await Collection.find()
        res.status(200).json(collections)
    }
    catch(err)
    {
        res.status(404).json({message: err.message})
    }
}

// GET By ID

const getCollection=async(req, res)=>
{
    try
    {
        const id=req.params
        const collection=await Collection.findById(id)
        res.status(200).json(collection)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

// PUT By ID

const updateCollection=async(req, res)=>
{
    try
    {
        const data=req.body
        const id=req.params.id
        const collection=await Collection.findByIdAndUpdate(id, data)
        res.status(201).json({message: "Collection Updated Successfully!"})
    }
    catch(err)
    {
        res.status(404).json({message: err.message})
    }
}

// DELETE By ID

const deleteCollection=async(req, res)=>
{
    try
    {
        const id=req.params.id
        const collection=await Collection.findByIdAndDelete(id)
        res.status(200).json({message: "Collection Deleted Successfully!"})
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}
//
// Assigning to the technician

const assignTechnician=async(req, res)=>
{
    try
    {
        const {technicianId}=req.body
        const id=req.params.id
        const collection=await Collection.findByIdAndUpdate(id)

        if(!collection)
            return res.status(404).json({message: 'Collection Not Found'})
        if(collection.status!=='requested')
            return res.status(400).json({message: 'Collection must be requested before assigning'})

        collection.assignedTo=technicianId
        collection.status='assigned'
        await collection.save()
        await logActivity({collectionId: collection._id, action: 'assigned', user: req.user})
        res.status(200).json(collection)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

// Assigning Collection can see By by respective Technician

const getAssignedCollection=async(req, res)=>
{
    try
    {
        const collections=await Collection.find({assignedTo: req.user.id})

        res.status(200).json(collections)
    }
    catch(err)
    {
        res.status(400).json({message: err.message})
    }
}

// Technician mark status as picked

const markPicked=async(req, res)=>
{
    try
    {
        const CollectionId=req.params.id
        const technicianId=req.user.id
        const collection= await Collection.findByIdAndUpdate(CollectionId)
        
        if(!collection)
            return res.status(404).json({message: "Collection Not Found"})
        if(collection.assignedTo.toString()!==technicianId)
            return res.status(403).json({message: 'You are not assigned to this collection'})
        if(collection.status!=='assigned')
            return res.status(400).json({message: 'Collection must be assigned before picking'})

        collection.status='picked'
        collection.pickupAt=new Date()
        await collection.save()
        await logActivity({collectionId: collection._id, action: 'picked', user: req.user})
        res.status(200).json(collection)

    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}

// Technician mark status as completed

const markCompleted=async(req, res)=>
{
    try
    {
        const collectionId=req.params.id
        const technicianId=req.user.id
        const collection=await Collection.findByIdAndUpdate(collectionId)

        if(!collection)
            return res.status(404).json({message: "Collection Not Found"})
        if(collection.assignedTo.toString()!==technicianId)
            return res.status(403).json({message: 'You are not assigned to this collection'})
        if(collection.status!=='picked')
            return res.status(400).json({message: 'Collection must be picked before completing'})

        collection.status='completed'
        collection.completedAt=new Date()
        await collection.save()
        await logActivity({collectionId: collection._id, action: 'completed', user: req.user})
        res.status(200).json(collection)
    }
    catch(err)
    {
        res.status(400).json({message: err.message})
    }
}
module.exports={createCollection, getAllCollections, getCollection, updateCollection, deleteCollection, assignTechnician, getAssignedCollection, markPicked, markCompleted}
