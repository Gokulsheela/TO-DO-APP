
import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";

 
export default function Header(){
    return (
    <AppBar position="static" elevation={0} color="primary" sx={{ borderRadius: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
          To-Do App
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ width: 36, height: 36 }}>G</Avatar>
        </Box>
      </Toolbar> 
    </AppBar>
  );
}
    
