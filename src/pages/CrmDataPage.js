  // CRMPage.js
  import React from 'react';
  import Principal from './Principal';
  import { Box } from '@mui/material';
  import CRMComponent from '../components/CrmComponent';

  const CRMPage = () => {
    return (
      <Principal>
        <Box
          sx={{
            flexGrow: 1,
            display: 'grid',
            backgroundColor: '#F4F3FA',
            gridRowGap: '32px',
            gridTemplateRows: { xs: '1fr', sm: '1fr' },
            gridTemplateColumns: { xs: '1fr', sm: '1fr' },
            gridColumnGap: '24px',
            mt: '40px',
            minWidth: '100%',
            minHeight:'100%'
          }}
        >
          
            <CRMComponent />
          
        </Box>
      </Principal>
    );
  };

  export default CRMPage;
