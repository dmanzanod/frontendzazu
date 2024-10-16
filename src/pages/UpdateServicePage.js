import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategories,
  getService,
  updateService,
} from "../services/servicesServices";
import { useFormik } from "formik";
import * as Yup from "yup";
import Principal from "./Principal";
import AlertComponent from "../components/AlertComponent";
import { FileUploadOutlined } from '@mui/icons-material'
const UpdateServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const[availableSpaces,setAvailableSpaces]=useState(false)
  const [image,setImage]=useState(null)
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const navigate = useNavigate();
  useEffect(() => {
    const getServiceById = async () => {
      const resp = await getService(id);
      console.log(resp);
      if (!resp.error) {
        setService(resp);
        if (resp.image) setPreviewImage(resp.image);
        if(resp.spaceAvailable){
          setAvailableSpaces(true)
        }
      } else {
        if (resp.status === 403) {
          navigate("/login");
        }
      }
    };
    const getBusinessCategories = async () => {
      const resp = await getCategories(localStorage.getItem("Business"));
      if (!resp.error) {
        setCategories(resp);
      }
    };
    getServiceById();
    getBusinessCategories();
  }, [id]);
  const handleUpload = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue('image', file);
    setPreviewImage(URL.createObjectURL(file));
    setImage(file);
  };
  const formik = useFormik({
    initialValues: { ...service },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("El servicio necesita un nombre"),
      code: Yup.string(),
      description: Yup.string(),
      details: Yup.string(),
      state: Yup.boolean(),
      spaceAvailable:Yup.number().integer('Los cupos disponibles deben ser positivos.'),
      price: Yup.number()
        .integer("El precio debe ser positivo")
        .required("El precio es requerido"),
      coin: Yup.string().required("Especifique una moneda"),
      categoryId: Yup.string().required(
        "Seleccione la categoría a la que pertenece el servicio"
      ),
      image: Yup.mixed().nullable().test(
        "type",
        "Solo puede subir una imagen en formato JPG, JPEG o PNG",
        function (value) {
          if (!image) {
            return true;
          } else {
            return value && (value.type === "image/jpg" || value.type === "image/jpeg" || value.type === "image/png");
          }
        }
      ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      const resp = await updateService(id, values);

      if (resp.success) {
        setLoading(false);
        setSeverity("success");
        setMessage(
          `El servicio ${resp.data.name} ha sido actualizado con éxito.`
        );
        setAlert(true);
        //alert
      } else {
        setLoading(false);
        setSeverity("error");
        setMessage(`Ha ocurrido un error ${resp.error}. Inténtelo nuevamente.`);
        setAlert(true);
      }
    },
  });

  return (
    <Principal>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "78px",
          marginBottom: "84px",
          paddingBlock: "12px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color={"primary"} sx={{ mb: 4 }}>
          Actualizar Servicio
        </Typography>
        <AlertComponent
          open={alert}
          message={message}
          handleClose={() => setAlert(false)}
          severity={severity}
          route={`/products/${localStorage.getItem("Business")}`}
        />
        <form className="form__update" onSubmit={formik.handleSubmit}>
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText error>{formik.errors.name}</FormHelperText>
            )}
          </FormControl>
          {formik.values.categoryId && (
            <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
              <TextField
                id="categoryId"
                name="categoryId"
                variant="filled"
                label="Categoría"
                select
                value={formik.values.categoryId || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </TextField>
              {formik.touched.categoryId && formik.errors.categoryId && (
                <FormHelperText error>
                  {formik.errors.categoryId}
                </FormHelperText>
              )}
            </FormControl>
          )}
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <TextField
              id="code"
              name="code"
              label="Código"
              InputLabelProps={{ shrink: true }}
              variant="filled"
              value={formik.values.code || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.code && formik.errors.code && (
              <FormHelperText error>{formik.errors.code}</FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <TextField
              id="price"
              name="price"
              label="Precio"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              value={formik.values.price || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price && (
              <FormHelperText error>{formik.errors.price}</FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <TextField
              id="coin"
              name="coin"
              label="Moneda"
              variant="filled"
              InputLabelProps={{ shrink: true }}
              value={formik.values.coin || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.coin && formik.errors.coin && (
              <FormHelperText error>{formik.errors.coin}</FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <FormControlLabel
              control={
                <Checkbox
                  value={formik.values.state}
                  name="state"
                  checked={formik.values.state===true?true:false}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label="Disponible"
            />
          </FormControl>
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <TextField
              id="description"
              name="description"
              variant="filled"
              label="Descripción"
              multiline
              InputLabelProps={{ shrink: true }}
              maxRows={4}
              value={formik.values.description || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <FormHelperText error>{formik.errors.description}</FormHelperText>
            )}
          </FormControl>

          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <TextField
              id="details"
              name="details"
              label="Detalles"
              variant="filled"
              multiline
              InputLabelProps={{ shrink: true }}
              value={formik.values.details || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.details && formik.errors.details && (
              <FormHelperText error>{formik.errors.details}</FormHelperText>
            )}
          </FormControl>
          <FormControl 
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' }, 
    gap: '12px', 
    width: { xs: '100%', sm: '60%', lg: '50%' }
  }}>
  {service.image && !image && (
    <Box 
      sx={{
        width: { xs: '100%', lg: '50%' },
        maxWidth: '100%',       // Restricts image to container width
        height: 'auto',         // Maintains aspect ratio of the image
        alignSelf: 'flex-end'
      }}>
      <img 
        className='image__service' 
        src={`${service.image}`} 
        alt='prodImage' 
        style={{ 
          maxWidth: '100%',     // Ensures the image doesn't overflow
          height: 'auto' 
        }} 
      />
    </Box>
  )}
  {image && (
    <Box 
      sx={{
        width: { xs: '100%', lg: '50%' },
        maxWidth: '100%',       // Restricts image to container width
        height: 'auto',         // Maintains aspect ratio of the image
        alignSelf: 'flex-end'
      }}>
      <img 
        className='image__service' 
        src={previewImage} 
        alt='prodImage' 
        style={{
          maxWidth: '100%',     // Ensures the image doesn't overflow
          height: 'auto' 
        }} 
      />
    </Box>
  )}
  <TextField
    sx={{ alignSelf: { xs: 'flex-start', lg: 'flex-end' }, width: { xs: '100%', lg: '50%' } }}
    variant="filled"
    value={image?.name || service.image || ''}
    type="text"
    label='Imagen'
    InputLabelProps={{ shrink: true }}
    InputProps={{
      endAdornment: (
        <IconButton component='label'>
          <FileUploadOutlined />
          <input
            styles={{ display: "none" }}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            hidden
            onChange={(e) => handleUpload(e)}
            name="image"
          />
        </IconButton>
      ),
    }}
  />
  {formik.touched.image && formik.errors.image && (
    <FormHelperText>{formik.errors.image}</FormHelperText>
  )}
</FormControl>

          {availableSpaces && 
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
          <TextField
          id='spaceAvailable'
          name='spaceAvailable'
          label='Número de cupos disponibles'
          variant='filled'
          InputLabelProps={{ shrink: true }}
          value={formik.values.spaceAvailable||''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          />
          {formik.touched.spaceAvailable && formik.errors.spaceAvailable && (
          <FormHelperText error>{formik.errors.spaceAvailable}</FormHelperText>
        )}</FormControl>
          }
          <Button disabled={loading || alert} variant="contained" type="submit">
            {loading ? "Actualizando..." : "Actualizar"}
          </Button>
          {loading && <CircularProgress color="secondary" />}
        </form>
      </Box>
    </Principal>
  );
};

export default UpdateServicePage;
