import {  Box } from '@mui/material'

import React, { useEffect, useState } from 'react'

import ChartComponent from '../components/ChartComponent'
import BarChartComponent from '../components/BarChartComponent'

import Principal from './Principal'
import { logOut, getUniqueCrmByCategory } from '../services/service'
import { useNavigate } from 'react-router-dom'
import TotalBookingsComponent from '../components/TotalBookingsComponent'
import TotalSalesComponent from '../components/TotalSalesComponent'
import {  getCurrencyProduct, getMonthlyOrders, getPeriodOrders, getProductsStats, getTotalOrders, getTotalPeriodOrders, getTotalSalesProducts } from '../services/servicesProducts'
import {  getCurrencyService, getMonthlyBookings, getPeriodBookings, getServicesStats, getTotalBookings, getTotalPeriodBookings, getTotalSales } from '../services/servicesServices'
import { getConversationFlows, getInteractions, getInteractionsByMonth, getInteractionsByWeek, getPeriodInteractions } from '../services/servicesInteractions'
import InteractionBookingComponent from '../components/InteractionBookingBarsComponent'
import LineChartComponent from '../components/LineChartComponent'
import EmptyComponent from '../components/EmptyComponent'
import PeriodSalesTotalComponent from '../components/PeriodSalesTotalComponent'
import SalesCountPeriodComponent from '../components/SalesCountPeriodComponent'
import SalesBookingsComponent from '../components/SalesBookingsComponent'
import BarChartDataComponent from '../components/ChartConversacionMensualComponent'
import BarChartHighToLowComponent from '../components/ComponentsChartsAssist/BarChartHightToLow'
import LineChartMonthlyComponent from '../components/ComponentsChartsAssist/LineChartMonthlyComponent'
import CrmDashboardComponent from '../components/ComponentsChartsAssist/CrmDashboardComponent'
import DualBarChartComponent from '../components/ComponentsChartsAssist/DualBarChartComponent'
import BarChartCategoriaComponent from '../components/ComponentsChartsAssist/BarChartCategoriasComponent'

