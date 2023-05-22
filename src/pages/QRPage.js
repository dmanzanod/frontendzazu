import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { textAlign } from '@mui/system'
import React, { useState } from 'react'
import Principal from './Principal'
import { getQr } from '../services/service'
import QRCode from 'react-qr-code'

const QRPage = () => {
  const [qr,setQr]=useState('')
  const [loading,setLoading]=useState(false)
  
  const getBotQr=async()=>{
    setLoading(true)
    const resp= await getQr(localStorage.getItem('Business'))
    if(resp!==''){
      setLoading(false)
      setQr(resp.qr)
    }
  }
  return (
    <Principal>
        <Box sx={{
            backgroundColor:"#F4F3FA",
            
            display:'flex',
            alignContent:"center",
            width:"100%",
            
            gap:'24px',
            
            justifyContent:"center",
            flexDirection:'column'



        }}>
            <Paper sx={{
                display: 'flex',
                alignContent:"center",
                justifyContent:"center",
            flexDirection:'column',
            gap:'24px',
            padding: "32px",
            textAlign:"center",
            height: "450px",
            width:{xs:'80%', sm:'60%', lg:'50%'},
            alignSelf:'center',
            marginInline:'auto',
            

            }}>

            
           {!loading && qr==='' && qr!=='connected' &&<Button variant='contained' color='error' sx={{
                    width:'200px',
                    height:"60px",
                    alignSelf:'center'
            }}
            onClick={getBotQr}
            >Generar QR</Button>}
            {loading && <CircularProgress color='primary' sx={{alignSelf:'center'}}/>}
            {qr!=='' && qr!=='connected' &&
            <QRCode
            size={256}
            style={{alignSelf:'center'}}
            value={qr}
            />


            }
            
            <Typography variant="h6">{qr==='connected'?'Usted está conectado':'Esto puede demorar unos minutos.'}</Typography>
            </Paper>
        </Box>
    </Principal>
  )
}

export default QRPage