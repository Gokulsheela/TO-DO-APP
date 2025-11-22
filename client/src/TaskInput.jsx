import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { addTodoAsync } from './features/todo/todoSlice';

import { useDispatch } from "react-redux";
// import { addTodo } from "./features/todo/todoSlice";

export default function TaskInput ({addTask}){
     let [text,setText]=useState(""); //text-field
     const dispatch = useDispatch();

    // let addNewtasks=()=>{
    //     console.log(text);
    //    addTask(text);
    //     setText("");
    // }

const addNewtasks = (evt) =>{
        evt.preventDefault();
        console.log(text,"text inpiut");
        dispatch(addTodoAsync(text))
        setText("");
    }


    return (
        <Box sx={{ display: "flex", m:2,padding:2 ,gap:2 }}>
            <TextField 
            id="standard-basic"
            name="tasks" 
            value={text} 
            onChange={(e) => setText(e.target.value)}  
            label="Task Name"
             variant="standard" 
             InputProps={{
      startAdornment: <InputAdornment position="start" />,
  }}
        />
      <Button variant="contained" onClick={addNewtasks}>  Add Task </Button>
          </Box> 
    )
    
        

}