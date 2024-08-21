import { Box, Collapse,  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  Toolbar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ContactsIcon from '@mui/icons-material/Contacts';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work'
import ListAltIcon from '@mui/icons-material/ListAlt';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { CalendarIcon } from '@mui/x-date-pickers';
import ExcelUploadIcon from '@mui/icons-material/CloudUpload'
import { UploadFile } from '@mui/icons-material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Groups3Icon from '@mui/icons-material/Groups3';
import MenuIcon from '@mui/icons-material/Menu'
const MenuComponent = () => {
    
    const [expand, setExpand]=useState(false)
    const [expandCRM, setExpandCRM] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const BusinessType = localStorage.getItem('BusinessType');
    const routes=['/','/qr','/crud','/report','/help','/excelUpload','/crmData','/crmPersonalInformation', '/fileUploadText','/contactList']
    const navigate=useNavigate()
    const location=useLocation()
    const [isOpen, setIsOpen] = useState(false);

    const handleExpand=()=>{
      setSelectedIndex(2)
      setExpand(!expand)
    }
    
    const handleExpandCRM = () => {
      setExpandCRM(!expandCRM);
      setSelectedIndex(6);
    };

     const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSubList=(index)=>{
      const subRoutes=[`/categories/${localStorage.getItem('Business')}`,`/products/${localStorage.getItem('Business')}`,`/bookingDetails/${localStorage.getItem('Business')}`,`/businessDetailsUpdate/${localStorage.getItem('Business')}`,'/schedule']
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
        width: isOpen ? "60px" : { xs: "60px", sm: "180px", lg: '240px' },
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
            width: isOpen ? "60px" : { xs: "60px", sm: "180px", lg: '240px' }, 
            boxSizing: 'border-box',
        },
    }}
>
        <Toolbar />
        <Box sx={{ overflow: 'hidden' }}>
        
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleMenu}>
                <MenuIcon />
              </ListItemButton>
            </ListItem>
          
            <ListItem  disablePadding>
                <ListItemButton 
                
                onClick={(event) => handleListItemClick(event, 0)}
                >
                    <DashboardOutlinedIcon/>
                  <ListItemText primary={'DASHBOARD'} sx={{marginInline:"12px", display:{xs:"none",sm: isOpen ? "none" : "block"}}}/>
                </ListItemButton>
              </ListItem>
            <ListItem  disablePadding>
                <ListItemButton 
                onClick={(event) => handleListItemClick(event, 1)}
                
                >
                    <QrCodeOutlinedIcon/>
                  <ListItemText primary={'GENERAR QR'} sx={{marginInline:"12px", display:{xs:"none",sm: isOpen ? "none" : "block"}}}/>
                </ListItemButton>
              </ListItem>
            <ListItem  disablePadding>
                <ListItemButton 
                onClick={(event) => handleExpand()}
                
                >
                    <DesignServicesIcon/>
                  <ListItemText primary={'OPERACIONES'} sx={{marginInline:"12px", display:{xs:"none",sm: isOpen ? "none" : "block"}}}/>
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
            <ListItemText primary="CATEGORÍAS" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={(e)=>handleSubList(1)}>
            <ListItemIcon>
              <InventoryOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary={localStorage.getItem('type')==='services'?"SERVICIOS":"PRODUCTOS"} />
          </ListItemButton>
          {BusinessType !== "Asistente virtual cba" && (
          <ListItemButton sx={{ pl: 4 }} onClick={(e)=>handleSubList(2)}>
            <ListItemIcon>
              <ListAltIcon/>
            </ListItemIcon>
            <ListItemText primary={localStorage.getItem('type')==='services'?"RESERVAS":"PEDIDOS"} />
          </ListItemButton>
          )}
          <ListItemButton sx={{ pl: 4 }} onClick={(e)=>handleSubList(3)}>
            <ListItemIcon>
              <WorkIcon/>
            </ListItemIcon>
            <ListItemText primary="INFORMACIÓN" />
          </ListItemButton>
          {
            localStorage.getItem('type')==='services'&&<ListItemButton sx={{ pl: 4 }} onClick={(e)=>handleSubList(4)}>
            <ListItemIcon>
              <CalendarIcon/>
            </ListItemIcon>
            <ListItemText primary="AGENDA" />
            </ListItemButton>
          }
          
            <ListItemButton
              sx={{ pl:4}} onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon>
              <ExcelUploadIcon />
            </ListItemIcon>
              
              <ListItemText primary={'CARGAR EXCEL'}/>
            </ListItemButton>

           
              <ListItemButton
              sx={{ pl:4}} onClick={(event) => handleListItemClick(event, 8)}
            >
              <ListItemIcon>
              <UploadFile />
            </ListItemIcon>
              
              <ListItemText primary={'CARGAR TEXTO'}/>
            </ListItemButton>
        </List>
      </Collapse>
      <ListItem  disablePadding>
                <ListItemButton 
                onClick={(event) => handleExpandCRM()}
                
                >
                    <ContactsIcon/>
                  <ListItemText primary={'CRM'} sx={{marginInline:"12px", display:{xs:"none",sm: isOpen ? "none" : "block"}}}/>
                  {expand ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
        <Collapse in={expandCRM} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItem  disablePadding>
              <ListItemButton
              sx={{ pl:4}} onClick={(event) => handleListItemClick(event, 6)}
            >
              <ListItemIcon>
              <Groups3Icon /> 
              </ListItemIcon>           
              <ListItemText primary={'DATOS CRM'} />
            </ListItemButton>
            </ListItem>

            <ListItem  disablePadding>
              <ListItemButton
              sx={{ pl:4}} onClick={(event) => handleListItemClick(event, 7)}
            >
              <ListItemIcon>
              <PeopleOutlineIcon />
              </ListItemIcon>            
              <ListItemText primary={'LISTA DE CONTACTOS'} />
            </ListItemButton>
            </ListItem>

            <ListItem  disablePadding>
              <ListItemButton
              sx={{ pl:4}} onClick={(event) => handleListItemClick(event, 9)}
            >
              <ListItemIcon>
              <PeopleOutlineIcon />
              </ListItemIcon>            
              <ListItemText primary={'CONTACTOS MARKETING'} />
            </ListItemButton>
            </ListItem>

            </List>
      </Collapse>
            <ListItem  disablePadding>
                <ListItemButton 
                onClick={(event) => handleListItemClick(event, 3)}
                
                >
                    <SummarizeOutlinedIcon/>
                  <ListItemText primary={'REPORTES'} sx={{marginInline:"12px", display:{xs:"none",sm: isOpen ? "none" : "block"}}}/>
                </ListItemButton>
              </ListItem>
            <ListItem  disablePadding>
                <ListItemButton 
                onClick={(event) => handleListItemClick(event, 4)}       
                >
                    <ContactSupportOutlinedIcon/>
                  <ListItemText primary={'AYUDA'} sx={{marginInline:"12px", display:{xs:"none",sm: isOpen ? "none" : "block"}}}/>
                </ListItemButton>               
              </ListItem>
              
          </List>
          
        </Box>
      </Drawer>
  )
}

export default MenuComponent