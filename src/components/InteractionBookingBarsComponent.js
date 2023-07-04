import { ThemeProvider } from '@emotion/react'
import { Box, List, ListItem, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import theme from '../theme/theme'
import Paper from '@mui/material/Paper';
import { ArgumentAxis, BarSeries,  ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import {
  Chart,
  
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation} from '@devexpress/dx-react-chart';
import { getPeriodBookings } from '../services/servicesServices';
import { getPeriodOrders } from '../services/servicesProducts';
import { getPeriodInteractions } from '../services/servicesInteractions';
import { useDispatch } from 'react-redux';
import { toPng } from 'html-to-image';
import { addImageConversationsBookings } from '../features/indicators/indicatorSlice';

const InteractionBookingComponent = ({type,bookings,conversations,title}) => {
 const[dataPeriod,setDataPeriod]=useState(bookings.total)
 const[interactionsPeriod,setInteractionsPeriod]=useState(conversations.total)
  const data=[{
    property:title.includes('Pedidos')?'Pedidos':'Reservas',
    total:dataPeriod
  },
{
  property:"Conversaciones",
  total:interactionsPeriod
}]
const options=['month','trimester','semester']
    const optionsLabels=['mes','trimestre','semestre']
    const dispatch = useDispatch();
    const elementRef = useRef();
 const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
const open = Boolean(anchorEl);
const getSales= async(index)=>{
    let resp
    if(type==='services'){
        resp= await getPeriodBookings(options[index],localStorage.getItem('Business'))
    }
    else{
        resp= await getPeriodOrders(options[index],localStorage.getItem('Business'))
    }
    if(resp.success===true){
        setDataPeriod(resp.total)
    }
    else{
        setDataPeriod(0)
    }
}
const getInteractions= async(index)=>{
    const resp= await getPeriodInteractions(options[index],localStorage.getItem('Business'))
    if(resp.success===true){
        setInteractionsPeriod(resp.total)
    }
    else{
        setInteractionsPeriod(0)
    }
}
const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (event, index) => {
    setSelectedIndex(index);
    await getSales(index)
    await getInteractions(index)
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      dispatch(addImageConversationsBookings(imgStats));
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
            boxShadow:'none',
            borderRadius:"20px",
            backgroundColor:"#FFF",
            
            gap:"12px"

        }}
        className='chart'
        ref={elementRef}
        >
          <Box sx={{
            display:'flex',
            paddingInline:'24px',
            
            
            alignItems:'center',
            gap:'24px'
          }}>
            <Typography variant='h5'>Periodo</Typography>
          
          
          <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            
            primary={optionsLabels[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {optionsLabels.map((option, index) => (
          <MenuItem
            key={option}
           
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
            </Box>
            <Box >
           
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
    
            </Box>

        </Box>

    
    </ThemeProvider>
  )
}

export default InteractionBookingComponent