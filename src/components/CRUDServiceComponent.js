import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import DeleteServiceModal from './DeleteServiceModal'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
const CRUDServiceComponent = ({id,deleted}) => {
    const [openDeleteService,setOpenDeleteService]=useState(false)
    const navigate=useNavigate()
    const handleEditClick=()=>{
      if(localStorage.getItem('type')==='services'){
        navigate(`/serviceUpdate/${id}`)
      }
        else{
          navigate(`/productUpdate/${id}`)
        }
      
      
    }
    const handleDeleteClick=()=>{
     
   
        setOpenDeleteService(true)
      
      

    }
    const handleCloseService=()=>{
        setOpenDeleteService(false)
    }
  return (
    <Box
    sx={{
      display: "flex",
      width: "100%",
      alignContent: "center",
      justifyContent: "space-evenly",
    }}
  >
    <IconButton aria-label="update" color='primary.light' onClick={handleEditClick}>
      <EditIcon color='primary'/>
    </IconButton>
    <IconButton aria-label="delete" onClick={handleDeleteClick}>
      <DeleteIcon sx={{color:red[400]}}/>

    </IconButton>
    
    
    <DeleteServiceModal open={openDeleteService} handleClose={handleCloseService} id={id} deleted={deleted}/>
  </Box>
  )
}

export default CRUDServiceComponent