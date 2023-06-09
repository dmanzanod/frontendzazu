import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../theme/theme";
import { Box, Typography } from "@mui/material";

const EmptyComponent = ({title}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
            textAlign:'center',
          borderRadius: "20px",
          backgroundColor: "#FFF",

          gap: "12px",
        }}
      >
       <Typography variant='h5'>{title}</Typography>
          
            <Typography variant="subtitle1" color={"gray"}>Todavía no tienes información registrada</Typography>
          
        
      </Box>
    </ThemeProvider>
  );
};

export default EmptyComponent;
