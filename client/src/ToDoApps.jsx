import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Heder"
import {v4 as uuidv4 } from 'uuid';
import TaskList from "./TaskList";
import TaskDone from "./TaskDone";
import TaskInput from "./TaskInput";
import {Box} from "@mui/material";

export default function ToDoApps(){
  
  let [tasks,setTasks]=useState([{tasks:"sample"}]); //intialize a empty string prevent from creating
  let [taskDone,setTaskDone]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3030/todos").then((res)=>setTasks(res.data));
  },[]);

  let addTask=async (text)=>{
   let res= await axios.post("http://localhost:3030/todos",{text});
       setTasks( (prevTasks) => {
                 return [...prevTasks,res.data]
                 });
      //  console.log(tasks)
  }
  //-------------------------------------------------------------------------------
   let taskMovedToDone = (id) => {
      // 1. Update status to true (so tick shows)

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: true } : task
        )
      );

      // 2. After a short delay, move it to done list
      setTimeout(() => {
          const doneTask = tasks.find((task) => task.id === id);
          if (!doneTask) return;

          setTaskDone((prev) => [...prev, { ...doneTask, status: true }]);
          setTasks((prev) => prev.filter((task) => task.id !== id));
           }, 150); // adjust timing to match checkbox animation
    };
    let taskMovedToPending = (id) => {
        // Update status to false
        setTaskDone((prev)=>
          prev.map((task)=>
            task.id=== id ? {...task, status:false }:task
            )
        )
        setTimeout(()=>{
          // 1. Find the task to move
        const pendingTask = taskDone.find((task) => task.id === id);
         if (!pendingTask) return;

        // 2. Add it into tasks list
        setTasks((prev) => [...prev, { ...pendingTask, status: false }]);

        // 3. Remove it from tasks
        
        setTaskDone(taskDone.filter((task) => task.id !== id));
        },150)
        
    };
//-----------------------------------------------------------------------------

    let tasksDeleted=(id)=>{
     axios.delete(`http://localhost:3030/todos/${id}`);
     setTasks(tasks.filter((el)=>el.id != id));
    };


    let tasksDoneDeleted=(id)=>{
      console.log(id,"id");
      axios.delete(`http://localhost:3030/todos/${id}`);
      setTaskDone(tasks.filter((el)=>el.id != id));
    };

    return (
      <Box  sx={{ 
        p:2,
        m:3,
        bgcolor:"#bbdefb",
        display:"flex",
        flexDirection:"column",
        width:"auto"
           }}>
        <Header/>
        <TaskInput addTask={addTask}/>
        
        <TaskList  tasks={tasks} taskMovedToDone={taskMovedToDone} tasksDeleted={tasksDeleted}/>
        <TaskDone  finishedTask={taskDone} taskMovedToPending={taskMovedToPending} tasksDoneDeleted={tasksDoneDeleted}/>
     </Box>
    )
}