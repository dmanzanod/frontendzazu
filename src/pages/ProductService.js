import { Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { DataGrid, esES } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Principal from "./Principal";
import { useNavigate, useParams } from "react-router-dom";
import { getServices } from "../services/servicesServices";
import CRUDServiceComponent from "../components/CRUDServiceComponent";
import { getProducts } from "../services/servicesProducts";
const ProductService = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const getCategoryName = (params) => {
    return params.row.categoryId.name;
  };
  const formatPrice = (params) => {
    return `${params.row.price} ${params.row.coin}`;
  };
  const columns = [
    { field: "name", width: "200", headerName: "Nombre" },
    {
      field: "category",
      width: "200",
      headerName: "Categoría",
      valueGetter: getCategoryName,
    },
    { field: "description", width: "200", headerName: "Descripción"},
    { field: "code", width: "300", headerName: "Código"},
    { field: "price", headerName: "Precio", valueGetter: formatPrice },
    {
      field: "operations",
      headerName: "Acciones",
      renderCell: (params) => (
        <CRUDServiceComponent
          id={params.row._id}
          deleted={() => setDeleted(true)}
        />
      ),
    },
  ];
  const columnsProducts = [
    { field: "name", width: "200", headerName: "Nombre" },
    // { field: "stock", width: "200", headerName: "Stock" },
    { field: "description", width: "300", headerName: "Descripción"},
    { field: "code", width: "150", headerName: "Código"},
    {
      field: "category",
      width: "200",
      headerName: "Categoría",
      valueGetter: getCategoryName,
    },
    { field: "price", headerName: "Precio", valueGetter: formatPrice },
    {
      field: "operations",
      headerName: "Acciones",
      renderCell: (params) => (
        <CRUDServiceComponent
          id={params.row._id}
          deleted={() => setDeleted(true)}
        />
      ),
    },
  ];
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const type = localStorage.getItem("type");
  const newProductService = () => {
    if (type === "services") {
      navigate("/newService");
    } else {
      navigate("/newProduct");
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    let resp;
    const getBusinessServices = async () => {
      if (type === "services") {
        resp = await getServices(id);
      } else {
        resp = await getProducts(id);
      }

      if (!resp.error) {
        setServices(resp);
      } else {
        if (resp.status === 403) {
          navigate("/login");
        }
      }
    };
    getBusinessServices();
  }, [id, deleted]);

  return (
    <Principal>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          backgroundColor: "#fff",
          height:'100%',
          paddingBottom:'24px'
        }}
      >
        <Typography variant="h3" color="primary" sx={{ mt: 10 }}>
          {type === "services" ? "Servicios" : "Productos"}
        </Typography>

        
          <Button
            variant="contained"
            sx={{
              color: "#fff",
              borderRadius: "8px",
              width: "120px",
              alignSelf: {xs:'center',sm:"flex-start"},
              mt:2,
              mb:2,
              mr:2,
              ml:4
            }}
            startIcon={<AddIcon />}
            onClick={newProductService}
          >
            Nuevo
          </Button>
          <DataGrid
            sx={{
              mt: 2,
              marginInline: "auto",
              width:'75vw',
              borderColor: "primary.light",
              backgroundColor: blue[50],
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={services}
            getRowId={(row) => row._id}
            columns={type === "services" ? columns : columnsProducts}
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

export default ProductService;
