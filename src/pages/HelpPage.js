import React, { useState } from 'react'
import Principal from './Principal'

import { Box, Link, Paper, Typography } from '@mui/material'
import TermsModalComponent from '../components/TermsModalComponent'

const HelpPage = () => {
    const[open,setOpen]=useState(false)
  return (
    <Principal>
        <Box sx={{
            display:'flex',
            
            
            width:'100%'
        }}>
            <Paper sx={{
                paddingTop:12,
                paddingInline:{xs:4,sm:12},
                display:'flex',
                flexDirection:'column',
                gap:'14px',
                alignContent:'center',
                height:'100%',
                width:'100%'
            }}>
                <Typography variant='h4'>Links de ayuda</Typography>
                <Link onClick={()=>setOpen(true)}>Términos y condiciones de uso</Link>
            </Paper>
            
        </Box>
        <TermsModalComponent open={open} onClose={()=>setOpen(false)} />
    </Principal>
  )
}

export default HelpPage