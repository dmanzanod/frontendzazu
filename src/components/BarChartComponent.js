import { ThemeProvider } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import React from 'react'
import theme from '../theme/theme'
import Paper from '@mui/material/Paper';
import { ArgumentAxis, BarSeries, Tooltip, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, HoverState } from '@devexpress/dx-react-chart';
import { Legend } from '@devexpress/dx-react-chart-material-ui';
const BarChartComponent = ({data,title}) => {
  console.log(data)
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
      </Paper>
            </Box>

        </Box>

    
    </ThemeProvider>
  )
}

export default BarChartComponent