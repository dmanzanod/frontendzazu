import React from 'react';
import {
  Grid,
  Button,
  Typography,
  Box,
  Avatar,
  Paper,
  Menu,
  MenuItem,
} from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import ArrowBottomIcon from '@mui/icons-material/ArrowDropDown';
import OptionsIcon from '@mui/icons-material/MoreVert';

const WidgetsDropdown = () => {
  // Your existing code...

  return (
    <Grid container spacing={3}>
      {/* Widget 1 */}
      <Grid item xs={12} sm={6} lg={3}>
        <Paper className="mb-4">
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Users
            </Typography>
            {/* Value Section */}
            <Typography variant="h4" color="primary" gutterBottom>
              26K{' '}
              <span className="fs-6 fw-normal">
                (-12.4% <ArrowBottomIcon color="error" />)
              </span>
            </Typography>
            {/* Chart Section */}
            <Line
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: 'primary',
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
             
            />
            {/* Action Section */}
            <Box mt={3}>
              <Button
                color="primary"
                endIcon={<OptionsIcon />}
                aria-controls="widget1-menu"
                aria-haspopup="true"
                variant="text"
              >
                Options
              </Button>
              <Menu id="widget1-menu" anchorEl={null} open={false} onClose={() => {}}>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another action</MenuItem>
                <MenuItem>Something else here...</MenuItem>
                <MenuItem disabled>Disabled action</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Repeat the above structure for other widgets */}
      {/* Widget 2, 3, and 4... */}
    </Grid>
  );
};

export default WidgetsDropdown;
