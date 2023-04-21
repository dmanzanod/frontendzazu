import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCategories } from '../services/service'
import Principal from './Principal'
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import { grey } from '@mui/material/colors'
import CRUDCategoryComponent from '../components/CRUDCategoryComponent'
const CategoryPage = () => {
    const [categories,setCategories]=useState([])
    const columns=[{field:'name',headerName:'Nombre', minWidth:'180'},{field:'operations',headerName:'Acciones', renderCell:()=><CRUDCategoryComponent/>}]
    const {id}=useParams()
    useEffect(()=>{
        const getBusinessCategories=async()=>{
            const resp = await getCategories(id)
            if(!resp.error){
                setCategories(resp)
            }
        }
        getBusinessCategories()
    },[id])
  return (
    <Principal>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%',gap:'20px', backgroundColor:'#fff'}}>
        
                <Typography variant='h3' color='primary'sx={{mt:10}}>Categorías</Typography>
            
               
                
               
            <Box sx={{width:{xs:'100%',sm:'60%'}}}>
                <Button variant='contained' sx={{ color:'#fff', borderRadius:'8px', width:'120px',alignSelf:'flex-start', m:2}}startIcon={<AddIcon />}>
                     
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
            
        </Box>
    </Principal>
  )
}

export default CategoryPage