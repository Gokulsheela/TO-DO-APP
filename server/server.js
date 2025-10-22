const express=require("express");
const mongoose=require("mongoose");
const cors=require ("cors");
const tasks=require("./models/tasks.js");
const app= express();
const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(express.json());

dbUrl='mongodb://127.0.0.1:27017/ToDO-App';

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
};

app.get("/todos", async (req,res)=>{
    const todos= await tasks.find();
    res.json(todos);
});

app.post("/todos", async (req,res)=>{
    const newTodo= new tasks({task:req.body.text});
    await newTodo.save();
    res.json(newTodo);
})
app.patch("/todos",async(req,res)=>{
    const {id}=req.body;
 const result=  await tasks.findOneAndUpdate(
      {id},
      [
        { $set: { status: { $not: "$status" } } }
      ],
      {new:true});
    // if (!result) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Status toggled"})
 
})
app.delete("/todos/:id", async(req,res)=>{
    const {id}= req.params; // reciving from url
    console.log(id);
     const resDlt=await tasks.findOneAndDelete({ id: id });
    res.json(resDlt);

})


// const user=new tasks({task:"sleep"});
// user.save()
// .then(()=> console.log("date is saved"))
// .catch((err)=>console.log(err));

app.listen(3030,()=>{
    console.log("server is listening on port 3030");
});