import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';


export default function TaskInput ({addTask}){
     let [newtasks,setNewtasks]=useState(""); //text-field
     function updatetasksValue(event){
        event.preventDefault();
        setNewtasks(event.target.value);
       
     }
    let addNewtasks=()=>{
       addTask(newtasks);
        setNewtasks("");
    }
    return (
        <Box sx={{ display: "flex", m:2,padding:2 ,gap:2 }}>
            <TextField 
            id="standard-basic"
            name="tasks" 
            value={newtasks} 
            onChange={updatetasksValue}  
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