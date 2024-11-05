import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import React from 'react'
import FooterComponent from '../components/FooterComponent'
import HeaderComponent from '../components/HeaderComponent'
import MenuComponent from '../components/MenuComponent'
import theme from '../theme/theme'
const Principal = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex',background:'#F4F3FA',position:'relative',minHeight:'100vh',minWidth:'100vw',flexDirection:'column'}}>
      <CssBaseline />
      <HeaderComponent/>
      <Box sx={{
        display:'flex',
        flex:1
      }}>
      <MenuComponent/>
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'center',
        flexGrow:1,
        flex:1,
        
      }}>
        {children}
      </Box>
        </Box>
        
        
     <FooterComponent/> 
    </Box>
   
    
   
    </ThemeProvider>
  )
}

export default Principal