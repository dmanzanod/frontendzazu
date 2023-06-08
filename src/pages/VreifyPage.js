import { Box, Button, CircularProgress, Paper, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../theme/theme'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { verify } from '../services/service';
import { cyan } from '@mui/material/colors';
const VerifyPage = () => {
    const {id,token}=useParams()
    const[validUrl,setValidUrl]=useState(false)
    const [loading,setLoading]=useState(false)
    const navigate =useNavigate()
    useEffect(()=>{
        const verifyUser=async()=>{
            setLoading(true)
            const resp= await verify(id,token)
            if(resp.success){
                setLoading(false)
                setValidUrl(true)
            }
            else{
                setLoading(false)
                setValidUrl(false)
            }
        }
        verifyUser()
    },[id,token])
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
            <Typography variant='h4' color={cyan[800]}>Verificación de email</Typography>
                {loading && <CircularProgress color='primary'/>}
                {validUrl && !loading?<CheckCircleIcon color={'success'} sx={{fontSize:'36px'}}/>:
                <ErrorIcon color='error' sx={{fontSize:'36px'}}/>
                }
                <Typography variant='h5'>{validUrl && !loading?'Cuenta verificada':'No se pudo verificar la cuenta'}</Typography>
                {validUrl && !loading && <Button sx={{color:'white', width:'45%'}} variant='contained' onClick={()=>navigate('/login')}>Login</Button>}
            </Paper>
    </Box>
    </ThemeProvider>
  )
}

export default VerifyPage