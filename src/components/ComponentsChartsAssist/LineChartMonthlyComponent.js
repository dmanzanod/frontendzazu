import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toPng } from 'html-to-image';
import { useDispatch } from 'react-redux';
import { addImageConversations } from '../../features/indicators/indicatorSlice';
import { Chart } from 'primereact/chart';
import { getInteractionsByMonth } from '../../services/servicesInteractions';
import { logOut } from '../../services/service';
import { useNavigate } from 'react-router-dom';

const LineChartMonthlyComponent = ({ title }) => {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); 
  const [chartData, setChartData] = useState({});
  const [monthlyInteractions, setMonthlyInteractions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex + 1); // Initial selected month is 1 (January)
  const navigate = useNavigate();
  const [optionsChart, setOptionsChart] = useState({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  });
  const dispatch = useDispatch();
  const elementRef = useRef();

  useEffect(() => {
    const formattedData = () => {
      // Format data based on interactions for the selected month
      const labels = monthlyInteractions.map(entry => entry.day); // Get days as labels
      const totals = monthlyInteractions.map(entry => entry.total); // Get total interactions per day
      return {
        labels: labels,
        datasets: [
          {
            label: 'Número de conversaciones',
            borderColor: '#42a5f5',
            data: totals,
            tension: 0.4,
          },
        ],
      };
    };

    const captureElementAsImage = async () => {
      try {
        const element = elementRef.current;
        const imgDataUrl = await toPng(element, { pixelRatio: 2 });
        const imgStats = {
          elWidth: element.offsetWidth,
          elHeight: element.offsetHeight,
          img: imgDataUrl,
        };
        dispatch(addImageConversations(imgStats));
      } catch (error) {
        console.error('Error capturing element as image:', error);
      }
    };

    const fetchData = async () => {
      try {
        const resp = await getInteractionsByMonth(localStorage.getItem('Business'), selectedMonth);
        if (resp.success === true) {
          setMonthlyInteractions(resp.data);
          updateChartData(resp.data);
        } else {
          if (resp.status === 403) {
            logOut();
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error fetching interactions:', error);
      }
    };

    const updateChart = () => {
      setChartData(formattedData());
    };
    const updateChartData = (data) => {
      const labels = data.map(entry => entry.day); // Get days as labels
      const totals = data.map(entry => entry.total); // Get total interactions per day
    
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Número de conversaciones',
            borderColor: '#42a5f5',
            data: totals,
            tension: 0.4,
          },
        ],
      };
    
      setChartData(chartData);
    };


    // Initial setup
    fetchData();
    captureElementAsImage();

    return () => {
      window.removeEventListener('resize', updateChart);
    };
  }, [selectedMonth, dispatch]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '20px 12px', // Adjusted padding to include the gap
        borderRadius: '20px',
        backgroundColor: '#FFF',
        height: '500px',
      }}
      className="chart"
      ref={elementRef}
    >
      <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', sm: '1.8rem' } }}>
        {title}
      </Typography>
      <FormControl 
        style={{ marginTop: '20px', width: '100%' }}
      >
        <InputLabel id="month-select-label">Mes</InputLabel>
        <Select
          labelId="month-select-label"
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <MenuItem value={1}>Enero</MenuItem>
          <MenuItem value={2}>Febrero</MenuItem>
          <MenuItem value={3}>Marzo</MenuItem>
          <MenuItem value={4}>Abril</MenuItem>
          <MenuItem value={5}>Mayo</MenuItem>
          <MenuItem value={6}>Junio</MenuItem>
          <MenuItem value={7}>Julio</MenuItem>
          <MenuItem value={8}>Agosto</MenuItem>
          <MenuItem value={9}>Septiembre</MenuItem>
          <MenuItem value={10}>Octubre</MenuItem>
          <MenuItem value={11}>Noviembre</MenuItem>
          <MenuItem value={12}>Diciembre</MenuItem>
        </Select>
      </FormControl>
      <div style={{ marginTop: '20px', width: '100%', height: '100%' }}>
        <Chart type="line" className="chart__width" data={chartData} options={optionsChart} style={{ width: '100%', height: '100%' }} />
      </div>
    </Box>
  );
}  
export default LineChartMonthlyComponent;
