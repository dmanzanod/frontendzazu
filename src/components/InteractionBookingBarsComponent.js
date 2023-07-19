import { ThemeProvider } from '@emotion/react'
import { Box, List, ListItem, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import theme from '../theme/theme'
import Paper from '@mui/material/Paper';

import { getPeriodBookings } from '../services/servicesServices';
import { getPeriodOrders } from '../services/servicesProducts';
import { getPeriodInteractions } from '../services/servicesInteractions';
import { useDispatch } from 'react-redux';
import { toPng } from 'html-to-image';
import { addImageConversationsBookings } from '../features/indicators/indicatorSlice';
import { Chart } from 'primereact/chart';

const InteractionBookingComponent = ({type,bookings,conversations,title}) => {
 
 const typeBusiness= title.includes('Pedidos')?'Pedidos':'Reservas'
 const [data,setData]=useState({
    labels:[typeBusiness,'Conversaciones'],
    datasets:[
      {
        label:'Número de conversaciones-'+typeBusiness,
        backgroundColor: '#42A5F5',
        data:[bookings.total,conversations.total]
      }
    ]
    
  })

const options=['month','trimester','semester']
const [optionsChart,setOptionsChart]= useState({
  scales: {
      y: {
          beginAtZero: true
      }
  }
})
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
        return resp.total
    }
    else{
        return 0
    }
}
const getInteractions= async(index)=>{
    const resp= await getPeriodInteractions(options[index],localStorage.getItem('Business'))
    if(resp.success===true){
        return resp.total
    }
    else{
        return 0
    }
}
const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (event, index) => {
    setSelectedIndex(index);
    const resp=await getSales(index)
    const respInteractions=await getInteractions(index)
    setData({
      labels:[typeBusiness,'Conversaciones'],
      datasets:[
        {
          label:'Número de conversaciones-'+typeBusiness,
          backgroundColor: '#42A5F5',
          data:[resp,respInteractions]
        }
      ]
      
    })
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
           
           width:{xs:'98%',sm:'100%'},
           paddingInline:'12px',
            borderRadius:"20px",
           backgroundColor:"#FFF",
           paddingTop:"24px",
            gap:"24px"


        }}
        className='chart'
        ref={elementRef}
        >
          <Typography variant='h4' sx={{alignSelf:'center',fontSize:{xs:'1.4rem',sm:'1.8rem'}}}>{typeBusiness}-Conversaciones</Typography>
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
            <Chart className='chart__width' type="bar" data={data}  options={optionsChart}/>

        </Box>

    
    </ThemeProvider>
  )
}

export default InteractionBookingComponent