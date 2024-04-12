import React, { useState, useEffect, useRef } from 'react';
import D3Funnel from 'd3-funnel';
import { getCrmDataByYear } from '../../services/service';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const CrmDashboardComponent = () => {
  const [crmData, setCrmData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('day');
  const [crmDataByYear, setCrmDataByYear] = useState([]);
  const chartContainer = useRef(null);

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
    const flowPriorities = ['Inicio conversación', 'Categoría', 'Contacto con asesor', 'Inscripciones'];
  
    const flowMap = {};
    data.forEach((entry) => {
      const { lastFlow } = entry;
      if (!flowMap[lastFlow]) {
        flowMap[lastFlow] = 0;
      }
      if (lastFlow !== 'directContactFlow') {
        flowMap[lastFlow]++;
    }
    });
  
    // Prioritize flows based on predefined order
    const prioritizeFlows = (a, b) => {
      const indexA = flowPriorities.indexOf(a.label);
      const indexB = flowPriorities.indexOf(b.label);
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      return b.value - a.value;
    };
  
    const formattedData = Object.entries(flowMap).map(([label, value]) => ({
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
      mainFlow: 'Inicio conversación',
      BuyFlow: 'Compras o Reservas',
      morningSelectionFlow: 'Seleccionando horarios',
      botSelectionFlow: 'Inicio conversación',
      directContactFlow: 'Contacto con asesor',
      cursoHorario: 'Cursos y horarios',
      preciosMensualidad: 'Precios de la mensualidad',
      categoryFlow: 'Categoría',
      inscripcionFlow:'Inscripciones',
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
      "BuyFlow": "Compras o Reservas",
      "botSelectionFlow": "Inicio conversación",
      "mainFlow": "Inicio conversación",
      "preciosMensualidad": "Seleccionó precios",
      "cursoHorario": "Seleccionó horarios",
      "directContactFlow": "Seleccionó contacto directo",
      'categoryFlow': 'Categoría',
      'inscripcionFlow':'Inscripciones',
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
      // Add more translations as needed
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
      container.current.innerHTML = '<p>No se encuentran datos del CRM</p>';
    }
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
    <div style={{ textAlign: 'center', marginTop: '60px', width: '100%' }}>
      <h1 style={{ alignSelf: 'center', flex: '1' }}>CRM</h1>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: '100%', maxWidth: '100%', margin: '30px', paddingTop: '20px' }} ref={chartContainer}></div>
      </div>
    </div>
  );
};

export default CrmDashboardComponent;
