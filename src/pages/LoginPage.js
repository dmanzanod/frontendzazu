import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme/theme';
import { cyan, orange } from '@mui/material/colors';
import FooterComponent from '../components/FooterComponent';
const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <ThemeProvider theme={theme}>
    <Box className="backGround-shape" sx={{
        display:'flex',
        alignContent:'center',
        justifyContent:'flex-start',
       gap:'24px',
        alignItems:'center',
        margin:'0',
        flexDirection:'column',
        minHeight: '100vh'


    }}>
      <Box
      sx={{
        paddingBlock:'12px'
      }}>
        <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="logo"/>
      </Box>
      
        <Paper sx={{
            display:'flex',
            width:{xs:'70%',sm:'50%',lg:'30%'},
            alignContent:'center',
            justifyContent:'center',
            padding:'32px',
            flexDirection:'column',
            borderRadius:'32px',
            mt:1,
            textAlign:'center',
            
        }}>
            <Typography variant='h5' color={cyan[800]}>Iniciar sesión</Typography>
            <form>
                <div>
                <FormControl sx={{mt:2,mb:2, width:'100%'}}>
                <InputLabel htmlFor="email">Email</InputLabel>   
            <FilledInput
          
          name='email'
          id="email"
          type={'email'}
          
          variant="filled"
        />
        </FormControl>
        </div>
        <div>
        <FormControl sx={{mt:2,mb:2, width:'100%'}}>
        <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
            id="password"
            
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          </FormControl></div>
          <div>
          <Link sx={{mb:2}}>Olvidé mi contraseña</Link>
          </div>
          <div>
          <Button variant='contained' sx={{mt:2, color:'#fff'}}>Ingresar</Button>
          </div>
            </form>
        </Paper>
        <Box className='backGround-shape'  sx={{
             backgroundImage:`url(${process.env.PUBLIC_URL}/bot.png)`,
             display:'flex',
             width:{xs:'40%',sm:'20%'},
             height:{xs:'95px',sm:'150px'},
             alignSelf:'flex-end',
             marginInline:'10%'
        }}>

        </Box>
        <FooterComponent/>

    </Box>
    </ThemeProvider>
  )
}

export default LoginPage