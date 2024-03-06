import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getUsersData } from '../services/userService'; // Assuming you have a service to fetch user data
import Principal from './Principal';

const UserListComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsersData(); // Update this with your actual service call
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Principal>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 1, md: 3 },
          display: 'grid',
          backgroundColor: '#F4F3FA',
          gridRowGap: '32px',
          gridTemplateRows: { xs: 'repeat(4,1fr)', sm: 'repeat(2,1fr)' },
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gridColumnGap: '24px',
          mt: '72px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: '100%' },
            gap: '12px',
            mb: 2,
            backgroundColor: '#fff',
            borderRadius: '15px',
          }}
        >
          <Typography variant="h4" sx={{ mt: 2, mb: 3 }}>
            User List
          </Typography>
          {users.map((user) => (
            <Box key={user.id} sx={{ border: '1px solid #ddd', borderRadius: '8px', p: 2 }}>
              <Typography variant="h6">{user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              {/* Add more user details as needed */}
            </Box>
          ))}
          {users.length === 0 && <Typography>No users found.</Typography>}
        </Box>
      </Box>
    </Principal>
  );
};

export default UserListComponent;
