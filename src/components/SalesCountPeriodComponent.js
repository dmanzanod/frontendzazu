import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../theme/theme'
import { Box, List, ListItem, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { getPeriodBookings } from '../services/servicesServices'
import { FormattedNumber, IntlProvider } from 'react-intl'
const SalesCountPeriodComponent = ({type}) => {
    const options=['month','trimester','semester']
    const optionsLabels=['mes','trimestre','semestre']
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const[data,setData]=useState(0)
    const open = Boolean(anchorEl);
    const getSales= async(index)=>{
        let resp
        if(type==='services'){
            resp= await getPeriodBookings(options[index],localStorage.getItem('Business'))
        }
        else{
            resp= await getPeriodBookings(options[index],localStorage.getItem('Business'))
        }
        if(resp.success===true){
            setData(resp.total)
        }
    }
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
    }}>
        <Box sx={{display:'flex', gap:'12px', alignItems:'center', justifyContent:'center'}}>
            <TrendingUpIcon/>
            <Typography variant='h5'>Número total de ventas por: </Typography>
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
        <Typography variant='h3' color={'primary'}><FormattedNumber style="decimal" value={data}/></Typography>
    </Box>
    </IntlProvider>
</ThemeProvider>
  )
}

export default SalesCountPeriodComponent