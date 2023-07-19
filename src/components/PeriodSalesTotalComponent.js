import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../theme/theme'
import { Box, List, ListItem, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { getTotalPeriodBookings } from '../services/servicesServices';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { getTotalPeriodOrders } from '../services/servicesProducts';
import { useDispatch } from 'react-redux';
import { addImagePeriodSales } from '../features/indicators/indicatorSlice';
import { toPng } from 'html-to-image';
const PeriodSalesTotalComponent = ({type,currency,initialValue}) => {
    const options=['month','trimester','semester']
    const optionsLabels=['mes','trimestre','semestre']
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const[data,setData]=useState(initialValue)
    const dispatch = useDispatch();
  const elementRef = useRef();
    const open = Boolean(anchorEl);
    console.log(data)
    
    const getSales= async(index)=>{
        let resp
        if(type==='services'){
            resp= await getTotalPeriodBookings(options[index],localStorage.getItem('Business'))
        }
        else{
            resp= await getTotalPeriodOrders(options[index],localStorage.getItem('Business'))
        }
        if(resp.success===true){
            setData(resp.total)
        }
        
    }
     const captureElementAsImage = async () => {
        try {
          const element = elementRef.current;
    
          const imgDataUrl = await toPng(element,{pixelRatio:2});
          const imgStats={
            elWidth:element.offsetWidth,
            elHeight:element.offsetHeight,
            img:imgDataUrl
          }
          dispatch(addImagePeriodSales(imgStats));
        } catch (error) {
          // Handle error
          console.log(error)
        }
      };
    useEffect(()=>{
     
      
        setTimeout(()=>{captureElementAsImage()},1000)
        
    
      getSales(0)
    },[])
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuItemClick = async (event, index) => {
        setSelectedIndex(index);
        await getSales(index)
        setAnchorEl(null);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      
  return (
    <ThemeProvider theme={theme}>
        <IntlProvider locale="es" defaultLocale="es">
        <Box sx={{
            display:'flex',
            width: '100%',
            padding: "18px",
            borderRadius:"20px",
            backgroundColor:"#FFF",
            flexDirection:'column',
            alignItems:'center',
            gap:'24px'
        }}
        className='chart'
        ref={elementRef}
        >
          
            <Box sx={{display:'flex', gap:'12px', alignItems:'center', justifyContent:'center'}}>
                <MonetizationOnIcon/>
                <Typography variant='h5' sx={{fontSize:{xs:'1rem',lg:'1.28rem'}}}>Monto total de ventas por: </Typography>
                <div>
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
    </div>
            </Box>
            <Typography variant='h3' color={'primary'} sx={{fontSize:{xs:'2rem',lg:'2.5rem'}}}><FormattedNumber style="decimal" value={data}/> {currency}</Typography>
        </Box>
        </IntlProvider>
    </ThemeProvider>
  )
}

export default PeriodSalesTotalComponent