import { Box, Button, CircularProgress, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme/theme';
import { cyan } from '@mui/material/colors';

import * as Yup from 'yup'
import { useFormik } from 'formik';
import { login } from '../services/service';
import AlertComponent from '../components/AlertComponent';
import { useNavigate } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent';
import {authAdminVerification} from '../services/service'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading]=useState(false)
    const [alert,setAlert]=useState(false)
    const [message,setMessage]=useState(false)
    const [isAdmin, setIsAdmin] = useState(false);
    const [severity,setSeverity]=useState('error')
    const navigate =useNavigate()
    const handleCheckboxChange = (checked) => {
      setIsAdmin(checked);
    };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik=useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:Yup.object().shape({
      email: Yup.string().required('Ingrese el email con el que se registró').email('El email no es válido'),
      password:Yup.string().required('Ingrese su contraseña')
    }),
    onSubmit:async(values)=>{
      setLoading(true)
      const resp= await login(values) //Aqui pode ksagregar el isAdmin value , verificar esto cuando se cree el modelo y la nueva clase de usuario
      
      if(resp.success){
        setLoading(false)
        localStorage.setItem('UserId', resp.data.userId);
        localStorage.setItem('Auth',resp.data.token);
        localStorage.setItem('Business',resp.data.businessId);
        localStorage.setItem('user',resp.data.name);
        localStorage.setItem('type',resp.data.type);
        localStorage.setItem('ScheduleId',resp.data.scheduleId);
        localStorage.setItem('url',resp.data.url);
        localStorage.setItem('BusinessType', resp.data.BusinessType);
        navigate('/');
        //const isAdminResp = await authAdminVerification();
        // if(isAdminResp.role === 'admin'){
        //   navigate('/dashboardAdmin');
        // }else{
        //   navigate('/');
        // }
        
      }
      else{
        setLoading(false)
        setSeverity('error')
        setMessage(resp.error?resp.error:'Error: credenciales incorrectas.')
        setAlert(true)
        

      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignContent:'center',
        width:'100%',
        minHeight:'100vh'
      }}>
<Box className="backGround-shape" sx={{
        display:'flex',
       
        justifyContent:'flex-start',
       gap:'24px',
        alignItems:'center',
        margin:'0',
        flexDirection:'column',
        
        flexGrow:1

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
            mb:6,
            textAlign:'center'
            
        }}>
            <Typography variant='h5' color={cyan[800]}>Iniciar sesión</Typography>
            <AlertComponent open={alert} severity={severity} message={message} handleClose={()=>setAlert(false)}/>
            <form onSubmit={formik.handleSubmit}>
                <div>
                <FormControl sx={{mt:2,mb:2, width:'100%'}}>
                <InputLabel htmlFor="email">Email</InputLabel>   
            <FilledInput
          
          name='email'
          id="email"
          type={'email'}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="filled"
          error={Boolean(formik.touched.email && formik.errors.email)}
        />
        {formik.touched.email && formik.errors.email && <FormHelperText error>{formik.errors.email}</FormHelperText>}
        </FormControl>
        </div>
        <div>
        <FormControl sx={{mt:2,mb:2, width:'100%'}}>
        <InputLabel htmlFor="password">Password</InputLabel>
            <FilledInput
            id="password"
            name='password'
            value={formik.values.password}
            error={Boolean(formik.errors.password && formik.touched.password)}
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
           {/* <div>
              <FormControlLabel
                control={<Checkbox />}
                label="Administrador de grupo"
                onChange={(e) => handleCheckboxChange(e.target.checked)}
              />
            </div> */}
          {formik.touched.password && formik.errors.password && <FormHelperText error>{formik.errors.password}</FormHelperText>}
          </FormControl>
          </div>
          <div>
          <Link sx={{marginInline:'auto'}} href='/forgotPassword'>Olvidé mi contraseña</Link>
          </div>
          <div>
          <Link sx={{mb:2,mt:4}} href='/signUp'>¿No tienes cuenta? Regístrate</Link>
          </div>
          <div>
          <Button variant='contained' disabled={loading} type='submit' sx={{mt:2, color:'#fff'}}>{loading?'Ingresando...':'Ingresar'}</Button>
         
          </div>
           {loading && <CircularProgress color='primary'/>}
            </form>
        </Paper>
        {/* <Box className='backGround-shape'  sx={{
             backgroundImage:`url(${process.env.PUBLIC_URL}/bot.png)`,
             display:'flex',
             width:{xs:'40%',sm:'20%'},
             height:{xs:'95px',sm:'150px'},
             alignSelf:'flex-end',
             marginInline:'10%'
        }}> 

        </Box>*/}
        
        

    </Box >
    <Box
      component='footer'
     sx={{
    width: '100%',
    background: cyan[600],
    height: '72px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    gap: '24px',
    zIndex: (theme) => theme.zIndex.drawer + 1,
    boxShadow: '0px -5px 50px rgba(0, 0, 0, 0.1)', // Add this line for upper shadow
  }}
>
<FooterComponent/>
</Box>

    
    </Box>
    
   
    </ThemeProvider>
  )
}

export default LoginPage