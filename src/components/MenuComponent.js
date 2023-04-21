import { Box, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon, Toolbar } from '@mui/material'
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
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
const MenuComponent = () => {
    const icons=[<DashboardOutlinedIcon/>,<QrCodeOutlinedIcon/>,<DesignServicesIcon/>,<SummarizeOutlinedIcon/>,<ContactSupportOutlinedIcon/>];
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
      const subRoutes=['/categories/643d4b1b9e19c3e7b5862152','/products/643d4b1b9e19c3e7b5862152']
      navigate(subRoutes[index])
    }
  const handleListItemClick = (event, index) => {
    
    setSelectedIndex(index);
   console.log(location.pathname)
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
                  <ListItemText primary={'Tablero'} sx={{marginInline:"12px", display:{xs:"none",sm:"block"}}}/>
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
            <ListItemText primary="Servicios" />
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