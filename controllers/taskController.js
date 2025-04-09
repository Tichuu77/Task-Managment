const { json } = require("express");
const Task = require("../models/taskModel");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");



const createTask = async (req,res) => {
    const  userId  = req.user.id;

    if(!req.body || req.body.length === 0){
        return res.status(400).json({message:"No data provided", success:false});
    }
    const { title, description } = req.body;
    try{
       if(!title){
          return res.status(400).json({message:"All fields are required", success:false});
       }

       if(!userId){
           return res.status(401).json({message:"Unauthorized", success:false});
       }

       if(!mongoose.Types.ObjectId.isValid(userId)){
           return res.status(400).json({message:"Invalid user id", success:false});
       }

       const user = await User.findById(userId);

       if(!user){
           return res.status(404).json({message:"User not found", success:false});
       }
 
       const existingTask = await Task.findOne({title, user: userId})

       if(existingTask){
           return res.status(409).json({message:"Task already exists", success:false});
       }
 

       if(title.trim() === ''){
           return res.status(400).json({message:"Title cannot be empty", success:false});
       }

       if(title.length > 100){
           return res.status(400).json({message:"Title cannot exceed 100 characters", success:false});
       }

       if(description){
           if(description.length > 500){
               return res.status(400).json({message:"Description cannot exceed 500 characters", success:false});
           }
       }

       const newTask = new Task({title, description, userId: userId});
       await newTask.save();

       if(!newTask){
           return res.status(500).json({message:"Failed to create task", success:false});
       }

       return res.status(201).json({message:"Task created successfully", success:true, task: newTask});

    }
    catch(error){
        return res.status(500).json({message:"internal server error", success:false, error: error.message});
    }
}


const getTasks = async (req,res) => {
    const  userId  = req.user.id;
    try{

       if(!userId){
           return res.status(401).json({message:"Unauthorized", success:false});
       }

       if(!mongoose.Types.ObjectId.isValid(userId)){
           return res.status(400).json({message:"Invalid user id", success:false});
       }

       const user = await User.findById(userId);

       if(!user){
           return res.status(404).json({message:"User not found", success:false});
       }

       const tasks = await Task.find({userId: userId})

       if(!tasks){
           return res.status(200).json({message:"No tasks found",data:[], success:true});
       }

       return res.status(200).json({message:"Tasks retrieved successfully", success:true, data: tasks});

    }
    catch(error){
        return res.status(500).json({message:"internal server error", success:false, error: error.message});
    }
}


const getTaskById = async (req,res) => {
    const userId  = req.user.id;
    const { id } = req.params;
    
    try{

        if(!id){
            return res.status(400).json({message:"Invalid task id", success:false});
       }

       if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid task id", success:false});
        }

        if(!userId){
            return res.status(401).json({message:"Unauthorized", success:false});
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not found", success:false});
        }
        
       const task = await Task.findById(id);

       if(!task){
            return res.status(404).json({message:"Task not found", success:false});
       }

       return res.status(200).json({message:"Task retrieved successfully", success:true, task});
       
    }
    catch(error){
        return res.status(500).json({message:"internal server error", success:false, error: error.message});
    }
}



const updateTask = async (req,res) => {
    const  userId  = req.user.id;
    const { id } = req.params;
    const { title, description,status } =  req.body || {};
    
    try{
       
        if(!id){
            return res.status(400).json({message:"Invalid task id", success:false});
       }

       if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid task id", success:false});
        }

        if(!userId){
            return res.status(401).json({message:"Unauthorized", success:false});
        }

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({message:"Invalid user id", success:false});
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not found", success:false});
        }

        const task = await Task.findById(id);
        
        if(!task){
            return res.status(404).json({message:"Task not found", success:false});
        }

        if(task.userId.toString()!== userId.toString()){
            return res.status(403).json({message:"Unauthorized to update this task", success:false});
        }

        if(title){

            if(title=="" || title.trim()===""){
                return res.status(400).json({message:"Title is required", success:false});
            }

            if(title.length>100){
                return res.status(400).json({message:"Title should not exceed 100 characters", success:false});
            }

            task.title = title;

        }

        if(description){

            
            let updatedDescription = description.trim();

            if(updatedDescription.length>500){
                return res.status(400).json({message:"Description should not exceed 500 characters", success:false});
            }

            task.description = updatedDescription;

        }


        if(status){

            let updatedSatus = status.trim();

            updatedSatus = updatedSatus.toLowerCase();

        const validStatuses = ["pending", "in progress", "completed"];

            if(!validStatuses.includes(updatedSatus)){
                return res.status(400).json({message:"Invalid status", success:false});
            }

            task.status = updatedSatus;

        }

        const updatedTask = await task.save();

        if(!updatedTask){
            return res.status(500).json({message:"Failed to update task", success:false});
        }

        return res.status(200).json({message:"Task updated successfully", success:true, task: updatedTask});
        
        
    }
    catch(error){
        return res.status(500).json({message:"internal server error", success:false, error: error.message});
    }
}



const deleteTask = async (req,res) => {
    const  userId = req.user.id;
    const { id } = req.params;
    
    try{
       
        if(!id){
            return res.status(400).json({message:"Invalid task id", success:false});
       }

       if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid task id", success:false});
        }

        if(!id){
            return res.status(401).json({message:"Unauthorized", success:false});
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"User not found", success:false});
        }

        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({message:"Task not found", success:false});
        }

        if(task.userId.toString()!== userId.toString()){
            return res.status(403).json({message:"Unauthorized to delete this task", success:false});
        }

      const deleteTask=  await Task.findByIdAndDelete(id);

        if(!deleteTask){
            return res.status(500).json({message:"Failed to delete task", success:false});
        }

        return res.status(200).json({message:"Task deleted successfully", success:true});

    }
    catch(error){
        return res.status(500).json({message:"internal server error", success:false, error: error.message});
    }
}


module.exports = {createTask, getTasks, getTaskById, updateTask, deleteTask};