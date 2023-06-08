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
const InteractionBookingComponent = ({bookings,conversations,title}) => {
  console.log(bookings,conversations)
  const data=[{
    property:"Reservas",
    total:bookings.totalBookings
  },
{
  property:"Conversaciones",
  total:conversations.total
}]
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
            argumentField="property"
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

export default InteractionBookingComponent