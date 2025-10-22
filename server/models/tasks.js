const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const taskSchema= new Schema({
    task:String,
    id:{
        type:String,
        default:uuidv4,
        unique:true
    },
    status:{
        type:Boolean,
        default: false
    },
});

const task=mongoose.model("task",taskSchema);
module.exports=task;
