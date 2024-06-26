import React, { useEffect, useRef, useState } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis,VictoryTooltip, VictoryZoomContainer, VictoryBrushContainer } from 'victory';
import { ThemeProvider } from '@emotion/react';
import { Box, Typography, Modal, TextField, Button,IconButton, FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import theme from '../../theme/theme';
import { useDispatch } from 'react-redux';
import { toPng } from 'html-to-image';
import { addImageConversations } from '../../features/indicators/indicatorSlice';
import { getCrmDataByYear } from '../../services/service';
import { CalendarToday as CalendarTodayIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { group, scaleOrdinal } from 'd3';

const BarChartHighToLowComponent = ({ title, filterCondition }) => {
    const [sortedData, setSortedData] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [isDateRangeModalOpen, setDateRangeModalOpen] = useState(false);
    const dispatch = useDispatch();
    const elementRef = useRef();
    const [randomColors, setRandomColors] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [slicedDataByCategory, setSlicedDataByCategory] = useState({});
    const [categoryChanged, setCategoryChanged] = useState(false);
    useEffect(() => {
        if (selectedCategory !== "") {
            const newDataByCategory = {};
            categories.forEach(category => {
                
                newDataByCategory[category] = sortedData.slice(startIndex, startIndex + 6);
            });
            setSlicedDataByCategory(newDataByCategory);
        }
    }, [selectedCategory, sortedData, startIndex, categories]);

    useEffect(() => {
        if (selectedCategory !== "") {
            // Reset startIndex to 0 when a new category is selected
            setStartIndex(0);
        }
    }, [selectedCategory]);

    const handleNextClick = () => {
        
        let maxIndex;
        if (selectedCategory === "") {
            maxIndex = Math.min(startIndex + 6, sortedData.length);
        } else {
            const remainingData = sortedData.length - startIndex;
            maxIndex = Math.min(startIndex + 6, startIndex + remainingData);
        }
        setStartIndex(maxIndex);
    };
    
    
    const handlePrevClick = () => {
        setStartIndex(Math.max(startIndex - 6, 0));
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
            // Handle error
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentYear = new Date().getFullYear();
                const response = await getCrmDataByYear(currentYear, localStorage.getItem('Business'));

                if (response.success) {
                    let filteredData = response.data.filter(entry => entry.lastFlow === filterCondition);
                    const uniqueCategories = [...new Set(filteredData.map(entry => entry.lastCategory))];
                    const filteredCategories = uniqueCategories.filter(category => category !== null && category !== undefined);
                    setCategories(filteredCategories);
                    if (selectedCategory) {
                        filteredData = filteredData.filter(entry => entry.lastCategory === selectedCategory);
                    }

                    const groupedData = groupDataByLastProduct(filteredData);
                    const sortedData = sortDataByQuantity(groupedData);
                    setSortedData(sortedData);
                } else {
                    // Handle error in fetching data
                }
            } catch (error) {
                // Handle error in fetching data
            }
        };

        fetchData();
    }, [filterCondition,selectedCategory,categoryChanged]);

    useEffect(() => {
        setTimeout(() => {
            captureElementAsImage();
        }, 1000);
    }, []);

    
    const groupDataByLastProduct = (data) => {
        return data.reduce((groups, entry) => {
            const key = entry.lastProduct;
            groups[key] = (groups[key] || 0) + 1;
            return groups;
        }, {});
    };

    const sortDataByQuantity = (data) => {
        return Object.entries(data)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([lastProduct, quantity]) => ({ lastProduct, quantity }));
    };

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
        console.log(newDate)
        setSelectedStartDate(newDate);
    };

    const handleEndDateChange = (newDate) => {
        setSelectedEndDate(newDate);
    };

    const handleApplyDateRange = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null); 
        setDateRangeModalOpen(false); 
        setCategoryChanged(prev => !prev)
    };
    
    const applyDateSelectionData = async () => {
        try {
            const currentYear = new Date().getFullYear();
            const response = await getCrmDataByYear(currentYear, localStorage.getItem('Business'));
    
            if (response.success) {
                
                setDateRangeModalOpen(false);
                let filteredData = response.data.filter(entry => entry.lastFlow === filterCondition);
                const uniqueCategories = [...new Set(filteredData.map(entry => entry.lastCategory))];
                const filteredCategories = uniqueCategories.filter(category => category !== null && category !== undefined);
                setCategories(filteredCategories);
    
                if (selectedStartDate && selectedEndDate) {
                    const startDate = new Date(selectedStartDate);
                    let endDate = new Date(selectedEndDate);
    
                    // Adjust the end date to be the end of the selected day
                    endDate.setHours(23, 59, 59, 999);
    
                    filteredData = filteredData.filter(entry => {
                        const entryDate = new Date(entry.createdAt);
                        return entryDate >= startDate && entryDate <= endDate;
                    });
                }
    
                if (selectedCategory) {
                    filteredData = filteredData.filter(entry => entry.lastCategory === selectedCategory);
                }
    
                const groupedData = groupDataByLastProduct(filteredData);
                const sortedData = sortDataByQuantity(groupedData);
                setSortedData(sortedData);
            } else {
                // Handle error in fetching data
            }
        } catch (error) {
            // Handle error in fetching data
        }
    }
    
    const getDomainPadding = () => {
        const numDataPoints = Math.max(sortedData.length, 6) + 3;
        if (sortedData.length === 2) {
            return 600;
        }
        return Math.min(600, numDataPoints * 10);
    };
    const generateRandomColors = () => {
        const colors = [];
        for (let i = 0; i < categories.length; i++) {
            colors.push(`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`);
        }
        return colors;
    };
    useEffect(() => {
        setRandomColors(generateRandomColors());
    }, [categories]);
    const colorScale = scaleOrdinal()
        .domain(categories)
        .range(['#FF5733', '#33FF57', '#3366FF', '#FFFF00', '#FF00FF', '#00FFFF']);

        const getCategoryColor = (category) => {
            if (categories.length === 0) {
                return '#000000';
            }
        
            const categoryIndex = categories.indexOf(category);
            if (categoryIndex !== -1) {
                return colorScale(category);
            } else {
                return '#000000';
            }
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
                    height: '700px',
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
                <InputLabel key="category-select-label" id="category-select-label">Categoria</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        value={selectedCategory} 
                        onChange={(event) => setSelectedCategory(event.target.value)}
                    >
                            <MenuItem key="All" value="">Todos</MenuItem>
                                {categories.map((category, index) => (
                            <MenuItem key={index} value={category}>{category}</MenuItem>
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
                            <Button variant="contained" color="primary" onClick={applyDateSelectionData} style={{ marginRight: '30px' }}>
                                Aceptar
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleApplyDateRange}>
                                Reestablecer
                            </Button>
                        </div>
                    </div>
                </Modal>
                <VictoryChart width={getBoxWidth() * 0.8} height={350} domainPadding={{ x: getDomainPadding() }} >
                    <VictoryAxis dependentAxis tickFormat={(tick) => Math.round(tick)} domain={[0, 6]} style={{grid: { stroke: "gray", strokeWidth: 0.5 }}}/>
                    {selectedCategory === "" && (
                        <VictoryAxis
                            tickValues={sortedData.slice(startIndex, startIndex + 6).map(data => data.lastProduct)}
                            tickFormat={(tick) => tick.length > 14 ? tick.replace(/(.{14})/g, "$1-\n") : tick}
                            style={{
                                tickLabels: {
                                  fontSize: 10, 
                                },
                            }}
                        />
                    )}
                    {selectedCategory !== "" && (
                        <VictoryAxis 
                            tickValues={slicedDataByCategory[selectedCategory]?.map(data => data.lastProduct)}
                            tickFormat={(tick) => tick.length > 14 ? tick.replace(/(.{14})/g, "$1-\n") : tick}
                            style={{
                                tickLabels: {
                                  fontSize: 10, 
                                },
                            }}
                        />
                    )}
                    <VictoryBar
                        labels={({ datum }) => `${datum.quantity
                        }`}
                        labelComponent={<VictoryTooltip 
                            cornerRadius={5}
                            pointerLength={0}
                            flyoutStyle={{
                                fill: "white",
                            }}
                            dy={-10} 
                        />}
                        data={selectedCategory === "" ? sortedData.slice(startIndex, startIndex + 6) : slicedDataByCategory[selectedCategory] || []}
                        minBarWidth={20}
                        barWidth={30}
                        style={{
                            data: {
                                fill: ({ index }) => {
                                    if (selectedCategory === "") {
                                        // If no category is selected, use random colors for each bar
                                        return randomColors[index % randomColors.length];
                                    } else {
                                        // If a specific category is selected, use the color corresponding to that category for all bars
                                        return getCategoryColor(selectedCategory);
                                    }
                                }
                            },
                            labels: {
                                fill: 'black',
                                fontSize: 15, 
                                fontWeight: 'bold',
                            }
                    
                        }}
                        x="lastProduct"
                        y="quantity"
                    />
                </VictoryChart>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: '20px',
                    }}
                >
                    {/* Previous button */}
                    <Button onClick={handlePrevClick}>Anterior</Button>

                    {/* Next button */}
                    <Button onClick={handleNextClick}>Siguiente</Button>
                </Box>
            </Box>
            
        </ThemeProvider>
    );
};

export default BarChartHighToLowComponent;
