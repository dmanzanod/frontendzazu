import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toPng } from 'html-to-image';
import { useDispatch } from 'react-redux';
import { addImageConversations } from '../../features/indicators/indicatorSlice';
import { Chart } from 'primereact/chart';
import { getCrmByFlow } from '../../services/service';
import { getCrmByMonth } from '../../services/service';
import { logOut } from '../../services/service';
import { useNavigate } from 'react-router-dom';

const LineChartMonthlyComponent = ({ title }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth(); 
  const [chartData, setChartData] = useState({});
  const [monthlyInteractions, setMonthlyInteractions] = useState([]);
  const [uniqueFlows,setUniqueFlows]=useState();
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex + 1); // Initial selected month is 1 (January)
  const navigate = useNavigate();
  const [selectedFlow, setSelectedFlow] = useState('');
  const flowLabels = {
    cbaStudentOrNotConfirmationFlow: 'Consulta estudiantes(o no)',
    BuyFlow: 'Compras',
    pricesFlow: 'Precios',
    productsFlow: 'Productos',
    mainFlow: 'Inicio conversación',
    whatToDoFlow: 'Menu',
    botSelectionFlow: 'Bot selección',
    categoryFlow: "Categorias",
    directContactFlow:"Contacto con asesor",
    inscripcionFlow:'Inscripción',
    completeInscriptionFlow: 'Inscripción completada'
    // Add more mappings as needed
  };
  const updateChartDataOutside = (datasets) => {
    // Check if datasets is empty
    if (datasets && datasets.length > 0) {
      const chartData = {
        labels: monthlyInteractions.map(entry => entry.day),
        datasets: datasets,
      };
    
      setChartData(chartData);
    } else {
      // Handle empty datasets here
      console.log('Datasets is empty');
      // Optionally, you can set default chart data or do nothing
    }
  };
    
  const [optionsChart, setOptionsChart] = useState({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: () => '',

        },
      },
      legend: {
        labels: {
          generateLabels: function(chart) {
            if (chart && chart.data && chart.data.datasets) {
              return chart.data.datasets.map((dataset, i) => ({
                text: dataset.legendLabel,
                fillStyle: dataset.borderColor,
              }));
            } else {
              return [];
            }
          }
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const chart = legend.chart;
          const meta = chart.getDatasetMeta(index);
      
          // Check if meta is defined and has the hidden property
          if (meta && typeof meta.hidden !== 'undefined') {
            // Toggle visibility of the dataset
            meta.hidden = !meta.hidden;
            chart.update();
          }
        }
      }
      
    },
    maintainAspectRatio: false,
  });
  
  const dispatch = useDispatch();
  const elementRef = useRef();

  useEffect(() => {
    const formattedData = () => {
      const labels = monthlyInteractions.map(entry => entry.day);
      const totals = monthlyInteractions.map(entry => entry.total);
      console.log("Esto es montlhy interactions \n",monthlyInteractions)
      return {
        labels: labels,
        datasets: [
          {
            label: '',
            borderColor: '#42a5f5',
            data: totals,
            tension: 0.4,
            legendLabel:'Inicio conversación'
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
        const resp = await getCrmByMonth(localStorage.getItem('Business'),currentYear, selectedMonth,"mainFlow");
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
    console.log('Monthly interactions:', monthlyInteractions);
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
            label: ' ',
            borderColor: '#42a5f5',
            data: totals,
            tension: 0.4,
            legendLabel:'Inicio conversación'
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

  useEffect(() => {
    const getFlows = async () => {
      try {
        const flows = await getCrmByFlow(localStorage.getItem('Business'), 'lastFlow');
        console.log('Flows:', flows);
        setUniqueFlows(flows);
      } catch (error) {
        console.error('Error fetching flows:', error);
      }
    };
  
    // Call getFlows when the component mounts
    getFlows();
  
    // Other useEffect dependencies and cleanup functions...
  }, []); // Empty dependency array ensures this effect runs only once
  
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleFlowChange = async (event) => {
    setSelectedFlow(event.target.value);
    
    try {
      const mainFlowResp = await getCrmByMonth(localStorage.getItem('Business'), currentYear, selectedMonth, "mainFlow");
      const selectedFlowResp = await getCrmByMonth(localStorage.getItem('Business'), currentYear, selectedMonth, event.target.value);
  
      if (mainFlowResp.success === true && selectedFlowResp.success === true) {
        const mainFlowData = mainFlowResp.data;
        const selectedFlowData = selectedFlowResp.data;
  
        // Update chart with main flow and selected flow datasets
        updateChartDataOutside([
          {
            label: ' ',
            borderColor: '#42a5f5',
            data: mainFlowData.map(entry => entry.total),
            tension: 0.4,
            legendLabel:'Inicio conversación'
          },
          {
            label: ` `,
            borderColor: '#ff9800',
            data: selectedFlowData.map(entry => entry.total),
            tension: 0.4,
            legendLabel:`${flowLabels[event.target.value] || event.target.value}`,
          }
        ]);
      } else {
        if (mainFlowResp.status === 403 || selectedFlowResp.status === 403) {
          logOut();
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error fetching interactions for flow:', error);
    }
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
        height: '100%',
      }}
      className="chart"
      ref={elementRef}
    >
      <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', sm: '1.8rem' } }}>
        {title}
      </Typography>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '20px',
      }}
    >
      <FormControl 
        style={{ width: '48%' }}
        variant="filled"
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
      <FormControl 
        style={{ width: '48%' }}
        variant="filled"
      >
        <InputLabel id="flow-select-label">Flujo</InputLabel>
        <Select
          labelId="flow-select-label"
          id="flow-select"
          value={selectedFlow}
          onChange={handleFlowChange}
        >
          <MenuItem value="">Ninguno</MenuItem>
          {uniqueFlows && uniqueFlows.data && Array.isArray(uniqueFlows.data) && uniqueFlows.data.map((flow, index) => (
            <MenuItem key={index} value={flow}>{flowLabels[flow] || flow}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

      <div style={{ marginTop: '20px', width: '100%', height: '100%' }}>
        <Chart type="line" className="chart__width" data={chartData} options={optionsChart} style={{ width: '100%', height: '100%' }} />
      </div>
    </Box>
  );
}  
export default LineChartMonthlyComponent;
