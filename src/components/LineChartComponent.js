import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import theme from '../theme/theme'
import Paper from '@mui/material/Paper';
import { ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import {
  Chart,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import {  LineSeries } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useDispatch } from 'react-redux';
import { toPng } from 'html-to-image';
import { addImageConversations } from '../features/indicators/indicatorSlice';

const LineChartComponent = ({data,title}) => {
  const days=['L','M','X','J','V','S','D']
  const dispatch = useDispatch();
  const elementRef = useRef();
  const formattedData=data.map((pair)=>({day:days[pair.day],total:pair.total}))
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
        className='chart'
        ref={elementRef}
        >
            
            <Box >
            
        <Chart
        
          data={formattedData}
        >
           
          
           <ArgumentAxis />
          <ValueAxis max={7} />

          <LineSeries
            valueField="total"
            argumentField="day"
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

export default LineChartComponent