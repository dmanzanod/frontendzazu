import React, { useEffect, useState } from 'react';
import Principal from './Principal';
import ContactDashboardComponent from '../components/ComponentsContacts/ContactDashboardComponent';
import Box from '@mui/material/Box';

const ContactListPage = () => {
  useEffect(() => {
    // Add any necessary code inside the useEffect function
  }, []);

  return (
    <Principal>
      <Box sx={{ padding: '16px' }}> {/* Adjust the padding as needed */}
        <ContactDashboardComponent />
      </Box>
    </Principal>
  );
};

export default ContactListPage;
