import React, { useEffect, useState } from 'react'
import Principal from './Principal';
import { Box, Typography } from '@mui/material';
import { DataGrid,esES } from '@mui/x-data-grid'
import { useNavigate, useParams } from 'react-router-dom';
import { getBookings } from '../services/servicesServices';
import { blue } from '@mui/material/colors';
import { getOrders } from '../services/servicesProducts';
const BookingDetailsPage = () => {
  const[bookings,setBookings]=useState([])
  const {id}=useParams()
  const navigate=useNavigate()
  const getServiceName=(params)=>{
    return params.row.services.map(service=>service.name)
}
  const getProductName=(params)=>{
    return params.row.products.map(product=>product.name)
}
const getCoin=(params)=>{
  return params.row.services[0].coin
}
const formatPrice=(params)=>{
  return `${params.row.total} ${getCoin(params)}`
}
  const type=localStorage.getItem('type')
  const columns=[{field: 'name',width:'200', headerName:'Cliente'},{field:'phone',headerName:'Teléfono'},{field:'services', width:'200', headerName:'Servicios', valueGetter:getServiceName},{field:'total',headerName:'Precio', valueGetter: formatPrice},{field:'date',headerName:'Fecha'},{field:'time',headerName:'Hora'}]
  const columnsOrders=[{field: 'name',width:'200', headerName:'Cliente'},{field:'phone',headerName:'Teléfono'},{field:'services', width:'200', headerName:'Productos', valueGetter:getProductName},{field:'total',headerName:'Precio', valueGetter: formatPrice},{field:'date',headerName:'Fecha'},{field:'time',headerName:'Hora'}]
  const [selectedRow,setSelectedRow]=useState([])
  useEffect(()=>{
    const getBusinessBookings = async()=>{
      let resp
      if(localStorage.getItem('type')==='services'){
        resp= await getBookings(id)
      }
      else{
          resp= await getOrders(id)
      }
      
      console.log(resp)
      if(!resp.error){
          setBookings(resp)
      }
      else{
          if(resp.status===403){
              navigate('/login')
            }
      }
  }
  getBusinessBookings()
  },[id])
  return (
    <Principal>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:{xs:'calc(100% - 60px)',sm:'100%'},gap:'20px', backgroundColor:'#fff'}}>
        
                <Typography variant='h3' color='primary'sx={{mt:10}}>{localStorage.getItem('type')==='services'?'Reservas':'Pedidos'}</Typography>
            
               
                
               
            <Box sx={{width:{xs:'100%',sm:'80%'}, marginBottom:{xs:'200px',sm:'180px'}, display:'flex',flexDirection:'column'}}>
                
            <DataGrid
            sx={{mt:2,
                marginInline:'auto',
                width:'90%',
                borderColor: 'primary.light',
                backgroundColor:blue[50],
            '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              }}}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={bookings}
        getRowId={(row) => row._id}
        columns={type==='services'?columns:columnsOrders}
        pageSize={3}
        rowsPerPageOptions={[5]}
        rowLength={10}
        onRowSelectionModelChange={(newRowSelected)=>{console.log(newRowSelected);setSelectedRow(newRowSelected)}}
        rowSelectionModel={selectedRow}
      />
      </Box>
            
        </Box>
    </Principal>
  )
}

export default BookingDetailsPage