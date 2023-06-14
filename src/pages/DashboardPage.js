import {  Box } from '@mui/material'

import React, { useEffect, useState } from 'react'

import ChartComponent from '../components/ChartComponent'
import BarChartComponent from '../components/BarChartComponent'
import HistoryComponent from '../components/HistoryComponent'
import Principal from './Principal'
import { logOut } from '../services/service'
import { useNavigate } from 'react-router-dom'
import TotalBookingsComponent from '../components/TotalBookingsComponent'
import TotalSalesComponent from '../components/TotalSalesComponent'
import {  getMonthlyOrders, getProductsStats, getTotalOrders, getTotalSalesProducts } from '../services/servicesProducts'
import {  getMonthlyBookings, getServicesStats, getTotalBookings, getTotalSales } from '../services/servicesServices'
import { getConversationFlows, getConversationHistory, getInteractions, getInteractionsByWeek } from '../services/servicesInteractions'
import InteractionBookingComponent from '../components/InteractionBookingBarsComponent'
import LineChartComponent from '../components/LineChartComponent'
import EmptyComponent from '../components/EmptyComponent'
const DashboardPage = () => {
  const [history,setHistory]=useState([])
  const[stats,setStats]=useState([])
  const [totalSales,setTotalSales]=useState()
  const[totalBookings,setTotalBookings]=useState()
  const[weeklyInteractions,setWeeklyInteractions]=useState([])
  const[totalInteractions,setTotalInteractions]=useState()
  const[conversationFlows,setConversationFlows]=useState([])
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
      const resp= await getConversationHistory(localStorage.getItem('Business'))

      if(resp.success===true){
        setHistory(resp.total)
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
        console.log(resp)
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
      console.log(resp)
      if(!resp.error){
        const latestMonths=resp.filter((booking)=>booking.month<=now)
      
        setMonthlyBookings(latestMonths.map(booking=>({month:months[booking.month-1].name,total:booking.total})))
      }
      else{
        if(resp.status===403){
          logOut()
          navigate('/login')
        }
      }

    }
    const getBusinessInteractions= async()=>{
      const resp = await getInteractions(localStorage.getItem('Business')) 
      if(!resp.error){
        setTotalInteractions(resp)
      }
      else{
        if(resp.status===403){
          logOut()
          navigate('/login')
        }
      }
    }
    const getBusinessInteractionsByWeek=async()=>{
      const resp = await getInteractionsByWeek(localStorage.getItem('Business')) 
      if(resp.success===true){
        setWeeklyInteractions(resp.data)
      }
      else{
        if(resp.status===403){
          logOut()
          navigate('/login')
        }
      }
    }
    const getFlows=async()=>{
      const resp = await getConversationFlows(localStorage.getItem('Business')) 
      if(!resp.error){
        setConversationFlows(resp)
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
    getBusinessInteractions()
    getBusinessInteractionsByWeek()
    getFlows()
    getSalesNumber()
    getBookingsMonthly()
  },[])
   
      
  return (
    <Principal>
        <Box component="main" sx={{ flexGrow: 1, p:{xs:1,sm:2,md:3}, display:"grid", backgroundColor:"#F4F3FA", mt:'72px',gridRowGap:"32px", gridTemplateRows:{xs:"repeat(4,1fr)",sm:"repeat(2,1fr)"}, gridTemplateColumns:{xs:"1fr",sm:"1fr 1fr"},gridColumnGap:"24px"}}>
        
       {stats.length>0? <ChartComponent title={type==='services'?'Servicios':'Productos'} data={stats} type={'bar'}/>:<EmptyComponent title={type==='services'?'Servicios':'Productos'}/>}
        {monthlyBookings.length>0&&<BarChartComponent title={'Total de Ventas'} data={monthlyBookings}/>}
        {totalBookings && totalInteractions? <InteractionBookingComponent title={type==='services'?'Conversaciones/Reservas':'Conversaciones/Pedidos'} bookings={totalBookings} conversations={totalInteractions}/>:<EmptyComponent title={'Conversaciones/'+type==='services'?'Reservas':'Pedidos'}/>}
        
        {weeklyInteractions.length>0&&<LineChartComponent title={'Conversaciones de la última semana'} data={weeklyInteractions}/>}
       
<HistoryComponent history={history}/>
       
        
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          width:'100%',
          gap: '12px',
          mb:10
        }}>
          {totalSales && <TotalSalesComponent total={totalSales}/>}
          {totalBookings && <TotalBookingsComponent total={totalBookings}/>}
        </Box>
      </Box>
    </Principal>
  )
}

export default DashboardPage