import React, { useEffect, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../theme/theme'
import { FormattedNumber, IntlProvider } from 'react-intl'
import { Box, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { useDispatch } from 'react-redux'
import { toPng } from 'html-to-image'
import { addImageSalesBookings } from '../features/indicators/indicatorSlice'
const SalesBookingsComponent = ({totalSales,totalBookings}) => {
  const dispatch = useDispatch();
  const elementRef = useRef();
  const captureElementAsImage = async () => {
    try {
      const element = elementRef.current;

      const imgDataUrl = await toPng(element,{pixelRatio:2});
      const imgStats={
        elWidth:element.offsetWidth,
        elHeight:element.offsetHeight,
        img:imgDataUrl
      }
      dispatch(addImageSalesBookings(imgStats));
    } catch (error) {
      // Handle error
    }
  };
  useEffect(()=>{
    setTimeout(()=>{captureElementAsImage()},1000)
    
  },[])
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale="es" defaultLocale="es">
    <Box sx={{
        display:'flex',
        width: '100%',
        minHeight:'168.583px',
        padding: "18px",
        borderRadius:"20px",
        backgroundColor:"#FFF",
        flexDirection:'column',
        alignItems:'center',
        gap:'24px'
    }}
    className='chart'
    ref={elementRef}
    >
        <Box sx={{display:'flex', gap:'12px', alignItems:'center', justifyContent:'center'}}>
            <TrendingUpIcon/>
            <Typography variant='h5' sx={{fontSize:{xs:'1rem',lg:'1.28rem'}}}>Ticket promedio</Typography>
        </Box>
        <Typography variant='h3' sx={{fontSize:{xs:'2rem',lg:'2.5rem'}}} color={'primary'}>{totalBookings.total===0?'0':Math.round(parseFloat(totalSales.total/totalBookings.total)).toLocaleString('es')}</Typography>
    </Box>
    </IntlProvider>
</ThemeProvider>
  )
  
}

export default SalesBookingsComponent