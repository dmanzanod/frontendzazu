import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategories } from '../services/servicesServices'
import Principal from './Principal'
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors'
import CRUDCategoryComponent from '../components/CRUDCategoryComponent'
import NewCategoryModal from '../components/NewCategoryModal'
import { getCategoriesProduct } from '../services/servicesProducts'
const CategoryPage = () => {
    const [categories,setCategories]=useState([])
    const columns=[{field:'name',headerName:'Nombre', minWidth:'180'},{field:'operations',headerName:'Acciones', renderCell:(params)=><CRUDCategoryComponent id={params.row._id}  deleted={()=>setDeleted(true)} updated={()=>setUpdated(true)}/>}]
    const {id}=useParams()
    const [open,setOpen]=useState(false)
    const[created,setCreated]=useState(false)
    const[updated,setUpdated]=useState(false)
    const[deleted,setDeleted]=useState(false)
    const navigate= useNavigate()
    useEffect(()=>{
        const getBusinessCategories=async()=>{
          let resp
          if(localStorage.getItem('type')==='services'){
             resp = await getCategories(id)
          }  
          else{
            resp=await getCategoriesProduct(id)
          }
         
            if(!resp.error){
                setCategories(resp)
            }
            else{

            
            if(resp.status===403){
                navigate('/login')
              }
        }
        }
        getBusinessCategories()
    },[id,created,updated,deleted])
  return (
    <Principal>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%',gap:'20px', backgroundColor:'#fff'}}>
        
                <Typography variant='h3' color='primary'sx={{mt:10}}>Categorías</Typography>
            
               
                
               
            <Box sx={{width:{xs:'100%',sm:'60%'}}}>
                <Button variant='contained' sx={{ color:'#fff', borderRadius:'8px', width:'120px',alignSelf:'flex-start', m:2}}startIcon={<AddIcon />} onClick={()=>setOpen(true)}>
                     
                     Nueva</Button>
            <DataGrid
            sx={{mt:2,
                
                borderColor: 'primary.light',
                backgroundColor:grey[100],
            '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              }}}
            getRowId={(row) => row._id}
        rows={categories}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        
      />
      </Box>
            <NewCategoryModal open={open} handleClose={()=>setOpen(false)} created={()=>setCreated(true)}/>
        </Box>
    </Principal>
  )
}

export default CategoryPage