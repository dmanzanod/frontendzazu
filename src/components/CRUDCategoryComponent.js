import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { red } from "@mui/material/colors";

import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const CRUDCategoryComponent = ({id,deleted,updated}) => {
    
    const [openCategoryUpdate,setOpenCategoryUpdate]=useState(false)
    const [openDeleteCategoryModal,setOpenDeleteCategoryModal]=useState(false)
   
   
    const handleCloseUpdate=()=>{
      setOpenCategoryUpdate(false)
    }
    const handleCloseDelete=()=>{
      setOpenDeleteCategoryModal(false)
    }

    const handleEditClick=()=>{
      
        setOpenCategoryUpdate(true)
      
      
    }
    const handleDeleteClick=()=>{
     
   
        setOpenDeleteCategoryModal(true)
      
      

    }
    useEffect(()=>{
      
    },[id])
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
     <DeleteCategoryModal open={openDeleteCategoryModal} handleClose={handleCloseDelete} id={id} deleted={deleted}/>
     <UpdateCategoryModal open={openCategoryUpdate} handleClose={handleCloseUpdate} id={id} updated={updated}/>
      
    </Box>
  );
};

export default CRUDCategoryComponent;
