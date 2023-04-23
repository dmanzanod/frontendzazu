import { Box } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
const CRUDCategoryComponent = ({id}) => {
    const navigate=useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignContent: "center",
        justifyContent: "space-evenly",
      }}
    >
      <IconButton aria-label="update" color='primary.light' onClick={()=>navigate(`/editCategory/${id}`)}>
        <EditIcon color='primary'/>
      </IconButton>
      <IconButton aria-label="delete" onClick={()=>navigate(`/deleteCategory/${id}`)}>
        <DeleteIcon sx={{color:red[400]}}/>

      </IconButton>
    </Box>
  );
};

export default CRUDCategoryComponent;
