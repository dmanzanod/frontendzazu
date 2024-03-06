import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CalendarIcon from '@mui/icons-material/CalendarToday';

const WidgetsBrand = ({ withCharts }) => {
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const renderChart = (data) => {
    if (withCharts) {
      return (
        <Line
          className="position-absolute w-100 h-100"
          style={{ height: '70px' }}
          data={data}
          options={chartOptions}
        />
      );
    }
    return null;
  };

  const renderWidget = (icon, values, color) => {
    return (
      <Grid item xs={12} sm={6} lg={3}>
        <Paper className="mb-4" style={{ '--cui-card-cap-bg': color }}>
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              {values[0].title}
            </Typography>
            {/* Icon Section */}
            <Avatar className="my-4 text-white">
              {icon}
            </Avatar>
            {/* Values Section */}
            {values.map((value, index) => (
              <Typography key={index} variant="h4" color="primary" gutterBottom>
                {value.value}{' '}
                <span className="fs-6 fw-normal">
                  (-12.4% {/* Use appropriate trend percentage here */})
                </span>
              </Typography>
            ))}
            {/* Chart Section */}
            {renderChart({
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  backgroundColor: 'rgba(255,255,255,.1)',
                  borderColor: 'rgba(255,255,255,.55)',
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 2,
                  data: [/* Your chart data here */],
                  fill: true,
                },
              ],
            })}
          </Box>
        </Paper>
      </Grid>
    );
  };

  return (
    <Grid container spacing={3}>
      {/* Facebook Widget */}
      {renderWidget(<FacebookIcon height={52} />, [
        { title: 'friends', value: '89K' },
        { title: 'feeds', value: '459' },
      ], '#3b5998')}

      {/* Twitter Widget */}
      {renderWidget(<TwitterIcon height={52} />, [
        { title: 'followers', value: '973k' },
        { title: 'tweets', value: '1.792' },
      ], '#00aced')}

      {/* LinkedIn Widget */}
      {renderWidget(<LinkedInIcon height={52} />, [
        { title: 'contacts', value: '500' },
        { title: 'feeds', value: '1.292' },
      ], '#4875b4')}

      {/* Calendar Widget */}
      {renderWidget(<CalendarIcon height={52} />, [
        { title: 'events', value: '12+' },
        { title: 'meetings', value: '4' },
      ], 'warning')}
    </Grid>
  );
};

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
};

export default WidgetsBrand;
