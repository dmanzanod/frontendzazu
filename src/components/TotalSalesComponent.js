import { ThemeProvider } from '@emotion/react'
import React, { useEffect, useRef } from 'react'
import theme from '../theme/theme'
import { Box, Typography } from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { NumericFormat } from 'react-number-format';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { useDispatch } from 'react-redux';
import { addImageTotalSales } from '../features/indicators/indicatorSlice';
import { toPng } from 'html-to-image';
const TotalSalesComponent = ({total, currency}) => {
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
      dispatch(addImageTotalSales(imgStats));
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
                <MonetizationOnIcon/>
                <Typography variant='h5'>Monto total de ventas (Histórico)</Typography>
            </Box>
            <Typography variant='h3' color={'primary'}><FormattedNumber style="decimal" value={total.total}/> {currency}</Typography>
        </Box>
        </IntlProvider>
    </ThemeProvider>
  )
}

export default TotalSalesComponent