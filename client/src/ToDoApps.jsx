import { useState, useEffect } from "react";
import Header from "./Header"
import TaskList from "./TaskList";
import TaskDone from "./TaskDone";
import TaskInput from "./TaskInput";
import {Box} from "@mui/material";
import { useDispatch } from 'react-redux';
import { fetchTodosAsync } from './features/todo/todoSlice';

export default function ToDoApps(){
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("useffect1");
    dispatch(fetchTodosAsync());
  },[]);

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
        {/* <TaskInput addTask={addTask}/> */}
         <TaskInput/>
        
        <TaskList/>
        <TaskDone />
     </Box>
    )
}