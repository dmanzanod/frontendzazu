import { Box, Button, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { DataGrid,esES } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Principal from './Principal';
import { useNavigate, useParams } from 'react-router-dom';
import { getServices } from '../services/servicesServices';
import CRUDServiceComponent from '../components/CRUDServiceComponent';
import { getProducts } from '../services/servicesProducts';
const ProductService = () => {
    const [selectedRow,setSelectedRow]=useState([])
    const[deleted,setDeleted]=useState(false)
    const getCategoryName=(params)=>{
        return params.row.categoryId.name
    }
    const getServiceId=(params)=>{
        return params.row._id
    }
    const formatPrice=(params)=>{
        return `${params.row.price} ${params.row.coin}`
    }
    const columns=[{field: 'name',width:'200', headerName:'Nombre'},{field:'category', width:'200', headerName:'Categoría', valueGetter:getCategoryName},{field:'price',headerName:'Precio', valueGetter: formatPrice},{field:'operations',headerName:'Acciones', renderCell:(params)=><CRUDServiceComponent id={params.row._id} deleted={()=>setDeleted(true)}/>}]
    const columnsProducts=[{field: 'name',width:'200', headerName:'Nombre'},{field:'stock',width:'200',headerName:'Stock'},{field:'category', width:'200', headerName:'Categoría', valueGetter:getCategoryName},{field:'price',headerName:'Precio', valueGetter: formatPrice},{field:'operations',headerName:'Acciones', renderCell:(params)=><CRUDServiceComponent id={params.row._id} deleted={()=>setDeleted(true)}/>}]
    const [services,setServices]=useState([])
    const {id}= useParams()
    const type=localStorage.getItem('type')
    const newProductService=()=>{
        if(type==='service'){
            navigate('/newService')
        }
        else{
            navigate('/newProduct')
        }
    }
    const navigate=useNavigate()
    useEffect(()=>{
        console.log(deleted)
        let resp
        const getBusinessServices = async()=>{
            if(type==='services'){
                resp= await getServices(id)
            }
            else{
                resp= await getProducts(id)
            }
            
            if(!resp.error){
                setServices(resp)
            }
            else{
                if(resp.status===403){
                    navigate('/login')
                  }
            }
        }
        getBusinessServices()
    },[id,deleted])

  return (
    <Principal>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:{xs:'calc(100% - 60px)',sm:'100%'},gap:'20px', backgroundColor:'#fff'}}>
        
                <Typography variant='h3' color='primary'sx={{mt:10}}>{type==='services'?'Servicios':'Productos'}</Typography>
            
               
                
               
            <Box sx={{width:{xs:'100%',sm:'80%'}, marginBottom:{xs:'200px',sm:'180px'}, display:'flex',flexDirection:'column'}}>
                <Button variant='contained' sx={{ color:'#fff', borderRadius:'8px', width:'120px',alignSelf:'flex-start', m:2}}startIcon={<AddIcon />}
                onClick={newProductService}>
                     
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
        columns={type==='services'?columns:columnsProducts}
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