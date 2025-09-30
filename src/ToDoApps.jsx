import Box from '@mui/material/Box';
import Header from "./Heder"
import {v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import TaskList from "./TaskList";
import TaskDone from "./TaskDone";
import TaskInput from "./TaskInput";
export default function ToDoApps(){
  let [tasks,setTasks]=useState([{tasks:"sample",id:uuidv4(),status:false}]); //intialize a empty string prevent from creating
    let [taskDone,setTaskDone]=useState([])
  let addTask= (taskText)=>{
       setTasks((prevTasks)=>{
          return [...prevTasks,{tasks:taskText,id:uuidv4(),status:false}]
       });
  }
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
        console.log("pending task",tasks);
        },150)
        
    };


    let tasksDoneDeleted=(id)=>{
      setTaskDone(taskDone.filter((el)=>el.id != id));
    };
    let tasksDeleted=(id)=>{
      setTasks(tasks.filter((el)=>el.id != id));
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
        <TaskList tasks={tasks} taskMovedToDone={taskMovedToDone} tasksDeleted={tasksDeleted}/>
        <TaskDone finishedTask={taskDone} taskMovedToPending={taskMovedToPending} tasksDoneDeleted={tasksDoneDeleted}/>
     </Box>
    )
}