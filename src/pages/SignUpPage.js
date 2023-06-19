import { Box, Button, Checkbox, CircularProgress, Divider, FilledInput, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, Link, MenuItem, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme/theme';
import { cyan } from '@mui/material/colors';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import {  signUp } from '../services/service';
import AlertComponent from '../components/AlertComponent';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TermsModalComponent from '../components/TermsModalComponent';
import FooterComponent from '../components/FooterComponent';
const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading]=useState(false)
    const [alert,setAlert]=useState(false)
    const [message,setMessage]=useState(false)
    const [severity,setSeverity]=useState('error')
    const [open,setOpen]=useState(false)
   
    const countryMatch =
    /^[a-zA-Z_0-9\u00C0-\u017F][a-zA-Z_0-9\u00C0-\u017F\s]*$/g;
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik=useFormik({
    initialValues:{
        name:"",
      email:'',
      password:'',
      businessName:'',
      type:"",
      terms:false
    },
    validationSchema:Yup.object().shape({
        name:Yup.string().required("El nombre es requerido").matches(countryMatch,"El nombre solo puede contener letras y espacios."),
      email: Yup.string().required('Ingrese el email con el que se registró').email('El email no es válido'),
      password:Yup.string().required('Ingrese su contraseña'),
      businessName:Yup.string().required("El nombre del negocio es necesario"),
      type:Yup.string().required('Seleccione la opción que ofrece su negocio'),
      terms: Yup.bool().oneOf(
        [true],
        "Debe aceptar los términos y condiciones para continuar"
      )
    }),
    onSubmit:async(values)=>{
      setLoading(true)
      const resp= await signUp(values)
      
      if(resp.success){
        setLoading(false)
        setSeverity('success')
        setMessage(resp.message)
        setAlert(true)
        
      }
      else{
        setLoading(false)
        setSeverity('error')
        setMessage(resp.error)
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
        minHeight:'100vh'
      }}>
<Box className="backGround-shape" sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
       gap:'24px',
        
        margin:'0',
        flexDirection:'column',
        flexGrow:1,
        position:'relative'

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
            mb:12
            ,
            textAlign:'center',
            
        }}>
            <Typography variant='h5' color={cyan[800]}>Registro</Typography>
            <AlertComponent open={alert} severity={severity} message={message} handleClose={()=>setAlert(false)} route={'/login'}/>
            <form onSubmit={formik.handleSubmit}>
                <div>
                <FormControl sx={{mt:2,mb:2, width:'100%'}}>
                <InputLabel htmlFor="name">Nombre</InputLabel>   
            <FilledInput
          
          name='name'
          id="name"
          type={'text'}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="filled"
          error={Boolean(formik.touched.name && formik.errors.name)}
        />
        {formik.touched.name && formik.errors.name && <FormHelperText error>{formik.errors.name}</FormHelperText>}
        </FormControl>
        </div>
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
          {formik.touched.password && formik.errors.password && <FormHelperText error>{formik.errors.password}</FormHelperText>}
          </FormControl></div>
          <Divider/>
          <Typography variant='h6' mt={2} color={cyan[800]}>Datos del Negocio</Typography>
          <div>
                <FormControl sx={{mt:2,mb:2, width:'100%'}}>
                <InputLabel htmlFor="businessName">Nombre</InputLabel>   
            <FilledInput
          
          name='businessName'
          id="bussName"
          type={'text'}
          value={formik.values.businessName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="filled"
          error={Boolean(formik.touched.businessName && formik.errors.businessName)}
        />
        {formik.touched.businessName && formik.errors.businessName && <FormHelperText error>{formik.errors.businessName}</FormHelperText>}
        </FormControl>
        </div>
            

            
        
            
            <TextField 
            id='type'
            name='type'
            variant='filled'
            label='¿Qué ofrece su negocio?'
            fullWidth
            select
            value={formik.values.type || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}>
            <MenuItem value={'services'}>Servicios</MenuItem>
            <MenuItem value={'products'}>Productos</MenuItem>
            </TextField>
            {formik.touched.type && formik.errors.type && (
            <FormHelperText error>{formik.errors.type}</FormHelperText>
          )}
          
        
          <div>
            <Divider></Divider>
            <div>
            <FormControl>
            <FormControlLabel required control={<Checkbox 
            onChange={formik.handleChange}
            name="terms"
            onBlur={formik.handleBlur}
            checked={formik.values.terms}
            />} label={<Link
                  onClick={() => setOpen(true)}  
                >
                  Términos y Condiciones
                </Link>} />
                {formik.touched.terms && formik.errors.terms && (
              <FormHelperText error>{formik.errors.terms}</FormHelperText>
            )}
                </FormControl>
                </div>
          <Button variant='contained' disabled={loading} type='submit' sx={{mt:2, color:'#fff'}}>{loading?'Registrando...':'Registrar'}</Button>
         
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
        
        </Box>
      <FooterComponent/>
      </Box>
    
        <TermsModalComponent open={open} onClose={()=>setOpen(false)}/>
    </ThemeProvider>
  )
}

export default SignUpPage