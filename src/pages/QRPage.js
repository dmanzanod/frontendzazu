import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { textAlign } from '@mui/system'
import React, { useState } from 'react'
import Principal from './Principal'
import { getQr } from '../services/service'
import QRCode from 'react-qr-code'

const QRPage = () => {
  const [qr,setQr]=useState('')
  const[image,setImage]=useState('')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const getBotQr=async()=>{
    setLoading(true)
    const resp= await getQr(localStorage.getItem('Business'))
    console.log(resp)
    if(!resp.error){
      if(resp.ok){
        // setQr(resp.qr.split(',')[1])
        setLoading(false)
        setImage(resp.qr)
        setQr('')
        setError('')
      }
      else{
        setLoading(false)
        setImage('')
      setQr(resp.qr)
      setError('')
      }
      
      
    }
    else{
      setLoading(false)
      setQr('')
      setImage('')
      setError('Ha ocurrido un error al generar el código. Intente de nuevo más tarde.')
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
            mb:1

            }}>

            
           {!loading && qr==='' && qr!=='connected' && image==='' &&<Button variant='contained' color='error' sx={{
                    width:'200px',
                    height:"60px",
                    alignSelf:'center'
            }}
            onClick={getBotQr}
            >Generar QR</Button>}
            {loading && <CircularProgress color='primary' sx={{alignSelf:'center'}}/>}
            {qr!=='' && qr!=='connected' && image===''&&
            <QRCode
            size={256}
            style={{alignSelf:'center'}}
            value={qr}
            />


            }
            {qr==='' && qr!=='connected' && image!==''&&
            <img className='image__qr' src={image}/>


            }
            
            <Typography variant="h6">{qr==='connected'?'Usted está conectado':error!==''?error:'Esto puede demorar unos minutos.'}</Typography>
            </Paper>
        </Box>
    </Principal>
  )
}

export default QRPage