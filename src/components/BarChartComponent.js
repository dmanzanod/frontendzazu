import { ThemeProvider } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import theme from '../theme/theme'
import Paper from '@mui/material/Paper';
import { Chart } from 'primereact/chart';
import { useDispatch } from 'react-redux';
import { addImageMonthlyBookings } from '../features/indicators/indicatorSlice';
import { toPng } from 'html-to-image';

const BarChartComponent = ({data,title}) => {
  const [dataFormatted,setDataFormatted]=useState({})
  const dispatch = useDispatch();
  const [options,setOptions]=useState({})
  const elementRef = useRef();
  const formatData=()=>{
    let labels=[]
    let dataSets=[]
     data.map((el)=>{
      labels.push(el.month)
      dataSets.push(el.total)
    })
    return {
      labels:labels,
      datasets:[{
        label:'Número de ventas por mes',
        data:dataSets,
         backgroundColor:'#42a5f5',
         
    
      }]
    }
    
   }
   const optionsChart = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };
  const captureElementAsImage = async () => {
    try {
      const element = elementRef.current;

      const imgDataUrl = await toPng(element,{pixelRatio:2});
      const imgStats={
        elWidth:element.offsetWidth,
        elHeight:element.offsetHeight,
        img:imgDataUrl
      }
      dispatch(addImageMonthlyBookings(imgStats));
    } catch (error) {
      console.log(error)
      // Handle error
    }
  };
  useEffect(()=>{
    const format=formatData()
    setDataFormatted(format)
    setTimeout(()=>{captureElementAsImage()},1000)
    
  },[])
  return (
    <ThemeProvider theme={theme}>
        <Box sx={{
           display:'flex',
           flexDirection:'column',
           justifyContent:'center',
           
           width:{xs:'98%',sm:'100%'},
           paddingInline:'12px',
            borderRadius:"20px",
           backgroundColor:"#FFF",
           
            gap:"36px"
          
        }}
        ref={elementRef}
        className='chart'
        >
             <Typography variant='h4' sx={{alignSelf:'center',fontSize:{xs:'1.6rem',sm:'1.8rem'}}}>Ventas por mes</Typography>
            <Chart className='chart__width' type="bar" data={dataFormatted}  options={options}/>

        </Box>

    
    </ThemeProvider>
  )
}

export default BarChartComponent