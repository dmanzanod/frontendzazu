import { Box, Collapse,  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  Toolbar } from '@mui/material'
import React, { useState } from 'react'
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work'
import ListAltIcon from '@mui/icons-material/ListAlt';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
const MenuComponent = () => {
    
    const [expand, setExpand]=useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1);
    const routes=['/','/qr','/crud','/report','/help']
    const navigate=useNavigate()
    const location=useLocation()
    const handleExpand=()=>{
      setSelectedIndex(2)
      setExpand(!expand)
    }
    const handleSubList=(index)=>{
      const subRoutes=[`/categories/${localStorage.getItem('Business')}`,`/products/${localStorage.getItem('Business')}`,`/bookingDetails/${localStorage.getItem('Business')}`,`/businessDetailsUpdate/${localStorage.getItem('Business')}`]
      navigate(subRoutes[index])
    }
  const handleListItemClick = (event, index) => {
    
    setSelectedIndex(index);
   
    navigate(routes[index])
  };
  return (
    <Drawer
        variant="permanent"
        sx={{
          width: {
            xs: "60px",
            sm:"180px",
            lg:'240px'
          },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: {xs:"60px",sm:"180px",
          lg:'240px'}, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'hidden' }}>
          <List>
            <ListItem  disablePadding>
                <ListItemButton 
                
                onClick={(event) => handleListItemClick(event, 0)}
                >
                    <DashboardOutlinedIcon/>
                  <ListItemText primary={'Dashboard'} sx={{marginInline:"12px", display:{xs:"none",sm:"block"}}}/>
                </ListItemButton>
              </ListItem>
            <ListItem  disablePadding>
                <ListItemButton 
                onClick={(event) => handleListItemClick(event, 1)}
                
                >
                    <QrCodeOutlinedIcon/>
                  <ListItemText primary={'Generar QR'} sx={{marginInline:"12px", display:{xs:"none",sm:"block"}}}/>
                </ListItemButton>
              </ListItem>
            <ListItem  disablePadding>
                <ListItemButton 
                onClick={(event) => handleExpand()}
                
                >
                    <DesignServicesIcon/>
                  <ListItemText primary={'Operaciones'} sx={{marginInline:"12px", display:{xs:"none",sm:"block"}}}/>
                  {expand ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={expand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}
          onClick={(e)=>handleSubList(0)}
          >
            <ListItemIcon>
              <CategoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Categorías" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={(e)=>handleSubList(1)}>
            <ListItemIcon>
              <InventoryOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary={localStorage.getItem('type')==='services'?"Servicios":"Productos"} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={(e)=>handleSubList(2)}>
            <ListItemIcon>
              <ListAltIcon/>
            </ListItemIcon>
            <ListItemText primary={localStorage.getItem('type')==='services'?"Reservas":"Pedidos"} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={(e)=>handleSubList(3)}>
            <ListItemIcon>
              <WorkIcon/>
            </ListItemIcon>
            <ListItemText primary="Información" />
          </ListItemButton>
          
        </List>
      </Collapse>
            <ListItem  disablePadding>
                <ListItemButton 
                onClick={(event) => handleListItemClick(event, 3)}
                
                >
                    <SummarizeOutlinedIcon/>
                  <ListItemText primary={'Reportes'} sx={{marginInline:"12px", display:{xs:"none",sm:"block"}}}/>
                </ListItemButton>
              </ListItem>
            <ListItem  disablePadding>
                <ListItemButton 
                onClick={(event) => handleListItemClick(event, 4)}
                
                >
                    <ContactSupportOutlinedIcon/>
                  <ListItemText primary={'Ayuda'} sx={{marginInline:"12px", display:{xs:"none",sm:"block"}}}/>
                </ListItemButton>
                
              </ListItem>
          </List>
          
        </Box>
      </Drawer>
  )
}

export default MenuComponent