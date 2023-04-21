import { Box } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { red } from "@mui/material/colors";
const CRUDCategoryComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignContent: "center",
        justifyContent: "space-evenly",
      }}
    >
      <IconButton aria-label="update" color='primary.light'>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" >
        <DeleteIcon color={red[600]}/>
      </IconButton>
    </Box>
  );
};

export default CRUDCategoryComponent;
