import { ThemeProvider } from '@emotion/react'
import { Box} from '@mui/material'
import React, { useEffect, useRef } from 'react'
import theme from '../theme/theme'
import Paper from '@mui/material/Paper';

import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { Legend } from '@devexpress/dx-react-chart-material-ui';
import { useDispatch } from 'react-redux';
import { toPng } from 'html-to-image';
import { addImage, addImageStats } from '../features/indicators/indicatorSlice';
const ChartComponent = ({title,data,type}) => {
  const dispatch = useDispatch();
  const elementRef = useRef();
  const resultArray = Object.values(
    data.reduce((accumulator, item) => {
      const { serviceName, timesServiceAppears } = item;
      accumulator[serviceName] = accumulator[serviceName] || { serviceId: item.serviceId, serviceName, timesServiceAppears: 0 };
      accumulator[serviceName].timesServiceAppears += timesServiceAppears;
      return accumulator;
    }, {})
  );
  

  const captureElementAsImage = async () => {
    try {
      const element = elementRef.current;

      const imgDataUrl = await toPng(element,{pixelRatio:2});
      const imgStats={
        elWidth:element.offsetWidth,
        elHeight:element.offsetHeight,
        img:imgDataUrl
      }
      dispatch(addImageStats(imgStats));
    } catch (error) {
      // Handle error
    }
  };
  useEffect(()=>{
    setTimeout(()=>{captureElementAsImage()},1000)
    
  },[])
  return (    <ThemeProvider theme={theme}>
        <Box className='chart' ref={elementRef} sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            width: '100%',
          
            borderRadius:"20px",
            backgroundColor:"#FFF",
            
            gap:"12px"

        }}>
            
            <Box >
            
        <Chart
        
          data={resultArray}
        >
          <PieSeries
            valueField="timesServiceAppears"
            argumentField="serviceName"
          /> 
          
         
          
          <Title
            text={title}
          />
          <Legend/>
          <Animation />
          
        </Chart>
     
            </Box>

        </Box>

    
    </ThemeProvider>
  )
}

export default ChartComponent