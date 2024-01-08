import React, { useEffect, useState } from "react";
import Principal from "./Principal";
import { Box, Paper, Typography } from "@mui/material";
import { Dataset, PictureAsPdf, DatasetLinked} from "@mui/icons-material";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";


import { exportMultipleChartsToPdf } from "../services/utils";
import { useSelector } from "react-redux";
import { selectImages } from "../features/indicators/indicatorSlice";
import { getBookingsForExport } from "../services/servicesServices";
import { getOrdersForExport } from "../services/servicesProducts";
import { getCrmInfoExport } from "../services/servicesServices";
const ReportPage = () => {
  const [bookings, setBookings] = useState([]);
  const images = useSelector(selectImages)
  const elements=Object.values(images.images)
  console.log(elements)
  const properties = ["name", "phone", "date", "time", "total", "createdAt"];
const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  const handleExportData = async () => {
    try {
      const id = localStorage.getItem('Business');
      const properties = ['userId', 'lastProduct', 'lastFlow', 'createdAt'];

      const response = await getCrmInfoExport(id, properties);
      console.log(JSON.stringify(response))
      const flowMappings = {
        "morningSelectionFlow": "Seleccionando horarios",
        "BuyFlow": "Compras o Reservas",
        "botSelectionFlow": "Inicio conversacion",
        // Add more mappings as needed
      };
      const updatedData = response.map(entry => {
        if (entry.LastFlow in flowMappings) {
          return {
            ...entry,
            LastFlow: flowMappings[entry.LastFlow]
          };
        }
        return entry;
      });
      const formattedData = updatedData.map(entry => {
        const date = new Date(entry.CreatedAt);
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const formattedDate = `${date.toLocaleDateString('es-BO')} ${date.getHours()}:${minutes}`;
        return {
          ...entry,
          CreatedAt: formattedDate,
        };
      });
      
      // Convert the response data into an Excel file
      const ws = XLSX.utils.json_to_sheet(formattedData); // Convert JSON data to a worksheet
      
      const firstRow = ws[XLSX.utils.encode_cell({ r: 0, c: 0 })];
      if (firstRow && firstRow.v === 'UserId') {
        firstRow.v = 'Usuario';
      }

      // Change the second row property from 'lastProduct' to 'Ultimo mensaje'
      const secondRow = ws[XLSX.utils.encode_cell({ r: 0, c: 1 })];
      if (secondRow && secondRow.v === 'LastProduct') {
        secondRow.v = 'Ultimo mensaje';
      }

      // Change the first row property from 'lastFlow' to 'Flujo actual'
      const thirdRow = ws[XLSX.utils.encode_cell({ r: 0, c: 2 })];
      if (thirdRow && thirdRow.v === 'LastFlow') {
        thirdRow.v = 'Flujo actual';
      }

      // Change the first row property from 'createdAt' to 'Creado en'
      const fourthRow = ws[XLSX.utils.encode_cell({ r: 0, c: 3 })];
      if (fourthRow && fourthRow.v === 'CreatedAt') {
        fourthRow.v = 'Creado en';
      }

      const wb = XLSX.utils.book_new(); // Create a new workbook
      
      XLSX.utils.book_append_sheet(wb, ws, 'CrmData'); // Add the worksheet to the workbook
      
      // Generate the Excel file
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
      
      // Trigger file download
      FileSaver.saveAs(data, 'crm_data.xlsx');
    } catch (error) {
      console.error('Error exporting data:', error);
      // Handle error (show error message, etc.)
    }
  };
  useEffect(() => {
    const getInfoToExport=async()=>{
      let resp
      if(localStorage.getItem('type')==='services'){
        resp= await getBookingsForExport(localStorage.getItem('Business'),properties)
      }
      else{
        resp = await getOrdersForExport(localStorage.getItem('Business',properties))
      }
      if(!resp.error){
        console.log(resp)
        setBookings(resp)
      }
    }
    getInfoToExport()
  },[]);
  return (
    <Principal>
      <Box
        sx={{
          backgroundColor: "#F4F3FA",

          display: "flex",
          alignContent: "center",
          width: "100%",

          gap: "24px",

          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "72px",
        }}
      ></Box>
      <Paper
        sx={{
          display: "flex",
          alignContent: "center",

          flexDirection: "column",
          gap: "72px",
          padding: "32px",
          textAlign: "center",

          width: { xs: "80%", sm: "60%", lg: "50%" },
          alignSelf: "center",
          marginInline: "auto",
          mb: 1,
        }}
      >
        <Typography variant="h3" color={"primary"}>
          Reportes
        </Typography>

        <Typography variant="subtitle2">
          Exporte sus datos para tenerlos a mano
        </Typography>
       
       <Box
          sx={{
            display: "flex",
            alignItems: "center",

            flexDirection: { xs: "column", sm: "row" },
            gap: "24px",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            onClick={(e)=>exportToCSV(bookings,`reservas-${new Date().getSeconds()}`)}
          >
            <Dataset />
           
              <Typography variant="body1">{localStorage.getItem("type")==="services"?"Reservas":"Pedidos"}</Typography>
            
            
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
            onClick={()=>exportMultipleChartsToPdf(elements)}
          >
            <PictureAsPdf />
            <Typography variant="body1">Indicadores</Typography>
          </Box>
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
          }}
          onClick={()=>handleExportData()}
          >
          <DatasetLinked/>
          <Typography variant="body1">CRM Info</Typography>
        </Box>
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "12px",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <PictureAsPdf />
            <Typography variant="body1">Catálogo</Typography>
          </Box> */}
        </Box>
      </Paper>
    </Principal>
  );
};

export default ReportPage;
