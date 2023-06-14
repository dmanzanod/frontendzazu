import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../theme/theme'
import { Box, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
const TotalBookingsComponent = ({total}) => {
  
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{
        display:'flex',
        width: '100%',
        padding: "18px",
        borderRadius:"20px",
        backgroundColor:"#FFF",
        flexDirection:'column',
        alignItems:'center',
        gap:'24px'
    }}>
        <Box sx={{display:'flex', gap:'12px', alignItems:'center', justifyContent:'center'}}>
            <TrendingUpIcon/>
            <Typography variant='h5'>Número total de ventas</Typography>
        </Box>
        <Typography variant='h3' color={'primary'}>{total.total}</Typography>
    </Box>
</ThemeProvider>
  )
}

export default TotalBookingsComponent