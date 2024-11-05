import { Box, Collapse,  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  Toolbar, Tooltip } from '@mui/material'
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
        width: isOpen ? "60px" : { xs: "240px", sm: "240px", lg: '240px' },
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isOpen ? "60px" : { xs: "240px", sm: "240px", lg: '240px' },
          boxSizing: 'border-box',
          backgroundColor: '#40B6E9',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto',
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#40B6E9',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#006f9b',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#004f75',
      }
    }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleMenu}>
              <MenuIcon />
            </ListItemButton>
          </ListItem>

          <Tooltip title="Dashboard" placement="right"  componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleListItemClick(event, 0)}>
                <DashboardOutlinedIcon />
                <ListItemText primary={'DASHBOARD'} sx={{ marginInline: "12px", display: { xs: "none", sm: isOpen ? "none" : "block" } }} />
              </ListItemButton>
            </ListItem>
          </Tooltip>

          <Tooltip title="Generar QR" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleListItemClick(event, 1)}>
                <QrCodeOutlinedIcon />
                <ListItemText primary={'GENERAR QR'} sx={{ marginInline: "12px", display: { xs: "none", sm: isOpen ? "none" : "block" } }} />
              </ListItemButton>
            </ListItem>
          </Tooltip>

          <Tooltip title="Operaciones" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleExpand()}>
                <DesignServicesIcon />
                <ListItemText primary={'OPERACIONES'} sx={{ marginInline: "12px", display: { xs: "none", sm: isOpen ? "none" : "block" } }} />
                {expand ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          <Collapse in={expand} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Tooltip title="Categorías" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
                <ListItemButton sx={{ pl: 4 }} onClick={(e) => handleSubList(0)}>
                  <ListItemIcon>
                    <CategoryOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="CATEGORÍAS" />
                </ListItemButton>
              </Tooltip>

              <Tooltip title={localStorage.getItem('type') === 'services' ? "Servicios" : "Productos"} placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
                <ListItemButton sx={{ pl: 4 }} onClick={(e) => handleSubList(1)}>
                  <ListItemIcon>
                    <InventoryOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={localStorage.getItem('type') === 'services' ? "SERVICIOS" : "PRODUCTOS"} />
                </ListItemButton>
              </Tooltip>

              {BusinessType !== "Asistente virtual cba" && (
                <Tooltip title={localStorage.getItem('type') === 'services' ? "Reservas" : "Pedidos"} placement="right" componentsProps={{
                  tooltip: {
                    sx: { fontSize: '1.2rem' } 
                  },
                }}>
                  <ListItemButton sx={{ pl: 4 }} onClick={(e) => handleSubList(2)}>
                    <ListItemIcon>
                      <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={localStorage.getItem('type') === 'services' ? "RESERVAS" : "PEDIDOS"} />
                  </ListItemButton>
                </Tooltip>
              )}

              <Tooltip title="Información" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
                <ListItemButton sx={{ pl: 4 }} onClick={(e) => handleSubList(3)}>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary="INFORMACIÓN" />
                </ListItemButton>
              </Tooltip>

              {localStorage.getItem('type') === 'services' && (
                <Tooltip title="Agenda" placement="right" componentsProps={{
                  tooltip: {
                    sx: { fontSize: '1.2rem' } 
                  },
                }}>
                  <ListItemButton sx={{ pl: 4 }} onClick={(e) => handleSubList(4)}>
                    <ListItemIcon>
                      <CalendarIcon />
                    </ListItemIcon>
                    <ListItemText primary="AGENDA" />
                  </ListItemButton>
                </Tooltip>
              )}

              <Tooltip title="Cargar Excel" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
                <ListItemButton sx={{ pl: 4 }} onClick={(event) => handleListItemClick(event, 5)}>
                  <ListItemIcon>
                    <ExcelUploadIcon />
                  </ListItemIcon>
                  <ListItemText primary={'CARGAR EXCEL'} />
                </ListItemButton>
              </Tooltip>

              <Tooltip title="Cargar Texto" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
                <ListItemButton sx={{ pl: 4 }} onClick={(event) => handleListItemClick(event, 8)}>
                  <ListItemIcon>
                    <UploadFile />
                  </ListItemIcon>
                  <ListItemText primary={'CARGAR TEXTO'} />
                </ListItemButton>
              </Tooltip>
            </List>
          </Collapse>

          <Tooltip title="CRM" placement="right"componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleExpandCRM()}>
                <ContactsIcon />
                <ListItemText primary={'CRM'} sx={{ marginInline: "12px", display: { xs: "none", sm: isOpen ? "none" : "block" } }} />
                {expandCRM ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          <Collapse in={expandCRM} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Tooltip title="EMBUDO DE CONVERSIÓN" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={(event) => handleListItemClick(event, 6)}>
                    <ListItemIcon>
                      <Groups3Icon />
                    </ListItemIcon>
                    <ListItemText primary={'EMBUDO DE CONVERSIÓN'} />
                  </ListItemButton>
                </ListItem>
              </Tooltip>

              <Tooltip title="CRM" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={(event) => handleListItemClick(event, 7)}>
                    <ListItemIcon>
                      <PeopleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={'CRM'} />
                  </ListItemButton>
                </ListItem>
              </Tooltip>

              <Tooltip title="Contactos Marketing" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={(event) => handleListItemClick(event, 9)}>
                    <ListItemIcon>
                      <PeopleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={'CONTACTOS MARKETING'} />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </List>
          </Collapse>

          <Tooltip title="Reportes" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleListItemClick(event, 3)}>
                <SummarizeOutlinedIcon />
                <ListItemText primary={'REPORTES'} sx={{ marginInline: "12px", display: { xs: "none", sm: isOpen ? "none" : "block" } }} />
              </ListItemButton>
            </ListItem>
          </Tooltip>

          <Tooltip title="Ayuda" placement="right" componentsProps={{
              tooltip: {
                sx: { fontSize: '1.2rem' } 
              },
            }}>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleListItemClick(event, 4)}>
                <ContactSupportOutlinedIcon />
                <ListItemText primary={'AYUDA'} sx={{ marginInline: "12px", display: { xs: "none", sm: isOpen ? "none" : "block" } }} />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
      </Box>
    </Drawer>
  );
};

export default MenuComponent;