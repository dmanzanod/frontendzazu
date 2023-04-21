import styled from "@emotion/styled";
import { AppBar, Box, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { cyan } from "@mui/material/colors";
import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
const FooterComponent = () => {
    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  return (
    
    <Box 
    component='footer'
    
    sx={{
        width:'100%',
        background: cyan[600],
        height:'72px',
        display: 'flex',
        justifyContent:'center',
        alignContent:'center',
        gap:'24px',
        position:'absolute',
        bottom:0,
        zIndex: (theme) => theme.zIndex.drawer + 1
    }}>
        <img className="bot" src={`${process.env.PUBLIC_URL}/bot.png`}/>
        <Box>
            
        
        <Box >
        <IconButton>
            <Link href='https://www.instagram.com/zazuservice_/' target={'_blank'} color={'secondary'} sx={{mt:0.5}}>
            <InstagramIcon color={'secondary'}/>
            </Link>
        </IconButton>
        <IconButton color={'secondary'} >
            <Link href=" https://www.facebook.com/zazuservice" target={'_blank'} color={'secondary'} sx={{mt:0.5}}>
            <FacebookIcon/>
            </Link>
        </IconButton>
        </Box>
        <Typography variant="p" color={'white'}>Contáctanos</Typography>
        </Box>
    </Box>
    
    
  );
};

export default FooterComponent;
