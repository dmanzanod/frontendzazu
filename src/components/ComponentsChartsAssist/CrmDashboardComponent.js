import React, { useState, useEffect, useRef, } from 'react';
import D3Funnel from 'd3-funnel';
import { getCrmDataByYear, getTotalCrmDataByDates } from '../../services/service';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button, Modal, TextField, Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CrmDashboardComponent = ({ flowNamesNotPermitted = [] }) => {
  const [crmData, setCrmData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('day');
  const [crmDataByYear, setCrmDataByYear] = useState([]);
  const chartContainer = useRef(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDateRangeModalOpen, setDateRangeModalOpen] = useState(false);
  const [showNoDataModal,setShowNoDataModal] = useState(false);
  const handleOpenDateRangeModal = () => {
    setDateRangeModalOpen(true);
  };

  const handleCloseDateRangeModal = () => {
    setDateRangeModalOpen(false);
  };

  const handleStartDateChange = (newDate) => {
    setSelectedStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setSelectedEndDate(newDate);
  };
  const handleApplyDateRange = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const response = await getTotalCrmDataByDates(currentYear, localStorage.getItem('Business'),selectedStartDate,selectedEndDate);
      console.log("response data \n",response.data)
      if (response.success) {
        if (response.data.length === 0) {
          setShowNoDataModal(true);
          return;
        }
        setCrmData(response.data);
        setCrmDataByYear(response.data);
      } else {
        // Handle error in fetching data
      }
    } catch (error) {
      // Handle error in fetching data
    }
    setDateRangeModalOpen(false);
  };
  
  const handleResetData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const response = await getCrmDataByYear(currentYear, localStorage.getItem('Business'));
      setSelectedStartDate(null);
      setSelectedEndDate(null); 
      setDateRangeModalOpen(false); 
      if (response.success) {
        setCrmData(response.data);
        setCrmDataByYear(response.data);
      } else {
        // Handle error in fetching data
      }
    } catch (error) {
      // Handle error in fetching data
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const response = await getCrmDataByYear(currentYear, localStorage.getItem('Business'));

        if (response.success) {
          setCrmData(response.data);
          setCrmDataByYear(response.data);
        } else {
          // Handle error in fetching data
        }
      } catch (error) {
        // Handle error in fetching data
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartContainer.current && crmData.length > 0) {
      const processedData = processData(crmData);
      drawFunnelChart(chartContainer, processedData, 1);
    }
  }, [crmData]);

  const processData = (data) => {
    console.log(flowNamesNotPermitted)
    const flowPriorities = ['Inicio conversación', 'Categoría', 'Contacto con asesor', 'Programas'];
    const validFlowNamesNotPermitted = Array.isArray(flowNamesNotPermitted) ? flowNamesNotPermitted : [];
    const flowMap = {};
    data.forEach((entry) => {
      const { lastFlow } = entry;
      if (validFlowNamesNotPermitted.includes(lastFlow)) {
        return;
      }
      if (!flowMap[lastFlow]) {
        flowMap[lastFlow] = 0;
      }
      if (lastFlow !== 'directContactFlow') {
        flowMap[lastFlow]++;
      }
    });
  
    // Filter out entries with a value of 0
    const filteredData = Object.entries(flowMap).filter(([_, value]) => value !== 0);
  
    // Prioritize flows based on predefined order
    const prioritizeFlows = (a, b) => {
      const indexA = flowPriorities.indexOf(a.label);
      const indexB = flowPriorities.indexOf(b.label);
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      return b.value - a.value;
    };
  
    const formattedData = filteredData.map(([label, value]) => ({
      label: getFlowText(label),
      value,
    }));
  
    formattedData.sort(prioritizeFlows);
    return formattedData;
  };
  
  const getFlowText = (flow) => {
    const flowNames = {
      scheduleFlow: 'Horarios',
      pricesFlow: 'Compra',
      mainFlow: 'Inicio de conversaciones',
      BuyFlow: 'Agenda de reunión',
      morningSelectionFlow: 'Seleccionando horarios',
      botSelectionFlow: 'Selección de bot',
      directContactFlow: 'Seleccionó contacto HH',
      cursoHorario: 'Cursos y horarios',
      preciosMensualidad: 'Precios de la mensualidad',
      categoryFlow: 'Categoría',
      inscripcionFlow:'Programas',
      completeInscriptionFlow: 'Inscripción completada'
    };

    return flowNames[flow] || flow;
  };

  const handleBlockClick = async (blockLabel) => {
    try {
      const filteredData = filterChartData(crmDataByYear, blockLabel);

      if (filteredData.length === 0) {
        console.error('Data not found for the clicked block:', blockLabel);
        return;
      }

      downloadExcelFile(filteredData, blockLabel);
    } catch (error) {
      console.error('Error handling block click:', error);
      // Handle error (show error message, etc.)
    }
  };

  const filterChartData = (data, blockLabel) => {
    const filteredData = data.filter(entry => getFlowText(entry.lastFlow) === blockLabel);

    const flowMappings = {
      "morningSelectionFlow": "Seleccionando horarios",
      "BuyFlow": "Agenda de reunión",
      "botSelectionFlow": "Selección de bot",
      "mainFlow": "Inicio de conversaciones",
      "preciosMensualidad": "Seleccionó precios",
      "cursoHorario": "Seleccionó horarios",
      "directContactFlow": "Seleccionó contacto HH",
      'categoryFlow': 'Categoría',
      'inscripcionFlow':'Programas',
      'completeInscriptionFlow':'Inscripción completada'
      // Add more mappings as needed
    };

    const updatedData = filteredData.map(entry => ({
      ...entry,
      lastFlow: flowMappings[entry.lastFlow] || entry.lastFlow,
      createdAt: new Date(entry.createdAt).toLocaleString(), // Format date to string
    }));

    const formattedData = updatedData.map(entry => ({
      userId: entry.userId,
      lastProduct: entry.lastProduct,
      lastFlow: entry.lastFlow,
      createdAt: entry.createdAt,
    }));

    return formattedData;
  };

  const downloadExcelFile = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const headers = Object.keys(data[0]);

    headers.forEach((header, index) => {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c: index })];
      if (cell && cell.v === header) {
        cell.v = translateHeader(header);
      }
    });

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

    FileSaver.saveAs(dataBlob, `${fileName}.xlsx`);
  };

  const translateHeader = (header) => {
    const translations = {
      "userId": "Usuario",
      "lastProduct": "Ultimo mensaje",
      "lastFlow": "Flujo actual",
      "createdAt": "Creado en",
    };

    return translations[header] || header;
  };

  const drawFunnelChart = (container, data, number) => {
    if (data && data.length > 0) {
      const commonOptions = {
        chart: {
          width: 550,
          height: 600,
          animate: 500,
          curve: {
            enabled: true,
          },
        },
        block: {
          dynamicHeight: false,
          minHeight: 140,
          fill: {
            type: 'gradient',
          },
          highlight: true,
        },
        label: {
          enabled: true,
          fontSize: 18,
        },
        tooltip: {
          enabled: true,
        },
      };
      const options = {
        ...commonOptions,
        events: {
          click: {
            block: (event, data) => {
              if (number === 1) {
                handleBlockClick(data.label.raw);
              }
            },
          },
        },
      };
      const chart = new D3Funnel(container.current);
      chart.draw(data, options);
    } else {
      container.current.innerHTML = '<p>No se encuentran Embudo de conversión</p>';
    }
  };
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid #313C95',
        padding: '10px',
        background: '#313C95',
        width: '100%',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h4" 
        sx={{
          color: 'white', 
          textAlign: 'center',
        }}
      >
        Embudo de conversión
      </Typography>
    </Box>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
         <Button onClick={handleOpenDateRangeModal}>Filtrar por fecha</Button>
      {/*Modal for error message*/}
      <Modal open={showNoDataModal} onClose={() => setShowNoDataModal(false)}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <p>No existen datos</p>
        </div>
      </Modal>
      {/* Date range modal */}
      <Modal open={isDateRangeModalOpen} onClose={handleCloseDateRangeModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              renderInput={(props) => <TextField {...props} variant="standard" margin="normal" />}
            />
            <span style={{ margin: '20px', display: 'inline-block', lineHeight: '1.5' }}> - </span>
            <DatePicker
              label="End Date"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              renderInput={(props) => <TextField {...props} variant="standard" margin="normal" />}
            />
          </LocalizationProvider>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleApplyDateRange} style={{ marginRight: '30px' }}>
              Aplicar
            </Button>
            <Button variant="contained" color="primary" onClick={handleResetData}>
              Reestablecer
            </Button>
          </div>
        </div>
      </Modal>
        <div style={{ width: '100%', maxWidth: '100%', margin: '30px', paddingTop: '20px' }} ref={chartContainer}></div>
      </div>
    </div>
  );
};

export default CrmDashboardComponent;
