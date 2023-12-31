
const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title:String,
    description:String,
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    },
    creation_date:String,
    userEmail:String,
})

const TaskModel = mongoose.model("Task",taskSchema)

module.exports = {TaskModel}