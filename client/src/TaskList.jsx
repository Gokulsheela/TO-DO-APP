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
 import DeleteIcon from '@mui/icons-material/Delete';
export default function TaskList({tasks,taskMovedToDone,tasksDeleted}){
    return (
  
  //         {/* {tasks.length > 0 && (  only show button if tasks exist
  //         <Button variant="outlined">
  //           MARK ALL DONE
  //         </Button>
  //       )} */}

  //           </ul>

  //   </Paper>


    <Box sx={{ p: 2, maxWidth: 1000,}}>
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Pending <Typography component="span" color="text.secondary"></Typography>
        </Typography>
        <List>
          {tasks.map((el,index)=> (
         <ListItem key={el.id||index}
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
                  checked={el.status} 
                  edge="start"
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 22 }, // checkbox size
                  }}
                  onChange={()=>taskMovedToDone(el.id)}
                />
              </ListItemIcon>

              <ListItemText
                primary={el.task}
                />
              <ListItemIcon sx={{minWidth:40}}>
                  <IconButton onClick={()=>tasksDeleted(el.id)} aria-label="delete"><DeleteIcon /></IconButton>
              </ListItemIcon>    
          </ListItem>
          ))}
        </List>
        </Paper>
    </Box>

    )
   
}