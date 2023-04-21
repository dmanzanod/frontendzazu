import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import MenuComponent from '../components/MenuComponent'
import theme from '../theme/theme'
import ChartComponent from '../components/ChartComponent'
import BarChartComponent from '../components/BarChartComponent'
import HistoryComponent from '../components/HistoryComponent'
import Principal from './Principal'
import { getHistory } from '../services/service'
const DashboardPage = () => {
  const [history,setHistory]=useState([])
  useEffect(()=>{
    const getBusinessHistory= async()=>{
      const resp= await getHistory('643d4b1b9e19c3e7b5862152')
      if(!resp.error){
        setHistory(resp)
      }

    }
    getBusinessHistory()

  },[])
    const data = [
        { country: 'Russia', area: 12 },
        { country: 'Canada', area: 7 },
        { country: 'USA', area: 7 },
        { country: 'China', area: 7 },
        { country: 'Brazil', area: 6 },
        { country: 'Australia', area: 5 },
        { country: 'India', area: 2 },
        { country: 'Others', area: 55 },
      ];
      const dataBar=[
        { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
      ]
  return (
    <Principal>
        <Box component="main" sx={{ flexGrow: 1, p: 3, display:"grid", backgroundColor:"#F4F3FA", mt:'72px',gridRowGap:"32px", gridTemplateRows:{xs:"repeat(4,1fr)",sm:"repeat(2,1fr)"}, gridTemplateColumns:{xs:"1fr",sm:"1fr 1fr"},gridColumnGap:"24px"}}>
        
        <ChartComponent title={'Chart Pie'} data={data} type={'bar'}/>
        <BarChartComponent title={'Bar Chart'} data={dataBar}/>
        <HistoryComponent history={history}/>
        
      </Box>
    </Principal>
  )
}

export default DashboardPage