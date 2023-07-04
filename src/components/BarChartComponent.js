import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import theme from '../theme/theme'
import Paper from '@mui/material/Paper';
import { ArgumentAxis, BarSeries,  ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import {
  Chart,
 
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useDispatch } from 'react-redux';
import { addImageMonthlyBookings } from '../features/indicators/indicatorSlice';
import { toPng } from 'html-to-image';

const BarChartComponent = ({data,title}) => {
  console.log(data)
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
      dispatch(addImageMonthlyBookings(imgStats));
    } catch (error) {
      console.log(error)
      // Handle error
    }
  };
  useEffect(()=>{
    setTimeout(()=>{captureElementAsImage()},1000)
    
  },[])
  return (
    <ThemeProvider theme={theme}>
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            width: '100%',
          
            borderRadius:"20px",
            backgroundColor:"#FFF",
            
            gap:"12px"
          
        }}
        ref={elementRef}
        className='chart'
        >
            
            <Box >
           
        <Chart
        
          data={data}
        >
           
          
           <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="total"
            argumentField="month"
          />
          
          <Title
            text={title}
          />
          
          <Animation />
          
        </Chart>
      
            </Box>

        </Box>

    
    </ThemeProvider>
  )
}

export default BarChartComponent