import { AppBar, Box, Menu, MenuItem, ThemeProvider, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import theme from '../theme/theme';
import { logOut } from '../services/service';

const HeaderComponent = () => {
  const businessId=localStorage.getItem('Business');
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Define the path to title mapping
  const pathToTitle = {
    '/': 'DASHBOARD',
    '/qr': 'GENERAR QR',
    [`/categories/${businessId}`]: 'CATEGORÍAS',
    [`/products/${businessId}`]: 'PRODUCTOS',
    [`/businessDetailsUpdate/${businessId}`]: 'INFORMACIÓN',
    '/excelUpload': 'CARGAR EXCEL',
    '/help': 'AYUDA',
    '/crmData': 'DATOS CRM',
    '/crmPersonalInformation': 'LISTA DE CONTACTOS',
    '/fileUploadText': 'CARGAR TEXTO',
    '/contactList': 'CONTACTOS MARKETING',
    '/report': 'REPORTES',
  };

  // Get the current path
  const currentPath = location.pathname;

  // Get the title for the current path
  const title = pathToTitle[currentPath] || 'Default Header Title';

  const handleClick = () => {
    handleClose();
    logOut();
    navigate('/login');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: '#141741',
          boxShadow: 'none',
          borderBottom: 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ width: '100%', paddingInline: '16px' }}>
            <img className='logo' src={`${process.env.PUBLIC_URL}/LOGO ZAZÚ-01.png`} alt='logo' />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingInline: '18px',
            }}
            onClick={handleMenu}
          >
            <Typography variant="p" mt={2} color={'white'}>
              {localStorage.getItem('user')}
            </Typography>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem onClick={handleClick}>Cerrar Sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default HeaderComponent;
