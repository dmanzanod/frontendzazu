import { ThemeProvider } from '@emotion/react'
import { Box, Typography} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import theme from '../theme/theme'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//core
import 'primereact/resources/primereact.min.css'
import { useDispatch } from 'react-redux';
import { toPng } from 'html-to-image';
import { addImage, addImageStats } from '../features/indicators/indicatorSlice';
import { Chart } from 'primereact/chart';
const ChartComponent = ({title,data,type}) => {
  const dispatch = useDispatch();
  const [dataFormatted,setDataFormatted]=useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
})
 const [options,setOptions]=useState({})
  const elementRef = useRef();
  console.log(data)
  // const notRepeatedData=()=>{
  //   let resultArray=[]
    
  //     setArgumentField('serviceName')
  //     setValueAxis("timesServiceAppears")
  //     resultArray = Object.values(
  //       data.reduce((accumulator, item) => {
  //         const { serviceName, timesServiceAppears } = item;
  //         accumulator[serviceName] = accumulator[serviceName] || { serviceId: item.serviceId, serviceName, timesServiceAppears: 0 };
  //         accumulator[serviceName].timesServiceAppears += timesServiceAppears;
  //         return accumulator;
  //       }, {})
  //     );
      
    
      
    
  //   setDataFormatted(resultArray)
  // }
 const formatData=()=>{
  let labels=[]
  let dataSets=[]
   data.map((el)=>{
    labels.push(el.categoryName)
    dataSets.push(el.timesServiceAppears)
  })
  return {
    labels:labels,
    datasets:[{
      label:'Número de productos vendidos',
      data:dataSets,
       backgroundColor:'#42a5f5',
       
  
    }]
  }
  
 }
 const optionsChart = {
  scales: {
      y: {
          beginAtZero: true
      }
  }
};

  const captureElementAsImage = async () => {
    try {
      const element = elementRef.current;

      const imgDataUrl = await toPng(element,{pixelRatio:2});
      const imgStats={
        elWidth:element.offsetWidth,
        elHeight:element.offsetHeight,
        img:imgDataUrl
      }
      dispatch(addImageStats(imgStats));
    } catch (error) {
      // Handle error
    }
  };
  useEffect(()=>{
    const format=formatData()
    
    setDataFormatted(format)
    setOptions(optionsChart)
    setTimeout(()=>{captureElementAsImage()},1000)
    
  },[])
  return (    <ThemeProvider theme={theme}>
        <Box className='chart' ref={elementRef} 
        sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            
            width:{xs:'98%',sm:'100%'},
            paddingInline:'12px',
             borderRadius:"20px",
            backgroundColor:"#FFF",
            
             gap:"36px"

        }}
        >
            
            <Typography variant='h4' sx={{alignSelf:'center',fontSize:{xs:'1.6rem',sm:'1.8rem'}}}>Categorías Vendidas</Typography>
            
        {/* <Chart
        // className='pie__overflow'
          data={dataFormatted}
        >
          <ArgumentAxis 
          labelComponent={ArgumentLabel}
          >
          
          </ArgumentAxis>
          <ValueAxis max={200} />
          <BarSeries
            valueField="timesServiceAppears"
            argumentField="categoryName"
          /> 
          
         
          
          <Title
            text={title}
          />
        
          <Animation />
          
        </Chart> */}
     <Chart className='chart__width' type="bar" data={dataFormatted}  options={options}/>
            

        </Box>

    
    </ThemeProvider>
  )
}

export default ChartComponent