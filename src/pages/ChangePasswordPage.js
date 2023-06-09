import { Box, Button, CircularProgress, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Paper, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../theme/theme'
import AlertComponent from '../components/AlertComponent'
import { cyan } from '@mui/material/colors'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import {  useParams } from 'react-router-dom'
import FooterComponent from '../components/FooterComponent'
import { changePassword } from '../services/service'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const ChangePasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading,setLoading]=useState(false)
    const [alert,setAlert]=useState(false)
    const [message,setMessage]=useState(false)
    const [severity,setSeverity]=useState('error')
    const {id,token}= useParams()
 
    const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(()=>{},[id,token])
    const formik=useFormik({
        initialValues:{
          password:'',
         
        },
        validationSchema:Yup.object().shape({
          password:Yup.string().required('Ingrese su contraseña')
 
        }),
        onSubmit:async(values)=>{
            console.log(id,token)
          setLoading(true)
          const resp= await changePassword(id,token,values)
          console.log(resp)
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
    <Box className="backGround-shape" sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
       gap:'24px',
        alignItems:'center',
        margin:'0',
        flexDirection:'column',
        minHeight: '100vh',
        position:'relative'
        
    }}>
        <Paper sx={{
            display:'flex',
            width:{xs:'70%',sm:'50%',lg:'30%'},
            alignContent:'center',
            alignItems:"center",
            justifyContent:'center',
            padding:'32px',
            flexDirection:'column',
            borderRadius:'32px',
            mt:8,
            mb:12,
            gap:'18px',
            textAlign:'center',
            
        }}>
            <Typography variant='h4' color={cyan[800]}>Nueva contraseña</Typography>
            <AlertComponent open={alert} severity={severity} message={message} handleClose={()=>setAlert(false)} route={'/login'}/>
            <form onSubmit={formik.handleSubmit}>
                
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
          
          <div>
          <Button variant='contained' disabled={loading} type='submit' sx={{mt:2, color:'#fff'}}>{loading?'Ingresando...':'Ingresar'}</Button>
         
          </div>
           {loading && <CircularProgress color='primary'/>}
            </form>
            </Paper>
            <FooterComponent/>
    </Box>
    </ThemeProvider>
  )
}

export default ChangePasswordPage