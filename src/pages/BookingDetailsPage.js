import React, { useEffect, useState } from "react";
import Principal from "./Principal";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  esES,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import { getBookings } from "../services/servicesServices";
import { blue, cyan } from "@mui/material/colors";
import { getOrders } from "../services/servicesProducts";
const BookingDetailsPage = () => {
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const type = localStorage.getItem("type");
  const getServiceName = (params) => {
    return params.row.services.map((service) => service.name);
  };
  const getProductName = (params) => {
    
    return params.row.products.map((product) => product.product.name);
  };
  const getCoin = (params) => {
    return type === "products"
      ? params.row.products[0].coin
      : params.row.services[0].coin;
  };
  const formatPrice = (params) => {
    return `${params.row.total} ${getCoin(params)}`;
  };

  const columns = [
    { field: "name", width: "200", headerName: "Cliente" },
    { field: "phone", headerName: "Teléfono" },
    {
      field: "services",
      width: "200",
      headerName: "Servicios",
      valueGetter: getServiceName,
    },
    { field: "total", headerName: "Precio", valueGetter: formatPrice },
    { field: "date", headerName: "Fecha" },
    { field: "time", headerName: "Hora" },
  ];
  const columnsOrders = [
    { field: "name", width: "200", headerName: "Cliente" },
    { field: "phone", headerName: "Teléfono" },
    {
      field: "services",
      width: "200",
      headerName: "Productos",
      valueGetter: getProductName,
    },
    { field: "total", headerName: "Precio", valueGetter: formatPrice },
    { field: "date", headerName: "Fecha" },
    { field: "time", headerName: "Hora" },
  ];
  const [selectedRow, setSelectedRow] = useState([]);
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{ color: cyan[900] }} />
        <GridToolbarFilterButton sx={{ color: cyan[900] }} />
        <GridToolbarDensitySelector sx={{ color: cyan[900] }} />
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
          sx={{ color: cyan[900] }}
        />
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    const getBusinessBookings = async () => {
      let resp;
      if (localStorage.getItem("type") === "services") {
        resp = await getBookings(id);
      } else {
        resp = await getOrders(id);
      }

      if (!resp.error) {
        setBookings(resp);
      } else {
        if (resp.status === 403) {
          navigate("/login");
        }
      }
    };
    getBusinessBookings();
  }, [id]);
  return (
    <Principal>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#fff",
          height: "100%",
          paddingBottom: "24px",
        }}
      >
        <Typography variant="h3" color="primary" sx={{ mt: 10 }}>
          {localStorage.getItem("type") === "services" ? "Reservas" : "Pedidos"}
        </Typography>

        <DataGrid
          slots={{ toolbar: CustomToolbar }}
          sx={{
            mt: 2,
            marginInline: "auto",
            width: "75vw",
            borderColor: "primary.light",
            backgroundColor: blue[50],
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={bookings}
          getRowId={(row) => row._id}
          columns={type === "services" ? columns : columnsOrders}
          pageSize={3}
          rowsPerPageOptions={[5]}
          rowLength={10}
          onRowSelectionModelChange={(newRowSelected) => {
            setSelectedRow(newRowSelected);
          }}
          rowSelectionModel={selectedRow}
        />
      </Box>
    </Principal>
  );
};

export default BookingDetailsPage;
