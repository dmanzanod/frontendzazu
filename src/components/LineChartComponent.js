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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Ensures content is aligned to the top
          alignItems: 'center', // Centers content horizontally
          width: { xs: '100%', sm: '100%' },
          height: { xs: '100%', sm: '100%' },
          //padding: '12px 12px 36px 12px', // Manual padding for consistent spacing
          borderRadius: '20px',
          backgroundColor: '#FFF',
          gap: '36px', // Space between title and chart
        }}
        className='chart'
        ref={elementRef}
      >
             <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '2px solid #313C95',
                padding: '10px',
                background: '#313C95',
                width: '100%',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px', 
                justifyContent: 'center',
              }}
            >
        <Typography
          variant='h4'
          sx={{
            fontSize: { xs: '1.6rem', sm: '1.8rem' },
            textAlign: 'center',
            paddingTop: '12px',
            color:'white'
          }}
        >
          CONVERSACIONES
        </Typography>
        </Box>
        <Chart
          type="line"
          className='chart__width'
          data={chartData}
          options={optionsChart}
          style={{padding:'20px 12px 12px 12px'}}
        />
      </Box>
    </ThemeProvider>
  );
        }

export default LineChartComponent