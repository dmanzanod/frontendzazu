import { Box, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import FCBOOK from '../assets/images/FCBK-azul.png';
import NSTAGRAM from '../assets/images/NSTGRM-azul.png';
import TKTOK from '../assets/images/TKTK-azul.png';

const FooterComponent = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        background: '#00CDFF',
        height: '72px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box display="flex" alignItems="center" gap="24px">
        <IconButton>
          <Link href="https://www.instagram.com/zazuservice/" target="_blank">
            <Box
              component="img"
              src={NSTAGRAM}
              alt="Instagram"
              sx={{ width: 60, height: 60, objectFit: 'contain' }}
            />
          </Link>
        </IconButton>
        <IconButton>
          <Link href="https://www.facebook.com/zazuservice" target="_blank">
            <Box
              component="img"
              src={FCBOOK}
              alt="Facebook"
              sx={{ width: 60, height: 60, objectFit: 'contain' }}
            />
          </Link>
        </IconButton>
        <IconButton>
          <Link href="https://www.tiktok.com/@zazuservice" target="_blank">
            <Box
              component="img"
              src={TKTOK}
              alt="TikTok"
              sx={{ width: 60, height: 60, objectFit: 'contain' }}
            />
          </Link>
        </IconButton>
      </Box>
    </Box>
  );
};

export default FooterComponent;