const DashboardPage = () => {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); 
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex + 1);
  const [uniqueCategory, setUniqueCategories]= useState(0);
  const[stats,setStats]=useState([])
  const [totalSales,setTotalSales]=useState()
  const[totalBookings,setTotalBookings]=useState()
  const[weeklyInteractions,setWeeklyInteractions]=useState([])
  const[monthlyInteractions,setMonthlyInteractions]=useState([])
  const[totalInteractions,setTotalInteractions]=useState()
  const[bookingsMonth,setbookingsMonth]=useState(0)
  const[monthlyBookings,setMonthlyBookings]=useState([])
  const navigate=useNavigate()
  const [currency,setCurrency]=useState('')
  const [salesMonth,setSalesMonth]=useState(0)
  const type=localStorage.getItem('type')
  let BusinessType = localStorage.getItem('BusinessType');
  let flowDataRaw = localStorage.getItem('flowDataNotPermitted');
  let BusinessFlowDataNotPermitted = [];

  if (flowDataRaw) {
          BusinessFlowDataNotPermitted = JSON.parse(flowDataRaw);
  } else {
      console.warn("No flowDataNotPermitted found in localStorage.");
  }
  console.log("Valor busines\n", BusinessFlowDataNotPermitted )
  let BusinessFlow = localStorage.getItem('FlowData')
  if (BusinessType === "undefined") {
    BusinessType = "";
  } else if (!BusinessType) {
    BusinessType = "";
  }

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
      const uniqueCategories = await getUniqueCrmByCategory(localStorage.getItem('Business'));
      console.log("UserId \n", localStorage.getItem('UserId'))
      setUniqueCategories(uniqueCategories.count)
      let resp
      if(type==='services'){
        resp= await getCurrencyService(localStorage.getItem('Business'))
      }
      else{
        resp= await getCurrencyProduct(localStorage.getItem('Business'))
      }
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
    const getBusinessInteractionsByMonth=async()=>{
      const resp = await getInteractionsByMonth(localStorage.getItem('Business'),selectedMonth) 
      if(resp.success===true){
        setMonthlyInteractions(resp.data)
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
    getBusinessInteractionsByMonth()
    getSalesMonth()
    getSalesNumber()
    getMonthBookings()
  },[])
   
  return (
    <Principal>
  <Box
    component="main"
    className='dashboard-page'
    sx={{
      flexGrow: 1,
      p: { xs: 1, sm: 1, md: 5 },
      display: "flex",
      flexDirection: "column", // Stack components vertically
      backgroundColor: "#141741",
      mt: "60px",
      gap: "32px", // Row gap
    }}
  >
    {BusinessType === "" && (
      <React.Fragment>
        {/* First row: Two components, each taking 50% of the width */}
        <Box sx={{ display: "flex", width: "100%", gap: "24px" }}>
          <Box sx={{ flex: 1 }}>
            <BarChartHighToLowComponent title={'PROGRAMAS'} filterCondition={BusinessFlow}/>
          </Box>
          <Box sx={{ width: uniqueCategory > 5 ? { xs: '100%', sm: '100%' } : '50%' }}>
                {<BarChartCategoriaComponent title={'CATEGORÍAS'} filterCondition = "categoryFlow" />}
          </Box>
        </Box>

        {/* Second row: One component taking 100% of the width */}
        {weeklyInteractions.length > 0 && (
          <Box sx={{ width: "100%", height: { sm: "550px" }, backgroundColor: "#fff", borderRadius: "15px" }}>
            <LineChartMonthlyComponent title={'CONVERSACIONES MENSUALES'} />
          </Box>
        )}

        {/* Third row: Two components, each taking 50% of the width */}
        <Box sx={{ display: "flex", width: "100%", gap: "24px" }}>
          {bookingsMonth && totalInteractions ? (
            <Box sx={{ flex: 1 }}>
              <InteractionBookingComponent
                type={type}
                title={type === 'services' ? 'Conversaciones - Reservas' : 'Conversaciones - Pedidos'}
                bookings={bookingsMonth}
                conversations={totalInteractions}
              />
            </Box>
          ) : (
            <Box sx={{ flex: 1 }}>
              <EmptyComponent
                title={
                  'Conversaciones/' + (type === 'services' ? 'Reservas' : 'Pedidos')
                }
              />
            </Box>
          )}
          {weeklyInteractions.length > 0 && (
            <Box sx={{ flex: 1 }}>
              <LineChartComponent title={'Conversaciones de la última semana'} data={weeklyInteractions} />
            </Box>
          )}
        </Box>

        {/* Last row: One component taking 100% of the width */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "12px",
            mb: 2,
            backgroundColor: "#fff",
            borderRadius: "15px",
          }}
        >
          <CrmDashboardComponent flowNamesNotPermitted={BusinessFlowDataNotPermitted}/>

        </Box>
      </React.Fragment>
        )}
        {/* {BusinessType === "" && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: '100%' },
            gap: '12px',
            mb: 2,
            backgroundColor: '#fff',
            borderRadius: '15px'
          }}>
            {
              // Conditional rendering starts here
              <React.Fragment>
                {<PeriodSalesTotalComponent type={type} initialValue={salesMonth} currency={currency} />}
                {bookingsMonth && <SalesCountPeriodComponent type={type} initialValue={bookingsMonth.total} />}
                {totalBookings && totalSales && <SalesBookingsComponent totalBookings={totalBookings} totalSales={totalSales} />}
                {totalSales && <TotalSalesComponent total={totalSales} currency={currency} />}
                {totalBookings && <TotalBookingsComponent total={totalBookings} />}
              </React.Fragment>
              // Conditional rendering ends here
            }
          </Box>
        )} */}
        {BusinessType === "Asistente virtual cba" && (
          <React.Fragment>
            <Box sx={{ width: { xs: '100%', sm: '100%' }, height: "auto" }}>
              <BarChartHighToLowComponent title={'Programas'} filterCondition = "inscripcionFlow" />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '100%' }, height: "auto",minHeight: '600px' }}>
              {weeklyInteractions.length > 0 && (
                <LineChartMonthlyComponent title={'Conversaciones mensuales'}/>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: uniqueCategory > 5 ? 'column' : 'row', width: { xs: '100%', sm: '100%' }, height: "auto", gap: '24px'  }}>
              {/* First BarChartHighToLowComponent */}
              <Box sx={{ width: uniqueCategory > 5 ? { xs: '100%', sm: '100%' } : '50%' }}>
                {<BarChartCategoriaComponent title={'Categoría'} filterCondition = "categoryFlow" />}
              </Box>
              {/* Second BarChartHighToLowComponent */}
              <Box sx={{ width: '50%' }}>
                {<DualBarChartComponent title={'Conversaciones VS Consultas'}/>}
              </Box>
            </Box>
            <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "12px",
            mb: 2,
            backgroundColor: "#fff",
            borderRadius: "15px",
          }}
        >
            <CrmDashboardComponent flowNamesNotPermitted={BusinessFlowDataNotPermitted}/>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Principal>
  )
}
export default DashboardPage