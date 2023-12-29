  import React, { useState, useEffect, useRef } from 'react';
  import Principal from '../pages/Principal';
  import { getCrmDataByYear } from '../services/service';
  import D3Funnel from 'd3-funnel'; // Import d3-funnel

  const CRMComponent = () => {
    const [crmData, setCrmData] = useState([]);
    const chartContainer = useRef(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getCrmDataByYear(2023,localStorage.getItem('Business'));
          if (response.success) {
            setCrmData(response.data);
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
        drawFunnelChart(processedData);
      }
    }, [crmData]); // Redraw the chart when crmData changes

    const processData = (data) => {
      const flowMap = {};
      data.forEach((entry) => {
        const { lastFlow } = entry;
        if (!flowMap[lastFlow]) {
          flowMap[lastFlow] = 0;
        }
        flowMap[lastFlow]++;
      });
    
      // Convert data to d3-funnel format and sort it by value (descending order)
      const formattedData = Object.entries(flowMap).map(([label, value]) => ({
        label: getFlowText(label), // Transform flow names
        value,
      }));
      formattedData.sort((a, b) => b.value - a.value); // Sort in descending order
    
      return formattedData;
    };
    
    const getFlowText = (flow) => {
      // Update flow names as needed
      const flowNames = {
        scheduleFlow: 'Horarios',
        pricesFlow: 'Compra',
        mainFlow: 'Inicio conversacion',
        BuyFlow: 'Compras o Reservas',
        morningSelectionFlow: 'Seleccionando horarios',
        botSelectionFlow: 'Inicio conversacion',
        directContactFlow: 'Contacto con asesor'
        // Add other flows as needed
      };
    
      return flowNames[flow] || flow; // Return the updated flow name or the original if not found
    };

    const drawFunnelChart = (data) => {
      const options = {
        chart: {
          width: 500, // Adjust width as needed
          height: 600, // Adjust height as needed
        },
        block: {
          dynamicHeight: true,
        },
      };

      // Create a new instance of D3Funnel and draw the chart
      const chart = new D3Funnel(chartContainer.current);
      chart.draw(data, options);
    };

    return (
    
        <div style={{ textAlign: 'center' }}>
          <h1>CRM</h1>
          <div style={{ margin: '0 auto', width: 'fit-content' }} ref={chartContainer}></div>
        </div>
 
    );
  };

  export default CRMComponent;
