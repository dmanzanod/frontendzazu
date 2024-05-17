import React, { useEffect, useRef, useState } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip } from 'victory';
import { ThemeProvider } from '@emotion/react';
import { Box, Typography, Modal, Button, IconButton, TextField,Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import theme from '../../theme/theme';
import { useDispatch } from 'react-redux';
import { toPng } from 'html-to-image';
import { addImageConversations } from '../../features/indicators/indicatorSlice';
import { getCrmDataByYear } from '../../services/service';
import { CalendarToday as CalendarTodayIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { scaleOrdinal } from 'd3';

const DualBarChartComponent = ({ title }) => {
    const [mainFlowData, setMainFlowData] = useState([]);
    const [consultaData, setConsultaData] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [lastProducts, setLastProducts] = useState([]);
    const [selectedLastProduct, setSelectedLastProduct] = useState("");
    const [isDateRangeModalOpen, setDateRangeModalOpen] = useState(false);
    const [dateChanged, setDateChanged] = useState(false);
    const dispatch = useDispatch();
    const elementRef = useRef();
    const colorScale = scaleOrdinal()
        .range(['#FF5733', '#33FF57']); // Example colors for the color scale

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
            // Handle error
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentYear = new Date().getFullYear();
                const response = await getCrmDataByYear(currentYear, localStorage.getItem('Business'));
    
                if (response.success) {
                    // Filter data based on the selected date range and flow
                    let filteredMainFlow = response.data.filter(entry => entry.lastFlow === 'mainFlow');
                    let filteredConsulta = response.data.filter(entry => entry.lastFlow === 'directContactFlow');
    
                    // Extract unique last products for consulta data
                    const uniqueLastProductsConsulta = [...new Set(filteredConsulta.map(entry => entry.lastProduct))]
                        .filter(product => product !== null && product !== undefined && product !== "");
                    setLastProducts(uniqueLastProductsConsulta);
                    // Filter consulta data based on selected last product
                    if (selectedLastProduct !== "") {
                        filteredConsulta = filteredConsulta.filter(entry => entry.lastProduct === selectedLastProduct);
                    }
    
                    // Count occurrences for mainFlow and consulta
                    const mainFlowCount = filteredMainFlow.length;
                    const consultaCount = filteredConsulta.length;
    
                    setMainFlowData(mainFlowCount);
                    setConsultaData(consultaCount);
                } else {
                    // Handle error in fetching data
                }
            } catch (error) {
                // Handle error in fetching data
            }
        };
    
        fetchData();
    }, [selectedLastProduct, dateChanged]); // Add selectedLastProduct as a dependency
    
    const applyDateRangeFilter = async () => {
        try {
            const currentYear = new Date().getFullYear();
            const response = await getCrmDataByYear(currentYear, localStorage.getItem('Business'));
    
            if (response.success) {
                // Filter data based on the selected date range and flow
                let filteredMainFlow = response.data.filter(entry => entry.lastFlow === 'mainFlow');
                let filteredConsulta = response.data.filter(entry => entry.lastFlow === 'directContactFlow');
    
                // Extract unique last products for consulta data
                const uniqueLastProductsConsulta = [...new Set(filteredConsulta.map(entry => entry.lastProduct))]
                    .filter(product => product !== null && product !== undefined && product !== "");
                setLastProducts(uniqueLastProductsConsulta);
    
                // Filter data based on the selected date range
                if (selectedStartDate && selectedEndDate) {
                    const startDate = new Date(selectedStartDate);
                    const endDate = new Date(selectedEndDate);
                    filteredMainFlow = filteredMainFlow.filter(entry => {
                        const entryDate = new Date(entry.createdAt);
                        const startDateWithoutTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                        const endDateWithoutTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                        return entryDate >= startDateWithoutTime && entryDate <= endDateWithoutTime;
                    });
                    filteredConsulta = filteredConsulta.filter(entry => {
                        const entryDate = new Date(entry.createdAt);
                        const startDateWithoutTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                        const endDateWithoutTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                        return entryDate >= startDateWithoutTime && entryDate <= endDateWithoutTime;
                    });
                }
    
                // Filter consulta data based on selected last product
                if (selectedLastProduct !== "") {
                    filteredConsulta = filteredConsulta.filter(entry => entry.lastProduct === selectedLastProduct);
                }
    
                // Count occurrences for mainFlow and consulta
                const mainFlowCount = filteredMainFlow.length;
                const consultaCount = filteredConsulta.length;
                
                setDateRangeModalOpen(false);
                setMainFlowData(mainFlowCount);
                setConsultaData(consultaCount);
            } else {
                // Handle error in fetching data
            }
        } catch (error) {
            // Handle error in fetching data
        }
    };
    
    useEffect(() => {
        setTimeout(() => {
            captureElementAsImage();
        }, 1000);
    }, []);

    const getBoxWidth = () => {
        if (elementRef.current) {
            return elementRef.current.offsetWidth;
        }
        return 0;
    };

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

    const handleApplyDateRange = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setDateRangeModalOpen(false);
        setDateChanged(prev => !prev)
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingInline: '12px',
                    borderRadius: '20px',
                    backgroundColor: '#FFF',
                    gap: '15px',
                    height: '500px',
                    width: '100%',
                }}
                className="chart"
                ref={elementRef}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem' }, marginTop: '5px', textAlign: 'center', flex: 1 }}>
                        {title}
                    </Typography>
                    <IconButton onClick={handleOpenDateRangeModal}>
                        <CalendarTodayIcon />
                    </IconButton>
                </Box>
                <FormControl style={{ marginTop: '20px', width: '100%' }} variant="filled">
                <InputLabel key="category-select-label" id="category-select-label">Consultas</InputLabel>
                <Select
                    value={selectedLastProduct}
                    onChange={(event) => setSelectedLastProduct(event.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    {lastProducts.map((product, index) => (
                        <MenuItem key={index} value={product}>{product}</MenuItem>
                    ))}
                </Select>
                </FormControl>
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
                        <Button variant="contained" color="primary" onClick={applyDateRangeFilter} style={{marginRight: '10px'}}>
                                Aplicar
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleApplyDateRange}>
                                Reestablecer
                            </Button>
                        </div>
                    </div>
                </Modal>
                <VictoryChart width={getBoxWidth() * 0.8} height={250} domainPadding={{ x: 90 }}>
                    <VictoryAxis dependentAxis tickFormat={(tick) => Math.round(tick)} domain={[0, 5]} style={{grid: { stroke: "gray", strokeWidth: 0.5 }}}/>
                    <VictoryAxis tickFormat={["Inicio de conversación", "Consultas"]} />
                    <VictoryBar
                        labels={({ datum }) => `${datum.y
                        }`}
                        labelComponent={<VictoryTooltip 
                            cornerRadius={5}
                            pointerLength={0}
                            flyoutStyle={{
                                fill: "white",
                            }}
                            dy={-10} 
                        />}
                        data={[{ x: "Inicio de conversación", y: mainFlowData }]}
                        barWidth={50}
                        alignment="middle"
                        style={{
                            data: {
                                fill: colorScale('#FF5733') // Example color for mainFlow
                            }
                        }}
                    />
                    <VictoryBar
                        labels={({ datum }) => `${datum.y
                        }`}
                        labelComponent={<VictoryTooltip 
                            cornerRadius={5}
                            pointerLength={0}
                            flyoutStyle={{
                                fill: "white",
                            }}
                            dy={-10} 
                        />}
                        data={[{ x: "Consultas", y: consultaData }]}
                        barWidth={50}
                        alignment="middle"
                        style={{
                            data: {
                                fill: colorScale('#33FF57') // Example color for Consulta
                            }
                        }}
                    />
                </VictoryChart>
            </Box>
        </ThemeProvider>
    );
};

export default DualBarChartComponent;
