import { Box, Button, CircularProgress, FilledInput, FormControl, FormHelperText, InputLabel, Paper, ThemeProvider, Typography } from '@mui/material'
import React, { useState } from 'react'
import theme from '../theme/theme'
import AlertComponent from '../components/AlertComponent'
import { cyan } from '@mui/material/colors'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { resetPassword } from '../services/service'
import FooterComponent from '../components/FooterComponent'
const RequestNewPasswordPage = () => {
    const [loading,setLoading]=useState(false)
    const [alert,setAlert]=useState(false)
    const [message,setMessage]=useState(false)
    const [severity,setSeverity]=useState('error')
    const formik=useFormik({
        initialValues:{
          email:'',
         
        },
        validationSchema:Yup.object().shape({
          email: Yup.string().required('Ingrese el email con el que se registró').email('El email no es válido'),
          
          
        }),
        onSubmit:async(values)=>{
          setLoading(true)
          const resp= await resetPassword(values)
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
            mb:3,
            textAlign:'center'
            
        }}>
            <Typography variant='h4' color={cyan[800]}>Recuperar contraseña</Typography>
            <AlertComponent open={alert} severity={severity} message={message} handleClose={()=>setAlert(false)} route={'/login'}/>
            <Typography variant='p' sx={{textAlign:'left',fontSize:'14px',mt:2}}>Ingrese el mail con el que se registró para reestablecer su contraseña</Typography>
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
          <Button variant='contained' disabled={loading} type='submit' sx={{mt:2, color:'#fff'}}>{loading?'Enviando...':'Enviar'}</Button>
         
          </div>
           {loading && <CircularProgress color='primary'/>}
            </form>
            </Paper>
            <FooterComponent/>
        </Box>
        </ThemeProvider>
  )
}

export default RequestNewPasswordPage