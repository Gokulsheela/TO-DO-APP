import { useState } from "react";
import {v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
export default function ToDoApp(){
    // let [tasks,setTasks]=useState([{tasks:"sample",id:uuidv4(),status:false}]);
    let [tasks,setTasks]=useState([]); //intialize a empty string prevent from creating 
    let [newtasks,setNewtasks]=useState("");
    
    let addNewtasks=()=>{
       setTasks((prevtasks)=>{
        // console.log(prevtasks);
        if(newtasks!=""){
             return [...prevtasks,{tasks:newtasks.toUpperCase(),id:uuidv4(),status:false}];
        }
        else{
            return prevtasks
        }
       });
        setNewtasks("");
        console.log(tasks);
    }
    function updatetasksValue(event){
        setNewtasks(event.target.value);
        
    }
    let taksDeleted =(id)=>{
           setTasks(tasks.filter((task) => task.id !=id));
         
    }
    let allDone=()=>{
      let newArray= tasks.map((todo)=>{
        return {
            ...todo, status:todo.status===true ? false : true
        }
    })
        setTasks(newArray);
    }
    let taskUpdate=(id)=>{
       setTasks(tasks.map((todo)=>todo.id==id
        ? {...todo,status:todo.status===true ? false : true}
        :todo 
        ));
    
        // console.log(tasks);
    }
    let style={textDecoration:"line-through", color:"green"};
    let style2={textDecoration:"none"};
    return (
        < div className="todoapp">
            <div className="toDoInput">
                 <TextField id="standard-basic"name="tasks" value={newtasks} onChange={updatetasksValue} label="Task Name" variant="standard" />
                 <br></br>
                 <Button onClick={addNewtasks}  variant="outlined" endIcon={<SendIcon />}>  Add </Button>                                     
             </div>
           <div className="tasks">
             {tasks.length > 0 && (
                <h3 style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "2px", border:"1px solid black", padding:"5px"}}>TASKS</h3>
                )}
            
            <ul>{tasks.map((todo)=> (
                
                <li className="" key={todo.id} style={todo.status==true ? style:style2}><span>{todo.tasks}</span>
                &nbsp;  &nbsp;  &nbsp;  &nbsp; 
                 <IconButton onClick={() => taksDeleted(todo.id)} aria-label="delete"><DeleteIcon /></IconButton>
                <IconButton onClick={() => taskUpdate(todo.id)} aria-label="delete"><CheckIcon /></IconButton>
                </li> 
            ))}
            <br></br>
          {tasks.length > 0 && ( //  only show button if tasks exist
          <Button variant="outlined" onClick={allDone}>
            MARK ALL DONE
          </Button>
        )}

            </ul>

        </div> 
        </div>
        
    )
}