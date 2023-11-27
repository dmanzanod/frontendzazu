import React, { useEffect, useState } from 'react';
import Principal from './Principal';
import { Box } from '@mui/material';
import CRMComponent from '../components/CrmComponent';

const CRMPage = () => {
  return (
    <Principal>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', // Aligns items at the center vertically
          flexDirection: 'column',
          //backgroundColor: '#F4F3FA',
          paddingTop: '72px', // Adjust the padding to create space for the header
        }}
      >
        <div style={{ marginTop: '32px', fontSize: '18px' }}></div>
        <Box
          sx={{
            width: '80%', // Adjust the width of the CRMComponent container
            maxWidth: '1200px', // Maximum width for responsiveness
          }}
        >
          <CRMComponent />
        </Box>
        <div style={{ marginTop: '32px', fontSize: '18px' }}></div>
      </Box>
    </Principal>
  );
};

export default CRMPage;
