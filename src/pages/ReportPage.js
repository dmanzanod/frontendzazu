import React from 'react'
import Principal from './Principal'
import { Box, Icon, Paper, Typography } from '@mui/material'
import { Dataset, PictureAsPdf } from '@mui/icons-material'

const ReportPage = () => {
  return (
   <Principal>
    <Box
        sx={{
          backgroundColor: "#F4F3FA",

          display: "flex",
          alignContent: "center",
          width: "100%",

          gap: "24px",

          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "72px",
        }}
      >

      </Box>
      <Paper
          sx={{
            display: "flex",
            alignContent: "center",
          
            flexDirection: "column",
            gap: "72px",
            padding: "32px",
            textAlign: "center",
            
            width: { xs: "80%", sm: "60%", lg: "50%" },
            alignSelf: "center",
            marginInline: "auto",
            mb: 1,
          }}
        >
            <Typography variant='h3' color={'primary'}>
                Reportes
            </Typography>
            
            <Typography variant='subtitle2'>
                Exporte sus datos para tenerlos a mano
            </Typography>
            <Box sx={{
                display:'flex',
                alignItems:'center',
                
                flexDirection:{xs:'column',sm:'row'},
                gap:'24px',
                justifyContent:'center'
            }}>
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:'12px',
                    cursor:'pointer'
                }}>
                    <Dataset/>
                    <Typography variant='body1'>Reservas</Typography>
                </Box>
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    gap:'12px',
                    cursor:'pointer'
                }}>
                    <PictureAsPdf/>
                    <Typography variant='body1'>Indicadores</Typography>
                </Box>
                <Box sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    gap:'12px',
                    alignItems:'center',
                    cursor:'pointer'
                }}>
                    <PictureAsPdf/>
                    <Typography variant='body1'>Catálogo</Typography>
                </Box>
            </Box>
            
        </Paper>
   </Principal>
  )
}

export default ReportPage