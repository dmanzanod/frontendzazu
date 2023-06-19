import { AppBar, Avatar, Box,  Menu, MenuItem, ThemeProvider, Toolbar, Typography } from '@mui/material'

import React, { useState } from 'react'
import theme from '../theme/theme'

import { useNavigate } from 'react-router-dom'
import { logOut } from '../services/service'

const HeaderComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate= useNavigate()
 
 const handleClick=()=>{
    handleClose()
     logOut()
    navigate('/login')
 }
  const handleClose = () => {
    
    setAnchorEl(null)
    // logOut()
    // navigate('/login')
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <ThemeProvider theme={theme}>
        
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,background: 'linear-gradient(90deg, rgba(246,207,43,1) 0%, rgba(0,190,201,1) 100%)' }} >
        <Toolbar sx={{display:"flex",alignContent:"center",justifyContent:"space-between"}}>

            <Box sx={{width:"70%", paddingInline:'16px'}}>
                <img className='logo' src={`${process.env.PUBLIC_URL}/logo1.png`} alt='logo'/>
            </Box>
          <Box sx={{display:"flex",cursor:'pointer', alignContent:"center", justifyContent:"flex-end", gap:"12px", width:"40%", paddingInline:'18px'}} onClick={handleMenu}>
          
                
              
              <Typography variant="p" mt={2} color={'white'} >
            {localStorage.getItem('user')}
          </Typography>
             
          
          </Box>
           <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
              >
                <MenuItem onClick={handleClick}>Cerrar Sesión</MenuItem>
               
              </Menu>
        </Toolbar>
      </AppBar>
    
    </ThemeProvider>
  )
}

export default HeaderComponent