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
import { logOut } from '../services/service'
import { useNavigate } from 'react-router-dom'
import TotalBookingsComponent from '../components/TotalBookingsComponent'
import TotalSalesComponent from '../components/TotalSalesComponent'
import { getHistoryOrders, getMonthlyOrders, getProductsStats, getTotalOrders, getTotalSalesProducts } from '../services/servicesProducts'
import { getHistoryBookings, getMonthlyBookings, getServicesStats, getTotalBookings, getTotalSales } from '../services/servicesServices'
const DashboardPage = () => {
  const [history,setHistory]=useState([])
  const[stats,setStats]=useState([])
  const [totalSales,setTotalSales]=useState()
  const[totalBookings,setTotalBookings]=useState()
  const[monthlyBookings,setMonthlyBookings]=useState([])
  const navigate=useNavigate()
  const type=localStorage.getItem('type')
  const months=[
    {id:1,name:'Enero'},
    {id:2,name:'Febrero'},
    {id:3,name:'Marzo'},
    {id:4,name:'Abril'},
    {id:5,name:'Mayo'},
    {id:6,name:'Junio'},
    {id:7,name:'Julio'},
    {id:8,name:'Agosto'},
    {id:9,name:'Septiembre'},
    {id:10,name:'Octubre'},
    {id:11,name:'Noviembre'},
    {id:12,name:'Diciembre'}
  ]
  useEffect(()=>{
    const getBusinessHistory= async()=>{
      let resp
      if(type==='services') 
      {resp= await getHistoryBookings(localStorage.getItem('Business'))}
      else{
        resp=await getHistoryOrders(localStorage.getItem('Business'))
      }

      if(!resp.error){
        setHistory(resp)
      }
      else{
        if(resp.status===403){
          navigate('/login')
        }
      }

    }
    const getProductsData= async()=>{
      let resp
      if(type==='services') 
      {resp= await getServicesStats(localStorage.getItem('Business'))}
      else{
        resp= await getProductsStats(localStorage.getItem('Business'))
      }

      if(!resp.error){
        setStats(resp)
      }
      else{
        if(resp.status===403){

          logOut()
          navigate('/login')
        }
      }

    }
    const getSales= async()=>{
      let resp
      if(type==='services')
      {resp= await getTotalSales(localStorage.getItem('Business'))}
      else{
        resp= await getTotalSalesProducts(localStorage.getItem('Business'))
      }

      if(!resp.error){
        setTotalSales(resp)
      }
      else{
        if(resp.status===403){
          logOut()
          navigate('/login')
        }
      }

    }
    const getSalesNumber= async()=>{
      let resp
      if(type==='services') 
      {resp= await getTotalBookings(localStorage.getItem('Business'))}
      else{
        resp= await getTotalOrders(localStorage.getItem('Business'))
      }

      if(!resp.error){
        setTotalBookings(resp)
      }
      else{
        if(resp.status===403){
          logOut()
          navigate('/login')
        }
      }

    }
    const getBookingsMonthly= async()=>{
      let resp
      const now = new Date().getMonth()+1
      if(type==='services')
      {resp= await getMonthlyBookings(localStorage.getItem('Business'))}
      else{
        resp= await getMonthlyOrders(localStorage.getItem('Business'))

      }
      
      if(!resp.error){
        const latestMonths=resp.filter((booking)=>booking.month<=now)
        console.log(latestMonths)
        setMonthlyBookings(latestMonths.map(booking=>({month:months[booking.month-1].name,total:booking.total})))
      }
      else{
        if(resp.status===403){
          logOut()
          navigate('/login')
        }
      }

    }
    getBusinessHistory()
    getProductsData()
    getSales()
    getSalesNumber()
    getBookingsMonthly()
  },[])
    // const data = [
    //     { country: 'Russia', area: 12 },
    //     { country: 'Canada', area: 7 },
    //     { country: 'USA', area: 7 },
    //     { country: 'China', area: 7 },
    //     { country: 'Brazil', area: 6 },
    //     { country: 'Australia', area: 5 },
    //     { country: 'India', area: 2 },
    //     { country: 'Others', area: 55 },
    //   ];
    

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
        
       {stats.length>0&& <ChartComponent title={type==='services'?'Servicios':'Productos'} data={stats} type={'bar'}/>}
        {monthlyBookings.length>0&&<BarChartComponent title={'Total de Ventas'} data={monthlyBookings}/>}
        <HistoryComponent history={history}/>
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          width:'100%',
          gap: '12px'
        }}>
          {totalSales && <TotalSalesComponent total={totalSales}/>}
          {totalBookings && <TotalBookingsComponent total={totalBookings}/>}
        </Box>
      </Box>
    </Principal>
  )
}

export default DashboardPage