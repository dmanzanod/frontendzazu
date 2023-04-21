import { Box, Button, Paper, Typography } from '@mui/material'
import { textAlign } from '@mui/system'
import React from 'react'
import Principal from './Principal'

const QRPage = () => {
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

            
            <Button variant='contained' color='error' sx={{
                    width:'200px',
                    height:"60px",
                    alignSelf:'center'
            }}>Generar QR</Button>
            <Typography variant="h6">Esto puede demorar unos minutos.</Typography>
            </Paper>
        </Box>
    </Principal>
  )
}

export default QRPage