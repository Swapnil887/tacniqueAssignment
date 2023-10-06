const express = require("express");
const authentication = require("../middleware/authentication");
const { TaskModel } = require("../models/taskModel");
const limiter = require("../middleware/rateLimiter.middleware");

const taskRoute = express()
// POST /tasks: Add a new task.
// GET /tasks: Retrieve a list of all tasks.
// GET /tasks/:id: Retrieve a specific task by ID.

taskRoute.post("/",authentication,limiter,async(req,res,next)=>{ 
    
    
    try {
        const {title,description,email} = req.body;
        
        if(!title) return res.send("plaese provide title")
        if(!description) return res.send("please provide description")
        const todayDate =new Date();
        console.log(todayDate)
        const obj = {
            title,
            description,
            creation_date:todayDate,
            userEmail:email,
        }
        
        const user = await TaskModel(obj).save();
        res.send({
            "message": "Task created successfully!",
            "task":user
        })
    } catch (error) {
        next(error)
    }
});

taskRoute.get("/",authentication,limiter,async (req,res,next)=>{
    
    try {
        const {email} = req.body;
        const tasks = await TaskModel.find({userEmail:email});
        res.send(tasks)
    } catch (error) {
        next(error)
    }
});

taskRoute.get("/:id",authentication,limiter,async (req,res,next)=>{
    
    try {
        const id = req.params.id;
        var task = await TaskModel.findOne({_id:id});
        if(!task) return res.send("no task available for this id")
        res.send(task)
    } catch (error) {
        next(error)
    }
})

taskRoute.put("/:id",authentication,limiter,async (req,res,next)=>{
    try {
        const {task,description,status,email} = req.body;
        var obj = req.body
        const id = req.params.id;
        const data = await TaskModel.findOne({_id:id});
        if(!data) return res.send("data is not available for this tasks id")
        if(data.userEmail!=email) return res.send("you are not authorized to update this task")
        if(!task && !description && ! status ) return res.send("please provide the data you want to update");
         

        var newData = {...data._doc};
        console.log(newData)
        
        for(var i in obj){
            if(i=="email") continue;
            newData[i] = obj[i]
        }
        
        await TaskModel.findOneAndUpdate({_id:id},newData);
       
        res.send("Task updated successfully!");
    } catch (error) {
        next(error)
    }
})

taskRoute.delete("/:id",authentication,limiter,async (req,res,next)=>{

    try {
        const id = req.params.id;
        const {email} = req.body
        const data = await TaskModel.findOne({_id:id});
        if(!data) return res.send("data is not available for this tasks id");
        if(data.userEmail!=email) return res.send("you are not authorized to delete this task")
        await TaskModel.deleteOne({_id:id});
        
        res.send("Task deleted successfully!");    
    } 
    catch (error) {
        next(error)
    }
})





module.exports = taskRoute