import { ThemeProvider } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import theme from '../theme/theme'
import Paper from '@mui/material/Paper';

import { useDispatch } from 'react-redux';
import { toPng } from 'html-to-image';
import { addImageConversations } from '../features/indicators/indicatorSlice';
import { Chart } from 'primereact/chart';

const LineChartComponent = ({data,title}) => {
  const days=['L','M','X','J','V','S','D']
  const [chartData,setChartData]=useState({})
  const [optionsChart,setOptionsChart]= useState({
    scales: {
        y: {
            beginAtZero: true
        }
    }
  })
  const dispatch = useDispatch();
  const elementRef = useRef();
  let dataArray=[]
  const formattedData=()=>{data.map((pair)=>{
    dataArray.push(pair.total)
  })}
  const captureElementAsImage = async () => {
    try {
      const element = elementRef.current;

      const imgDataUrl = await toPng(element,{pixelRatio:2});
      const imgStats={
        elWidth:element.offsetWidth,
        elHeight:element.offsetHeight,
        img:imgDataUrl
      }
      dispatch(addImageConversations(imgStats));
    } catch (error) {
      // Handle error
    }
  };
  useEffect(()=>{
    setTimeout(()=>{captureElementAsImage()},1000)
    formattedData()
    setChartData({
      labels:days,
      datasets:[{
        label:"Número de conversaciones",
        borderColor:"#42a5f5",
        data:dataArray,
        tension:.4
      }]
    })
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
        className='chart'
        ref={elementRef}
        >
            <Typography variant='h4' sx={{alignSelf:'center', fontSize:{xs:'1.6rem',sm:'1.8rem'}}}>Conversaciones </Typography>
            <Chart type="line" className='chart__width' data={chartData} options={optionsChart}/>
            
        

        </Box>
          
    
    </ThemeProvider>
  )
}

export default LineChartComponent