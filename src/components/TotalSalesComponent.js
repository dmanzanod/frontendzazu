import { ThemeProvider } from '@emotion/react'
import React from 'react'
import theme from '../theme/theme'
import { Box, Typography } from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const TotalSalesComponent = ({total}) => {
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
                <MonetizationOnIcon/>
                <Typography variant='h5'>Monto total de ventas</Typography>
            </Box>
            <Typography variant='h3' color={'primary'}>{total.totalBookings}</Typography>
        </Box>
    </ThemeProvider>
  )
}

export default TotalSalesComponent