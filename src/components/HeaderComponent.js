import { AppBar, Avatar, Box, Button, IconButton, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { width } from '@mui/system'
import React from 'react'
import theme from '../theme/theme'

const HeaderComponent = () => {
  return (
    <ThemeProvider theme={theme}>
        
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,background: 'linear-gradient(90deg, rgba(246,207,43,1) 0%, rgba(0,190,201,1) 100%)' }} >
        <Toolbar sx={{display:"flex",alignContent:"center",justifyContent:"space-between"}}>

            <Box sx={{width:"70%", paddingInline:'16px'}}>
                <img className='logo' src={`${process.env.PUBLIC_URL}/logo1.png`} alt='logo'/>
            </Box>
          <Box sx={{display:"flex", alignContent:"center", justifyContent:"flex-end", gap:"12px", width:"40%", paddingInline:'18px'}}>
          <Avatar></Avatar>
          <Typography variant="p" mt={2} color={'white'} >
            username
          </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    
    </ThemeProvider>
  )
}

export default HeaderComponent