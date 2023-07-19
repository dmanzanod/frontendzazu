import React, { useEffect, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../theme/theme'
import { Box, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { FormattedNumber, IntlProvider } from 'react-intl'
import { useDispatch } from 'react-redux'
import { toPng } from 'html-to-image'
import { addImageTotalBookings } from '../features/indicators/indicatorSlice'
const TotalBookingsComponent = ({total}) => {
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
      dispatch(addImageTotalBookings(imgStats));
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
            <Typography variant='h5' sx={{fontSize:{xs:'1rem',lg:'1.28rem'}}}>Número total de ventas (Histórico)</Typography>
        </Box>
        <Typography variant='h3' color={'primary'} sx={{fontSize:{xs:'2rem',lg:'2.5rem'}}}><FormattedNumber style="decimal" value={total.total}/></Typography>
    </Box>
    </IntlProvider>
</ThemeProvider>
  )
}

export default TotalBookingsComponent