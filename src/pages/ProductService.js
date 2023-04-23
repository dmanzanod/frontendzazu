import { Box, Button, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { DataGrid,esES } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Principal from './Principal';
import { useParams } from 'react-router-dom';
import { getServices } from '../services/service';
import CRUDCategoryComponent from '../components/CRUDCategoryComponent';
const ProductService = () => {
    const [selectedRow,setSelectedRow]=useState([])
    const getCategoryName=(params)=>{
        return params.row.categoryId.name
    }
    const getServiceId=(params)=>{
        return params.row._id
    }
    const formatPrice=(params)=>{
        return `${params.row.price} ${params.row.coin}`
    }
    const columns=[{field: 'name',width:'200', headerName:'Nombre'},{field:'category', width:'200', headerName:'Categoría', valueGetter:getCategoryName},{field:'price',headerName:'Precio', valueGetter: formatPrice},{field:'operations',headerName:'Acciones', renderCell:(params)=><CRUDCategoryComponent id={params.row._id}/>}]
    const [services,setServices]=useState([])
    const {id}= useParams()
    useEffect(()=>{
        const getBusinessServices = async()=>{
            const resp= await getServices(id)
            if(!resp.error){
                setServices(resp)
            }
        }
        getBusinessServices()
    },[id])

  return (
    <Principal>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:{xs:'calc(100% - 60px)',sm:'100%'},gap:'20px', backgroundColor:'#fff'}}>
        
                <Typography variant='h3' color='primary'sx={{mt:10}}>Servicios</Typography>
            
               
                
               
            <Box sx={{width:{xs:'100%',sm:'80%'}, marginBottom:{xs:'200px',sm:'180px'}, display:'flex',flexDirection:'column'}}>
                <Button variant='contained' sx={{ color:'#fff', borderRadius:'8px', width:'120px',alignSelf:'flex-start', m:2}}startIcon={<AddIcon />}>
                     
                     Nuevo</Button>
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
        rows={services}
        getRowId={(row) => row._id}
        columns={columns}
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

export default ProductService