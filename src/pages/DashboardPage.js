import {  Box } from '@mui/material'

import React, { useEffect, useState } from 'react'

import ChartComponent from '../components/ChartComponent'
import BarChartComponent from '../components/BarChartComponent'

import Principal from './Principal'
import { logOut } from '../services/service'
import { useNavigate } from 'react-router-dom'
import TotalBookingsComponent from '../components/TotalBookingsComponent'
import TotalSalesComponent from '../components/TotalSalesComponent'
import {  getCurrencyProduct, getMonthlyOrders, getPeriodOrders, getProductsStats, getTotalOrders, getTotalPeriodOrders, getTotalSalesProducts } from '../services/servicesProducts'
import {  getCurrencyService, getMonthlyBookings, getPeriodBookings, getServicesStats, getTotalBookings, getTotalPeriodBookings, getTotalSales } from '../services/servicesServices'
import { getConversationFlows, getInteractions, getInteractionsByWeek, getPeriodInteractions } from '../services/servicesInteractions'
import InteractionBookingComponent from '../components/InteractionBookingBarsComponent'
import LineChartComponent from '../components/LineChartComponent'
import EmptyComponent from '../components/EmptyComponent'
import PeriodSalesTotalComponent from '../components/PeriodSalesTotalComponent'
import SalesCountPeriodComponent from '../components/SalesCountPeriodComponent'
import SalesBookingsComponent from '../components/SalesBookingsComponent'
const DashboardPage = () => {
  
  const[stats,setStats]=useState([])
  const [totalSales,setTotalSales]=useState()
  const[totalBookings,setTotalBookings]=useState()
  const[weeklyInteractions,setWeeklyInteractions]=useState([])
  const[totalInteractions,setTotalInteractions]=useState()
  const[bookingsMonth,setbookingsMonth]=useState(0)
  const[monthlyBookings,setMonthlyBookings]=useState([])
  const navigate=useNavigate()
  const [currency,setCurrency]=useState('')
  const [salesMonth,setSalesMonth]=useState(0)
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
    if(!localStorage.getItem('Business')){
      navigate('/login')
    }
    const getBusinessCurrency=async()=>{
      let resp
      if(type==='services'){
        resp= await getCurrencyService(localStorage.getItem('Business'))
      }
      else{
        resp= await getCurrencyProduct(localStorage.getItem('Business'))
      }
      console.log(resp)
      if(resp.success===true){
        setCurrency(resp.coin)
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
    const getMonthBookings=async()=>{
      let resp
        if(type==='services'){
            resp= await getPeriodBookings('month',localStorage.getItem('Business'))
        }
        else{
            resp= await getPeriodOrders('month',localStorage.getItem('Business'))
        }
        if(resp.success===true){
            setbookingsMonth(resp)
        }
    }
    const getMonthInteractions= async()=>{
      const resp = await getPeriodInteractions('month',localStorage.getItem('Business'))
      if(resp.success===true){
        setTotalInteractions(resp)
      }
    }
    const getSales= async()=>{
      let resp
      if(type==='services')
      {resp= await getTotalSales(localStorage.getItem('Business'))}
      else{
        resp= await getTotalSalesProducts(localStorage.getItem('Business'))
      }
      console.log(resp)
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
    const getSalesMonth= async()=>{
      let resp
      if(type==='services'){
          resp= await getTotalPeriodBookings('month',localStorage.getItem('Business'))
      }
      else{
          resp= await getTotalPeriodOrders('month',localStorage.getItem('Business'))
      }
      console.log(resp)
      if(resp.success===true){
          setSalesMonth(resp.total)
      }
      else{
          setSalesMonth(0)
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
      
        setMonthlyBookings(latestMonths.map(booking=>({month:months[booking.month-1].name,total:booking.total})))
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
    
    
   getBusinessCurrency()
    getProductsData()
    getSales()
    getMonthInteractions()
    getBookingsMonthly()
    getBusinessInteractionsByWeek()
    getSalesMonth()
    getSalesNumber()
    getMonthBookings()
  },[])
   
      
  return (
    <Principal>
      
        <Box component="main" sx={{ flexGrow: 1, p:{xs:1,sm:1,md:3}, display:"grid", backgroundColor:"#F4F3FA",gridRowGap:"32px", gridTemplateRows:{xs:"repeat(4,1fr)",sm:"repeat(2,1fr)"}, gridTemplateColumns:{xs:"1fr",sm:"1fr 1fr"},gridColumnGap:"24px",mt:'72px'}}>
        
       {stats.length>0? <ChartComponent title={type==='services'?'Servicios':'Productos'} data={stats} type={'bar'}/>:<EmptyComponent title={type==='services'?'Servicios':'Productos'}/>}
        {monthlyBookings.length>0&&<BarChartComponent title={'Total de Ventas'} data={monthlyBookings}/>}
        {bookingsMonth && totalInteractions? <InteractionBookingComponent type={type} title={type==='services'?'Conversaciones - Reservas':'Conversaciones - Pedidos'} bookings={bookingsMonth} conversations={totalInteractions}/>:<EmptyComponent title={'Conversaciones/'+type==='services'?'Reservas':'Pedidos'}/>}
        
        {weeklyInteractions.length>0&&<LineChartComponent title={'Conversaciones de la última semana'} data={weeklyInteractions}/>}
       
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          width:{xs:'100%',sm:'100%'},
          gap: '12px',
          mb:2,
          backgroundColor:'#fff',
          borderRadius:'15px'
        }}>

        
       {<PeriodSalesTotalComponent type={type} initialValue={salesMonth} currency={currency}/>}
        {bookingsMonth &&  <SalesCountPeriodComponent type={type} initialValue={bookingsMonth.total}/>}
        {totalBookings && totalSales && <SalesBookingsComponent totalBookings={totalBookings} totalSales={totalSales}/>}
        
          {totalSales && <TotalSalesComponent total={totalSales} currency={currency}/>}
          {totalBookings && <TotalBookingsComponent total={totalBookings}/>}
         
        </Box>
      </Box>
    </Principal>
  )
}

export default DashboardPage