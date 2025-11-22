
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Checkbox,
  Typography,
} from "@mui/material";

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTodoAsync, updateTodosAsync } from './features/todo/todoSlice';
export default function TaskDone({finishedTask,tasksDoneDeleted,taskMovedToPending}){

    const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const clickHandler = (id) => {
        dispatch(deleteTodoAsync(id));
      }
  
  const todoMovedToPending = (id) => {
    console.log(id);
    dispatch(updateTodosAsync(id));
  }

    return (
       <Box sx={{ p: 2, maxWidth:1000 }}>
        <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Completed <Typography component="span" color="text.secondary"></Typography>
        </Typography>
        <List>
            { todos
            .filter((el) => el.status === true)
            .map((el, index) => (
            <ListItem
                 key={el.id}
              disableGutters
              sx={{
                mb: 1.25,                         // gap between rows
                bgcolor: "background.paper",     // white card color
                borderRadius: 2,                 // rounded pill look
                boxShadow: "0px 6px 14px rgba(15,23,42,0.06)", // soft shadow
                py: 1.5,                         // vertical padding (top/bottom)
                px: 2,                           // horizontal padding
                alignItems: "center",
              }}
            >
            <ListItemIcon sx={{minWidth:40}}>
                <Checkbox
                  edge="start"
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 22 }, // checkbox size
                  }}
                 defaultChecked
                  onChange={()=>todoMovedToPending(el.id)}
                />
              </ListItemIcon>
             <ListItemText primary={el.task}/>
             <ListItemIcon sx={{minWidth:40}}>
                  <IconButton onClick={()=>clickHandler(el.id)} aria-label="delete"><DeleteIcon /></IconButton>
              </ListItemIcon>    
             
          </ListItem>
            ))

            }
            
        </List>
    </Paper>
    </Box> 
    )
}