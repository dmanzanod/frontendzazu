import { ThemeProvider } from '@emotion/react'
import { Box} from '@mui/material'
import React from 'react'
import theme from '../theme/theme'
import Paper from '@mui/material/Paper';

import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { Legend } from '@devexpress/dx-react-chart-material-ui';
const ChartComponent = ({title,data,type}) => {
  const resultArray = Object.values(
    data.reduce((accumulator, item) => {
      const { serviceName, timesServiceAppears } = item;
      accumulator[serviceName] = accumulator[serviceName] || { serviceId: item.serviceId, serviceName, timesServiceAppears: 0 };
      accumulator[serviceName].timesServiceAppears += timesServiceAppears;
      return accumulator;
    }, {})
  );
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

        }}>
            
            <Box >
            <Paper >
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
      </Paper>
            </Box>

        </Box>

    
    </ThemeProvider>
  )
}

export default ChartComponent