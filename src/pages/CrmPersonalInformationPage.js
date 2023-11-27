import React, { useState, useEffect } from 'react';
import { getCrmDataByYear } from '../services/service';
import CrmPersonalInformationComponent from '../components/CrmPersonalInformationComponent';
import Principal from './Principal';
import { Box, Typography } from '@mui/material';

const CrmPersonalInformationPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCrmDataByYear(2023, localStorage.getItem('Business'));
        if (response.success) {
            console.log(response.data)
          setContacts(response.data);
        } else {
          // Handle error in fetching data
        }
      } catch (error) {
        // Handle error in fetching data
      }
    };

    fetchData();
  }, []);

  return (
    <Principal>
      <Box sx={{ p: { xs: '10px', md: '40px' }, textAlign: 'center' }}>
      <Box
        sx={{
            mx: 'auto',
            width: '100%',
            maxWidth: '1200px', // Match the maxWidth with the component's maxWidth
            padding: '0 20px',
        }}
        >
          {/* Adjust the component's props accordingly */}
          <CrmPersonalInformationComponent contacts={contacts} />
        </Box>
      </Box>
    </Principal>
  );
};

export default CrmPersonalInformationPage;
