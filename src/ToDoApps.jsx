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
   let taskUpdate = (id) => {
        // 1. Find the task to move
        const doneTask = tasks.find((task) => task.id === id);

        // 2. Add it into taskDone list
        setTaskDone((prev) => [...prev, { ...doneTask, status: true }]);

        // 3. Remove it from tasks
        setTasks(tasks.filter((task) => task.id !== id));

        console.log('finished task',taskDone);
        console.log('todo-task',tasks);
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
           }}>
        <Header/>
        <TaskInput addTask={addTask}/>
        <TaskList tasks={tasks} taskUpdate={taskUpdate} tasksDeleted={tasksDeleted}/>
        <TaskDone finishedTask={taskDone} tasksDoneDeleted={tasksDoneDeleted}/>
     </Box>
    )
}