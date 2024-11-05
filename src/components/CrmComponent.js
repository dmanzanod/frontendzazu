// CRMComponent.js
import React, { useState, useEffect, useRef } from 'react';
import D3Funnel from 'd3-funnel';
import { getCrmDataByYear } from '../services/service';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

//CrmData started working since 2023
const CRMComponent = () => {
  const [crmData, setCrmData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('day');
  const [crmDataByYear, setCrmDataByYear] = useState([]);
  const chartContainer = useRef(null);
  const dailyChartContainer = useRef(null);

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
      drawFunnelChart(chartContainer, processedData,1);
      let filteredData = [];
      const currentDate = new Date().toISOString().split('T')[0];

      switch (selectedFilter) {
        case 'day':
          filteredData = crmData.filter(entry => entry.createdAt.includes(currentDate));
          break;
        case 'week':
          filteredData = filterDataForCurrentWeek(crmData, currentDate);
          break;
        case 'month':
          filteredData = filterDataForCurrentMonth(crmData, currentDate);
          break;
        default:
          filteredData = crmData;
      }
      const processedFilteredData = processData(filteredData);
      drawFunnelChart(dailyChartContainer, processedFilteredData,2);
    }
  }, [crmData, selectedFilter]);

  const processData = (data) => {
    const flowMap = {};
    data.forEach((entry) => {
      const { lastFlow } = entry;
      if (!flowMap[lastFlow]) {
        flowMap[lastFlow] = 0;
      }
      flowMap[lastFlow]++;
    });
  
    const formattedData = Object.entries(flowMap).map(([label, value]) => ({
      label: getFlowText(label),
      value,
    }));
  
    // Sort the data to ensure "Inicio conversación" is at the top and "Inscripciones" at the bottom
    formattedData.sort((a, b) => {
      if (a.label === 'Inicio conversación') return -1;
      if (b.label === 'Inicio conversación') return 1;
      if (a.label === 'Inscripción completa') return 1;
      if (b.label === 'Inscripción completa') return -1;
      return b.value - a.value;
    });
  
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
      categoryFlow: 'Categorías',
      inscripcionFlow:'Programas',
      completeInscriptionFlow:'Inscripción completa',
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

const handleDailyChartBlockClick = async (blockLabel) => {
    try {
        const filteredData = filterChartData(crmDataByYear, blockLabel, true);

        if (filteredData.length === 0) {
            console.error('Data not found for the clicked block and filter:', blockLabel, selectedFilter);
            return;
        }

        downloadExcelFile(filteredData, `${blockLabel}_${selectedFilter}`);
    } catch (error) {
        console.error('Error handling block click:', error);
        // Handle error (show error message, etc.)
    }
};

const filterChartData = (data, blockLabel, applyFilter = false) => {
    let filteredData = data;

    if (applyFilter) {
        const currentDate = new Date().toISOString().split('T')[0];

        switch (selectedFilter) {
            case 'day':
                filteredData = data.filter(entry => getFlowText(entry.lastFlow) === blockLabel && entry.createdAt.includes(currentDate));
                break;
            case 'week':
                filteredData = filterDataHandleBlockWeek(data, blockLabel, currentDate);
                break;
            case 'month':
                filteredData = filterDataHandleBlockMonth(data, blockLabel, currentDate);
                break;
            default:
                filteredData = data.filter(entry => getFlowText(entry.lastFlow) === blockLabel);
        }
    } else {
        filteredData = data.filter(entry => getFlowText(entry.lastFlow) === blockLabel);
    }

    // Map flows and format date
    const flowMappings = {
        "morningSelectionFlow": "Seleccionando horarios",
        "BuyFlow": "Agenda de reunión",
        "botSelectionFlow": "Selección de bot",
        "mainFlow": "IInicio de conversaciones",
        "preciosMensualidad": "Seleccionó precios",
        "cursoHorario": "Seleccionó horarios",
        "directContactFlow": "Seleccionó contacto HH",
        'categoryFlow': 'Categorías',
        'inscripcionFlow':'Programas',
        'completeInscriptionFlow':'Inscripción completa',
        // Add more mappings as needed
    };

    const updatedData = filteredData.map(entry => {
        const flowMappingExists = entry.lastFlow in flowMappings;
        return {
            ...entry,
            lastFlow: flowMappingExists ? flowMappings[entry.lastFlow] : entry.lastFlow,
            createdAt: new Date(entry.createdAt).toLocaleString(), // Format date to string
        };
    });

    // Extract only the desired properties
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
    // Translate headers if needed
    const translations = {
        "userId": "Usuario",
        "lastProduct": "Ultimo mensaje",
        "lastFlow": "Flujo actual",
        "createdAt": "Creado en",
        "lastCateogry": 'Categoría',
    };

    return translations[header] || header;
};


const filterDataHandleBlockWeek = (data, blockLabel, currentDate) => {
  const currentWeekStart = getStartOfWeek(new Date(currentDate));
  const currentWeekEnd = getEndOfWeek(new Date(currentDate));

  return data.filter(entry => {
    const entryDate = new Date(entry.createdAt).getTime();
    const isSameBlock = getFlowText(entry.lastFlow) === blockLabel;
    const isWithinCurrentWeek = entryDate >= currentWeekStart && entryDate <= currentWeekEnd;
    return isSameBlock && isWithinCurrentWeek;
  });
};

const filterDataHandleBlockMonth = (data, blockLabel, currentDate) => {
  const currentMonthStart = getStartOfMonth(new Date(currentDate));
  const currentMonthEnd = getEndOfMonth(new Date(currentDate));

  return data.filter(entry => {
    const entryDate = new Date(entry.createdAt).getTime();
    const isSameBlock = getFlowText(entry.lastFlow) === blockLabel;
    const isWithinCurrentMonth = entryDate >= currentMonthStart && entryDate <= currentMonthEnd;
    return isSameBlock && isWithinCurrentMonth;
  });
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
              } else {
                // Use a different function when number is not equal to 1
                // For example, call a different function like handleBlockClick2
                handleDailyChartBlockClick(data.label.raw);
              }
            },
          },
        },
      };
      const chart = new D3Funnel(container.current);
      chart.draw(data, options);
    } else {
      container.current.innerHTML = '<p>No se encuentran datos del embudo de conversión</p>';
    }
  };

  const filterDataForCurrentWeek = (data, currentDate) => {
    const currentWeekStart = getStartOfWeek(new Date(currentDate));
    const currentWeekEnd = getEndOfWeek(new Date(currentDate));

    return data.filter(entry => {
      const entryDate = new Date(entry.createdAt).getTime();
      return entryDate >= currentWeekStart && entryDate <= currentWeekEnd;
    });
  };

  const filterDataForCurrentMonth = (data, currentDate) => {
    const currentMonthStart = getStartOfMonth(new Date(currentDate));
    const currentMonthEnd = getEndOfMonth(new Date(currentDate));

    return data.filter(entry => {
      const entryDate = new Date(entry.createdAt).getTime();
      return entryDate >= currentMonthStart && entryDate <= currentMonthEnd;
    });
  };

  const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek.getTime();
  };

  const getEndOfWeek = (date) => {
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek.getTime();
  };

  const getStartOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  };

  const getEndOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999).getTime();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '60px', width: '100%', paddingTop:'80px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap:'wrap'}}>
        {/* Row 1 */}
        <div style={{ width: '100%', maxWidth: '550px', margin: '30px', paddingTop:'20px' }} ref={chartContainer}></div>
  
        {/* Row 2 */}
        <div style={{ flexDirection: 'column', alignItems: 'center', margin: '30px' }}>
          {/* Filter column */}
          <div style={{ minWidth: 'fit-content', marginBottom: '10px', marginRight: '20px' }}>
            <label>
              Filtro:
              <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
                <option value="day">Dia</option>
                <option value="week">Semana</option>
                <option value="month">Mes</option>
              </select>
            </label>
          </div>
  
          {/* Chart column */}
          <div style={{ width: '100%', maxWidth: '550px', marginTop: '10px' }} ref={dailyChartContainer}></div>
        </div>
      </div>
    </div>
  );  
  };  

export default CRMComponent;
