import React, { useEffect, useState } from "react";
import Principal from "./Principal";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getBusinessById, updateBusiness } from "../services/service";
import { getIn, useFormik } from "formik";
import * as Yup from "yup";
import AlertComponent from "../components/AlertComponent";
const BusinessDetailsUpdate = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const urlMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
  const countryMatch =
    /^[a-zA-Z_0-9\u00C0-\u017F][a-zA-Z_0-9\u00C0-\u017F\s]*$/g;
  const numberMatch=/^[A-Za-z0-9]*$/
  const [business, setBusiness] = useState({
    _id: "",
    name: "",
    phone: "",
    email: "",
    address: {
      country: "",
      state: "",
      street: "",
    },
    rrss: {
      facebook: "",
      instagram: "",
      tiktok: "",
      twitter: "",
    },
    payment: [
      {
        type: "",
        data: "",
      },
      {
        type: "",
        data: "",
      },
    ],
  });
  const[loading,setLoading]=useState(false)
  const[alert,setAlert]=useState(false)
  const[message,setMessage]=useState('')
  const [severity,setSeverity]=useState('success')
  
  useEffect(() => {
    const getBusiness = async () => {
      const resp = await getBusinessById(id);

      if (!resp.error) {
        setBusiness(resp);
      }
      else{
        if(resp.status===403){
          navigate('/login')
        }
      }
    };
    getBusiness();
  }, [id]);
  const formik = useFormik({
    initialValues: { ...business },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("El Nombre es requerido"),
      phone: Yup.string()
        .required()
        .matches(phoneRegExp, "El número de teléfono no es válido"),
      email: Yup.string().email("El email es inválido"),
      address: Yup.object().shape({
        country: Yup.string()
          .required("Debe especificar un país")
          .matches(countryMatch, "País solo puede contener letras y espacios"),
        state: Yup.string()
          .required("La ciudad es requerida")
          .matches(
            countryMatch,
            "La ciudad solo puede contener letras y espacios"
          ),
        street: Yup.string().required("La calle es requerida"),
        number: Yup.string().matches(numberMatch,'El número no puede contener caracteres especiales')
      }),
      rrss: Yup.object().shape({
        facebook: Yup.string().matches(urlMatch, "La URL no es válida"),
        instagram: Yup.string().matches(urlMatch, "La URL no es válida"),
        tiktok: Yup.string().matches(urlMatch, "La URL no es válida"),
        twitter: Yup.string().matches(urlMatch, "La URL no es válida"),
      }),
    }),
    onSubmit: async (values) => {
      setLoading(true)
      const resp=await updateBusiness(id,values)
      if(!resp.error){
        setLoading(false)
        setSeverity('success')
        setMessage('Los datos del negocio fueron actualizados correctamente.')
        setAlert(true)
      }
      else{
        setLoading(false)
        setSeverity('error')
        setMessage(`Ha ocurrido un Error: ${resp.error}. Inténtelo nuevamente`)
        setAlert(true)

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
        <Typography variant='h3' color={'primary'} sx={{mb:4}}>Datos del Negocio</Typography>
        <AlertComponent open={alert} severity={severity} message={message} handleClose={()=>setAlert(false) } route={'/'}/>
        <form className="form__update" onSubmit={formik.handleSubmit}>
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <TextField
              id="name"
              name="name"
              label="Nombre"
              variant="filled"
              fullWidth
              error={Boolean(formik.touched.name && formik.errors.name)}
              InputLabelProps={{ shrink: true }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText error>{formik.errors.name}</FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <TextField
              id="phone"
              name="phone"
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              label="Teléfono"
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <FormHelperText error>{formik.errors.phone}</FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <TextField
              id="email"
              name="email"
              error={Boolean(formik.touched.email && formik.errors.email)}
              label="Email"
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            )}
          </FormControl>
          <InputLabel>Dirección</InputLabel>
          <Box sx={{width:{xs:'80%',xl:'60%'},display:'flex'}}>
          <Grid container rowSpacing={2} >
            <Grid item xs={12} sm={6} className="grid__column">
            <FormControl sx={{ width: { xs: "100%", sm: "85%", lg: "60%"} }}>
                <TextField
                  id="country"
                  name="address.country"
                  error={Boolean(
                    getIn(formik.touched, "address.country") &&
                      getIn(formik.errors, "address.country")
                  )}
                  label="País"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.address.country || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {getIn(formik.touched, "address.country") &&
                  formik.errors.address &&
                  formik.errors.address.country && (
                    <FormHelperText error>
                      {formik.errors.address.country}
                    </FormHelperText>
                  )}
              </FormControl>

            </Grid>
            <Grid item xs={12} sm={6} className="grid__column">
            <FormControl sx={{ width: { xs: "100%", sm: "85%", lg: "60%" } }}>
                <TextField
                  id="state"
                  name="address.state"
                  error={Boolean(
                    getIn(formik.touched, "address.state") &&
                      getIn(formik.errors, "address.state")
                  )}
                  label="Ciudad"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.address.state || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {getIn(formik.touched, "address.state") &&
                  formik.errors.address &&
                  formik.errors.address.state && (
                    <FormHelperText error>
                      {formik.errors.address.state}
                    </FormHelperText>
                  )}
              </FormControl>

            </Grid>
            
            <Grid item xs={12} sm={6} className="grid__column">
            <FormControl sx={{ width: { xs: "100%", sm: "85%", lg: "60%" } }}>
                <TextField
                  id="street"
                  name="address.street"
                  error={Boolean(
                    getIn(formik.touched, "address.street") &&
                      getIn(formik.errors, "address.street")
                  )}
                  label="Calle"
                  variant="filled"
                  fullWidth
                  multiline
                  rows={8}
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.address.street || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {getIn(formik.touched, "address.street") &&
                  formik.errors.address &&
                  formik.errors.address.street && (
                    <FormHelperText error>
                      {formik.errors.address.street}
                    </FormHelperText>
                  )}
              </FormControl>
            

            
            </Grid>
            <Grid item xs={12} sm={6} className="grid__column">
            <FormControl sx={{ width: { xs: "100%", sm: "85%", lg: "60%" } }}>
                <TextField
                  id="number"
                  name="address.number"
                  error={Boolean(
                    getIn(formik.touched, "address.number") &&
                      getIn(formik.errors, "address.number")
                  )}
                  label="Nro"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.address.number || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {getIn(formik.touched, "address.number") &&
                  formik.errors.rrss &&
                  formik.errors.address.number && (
                    <FormHelperText error>
                      {formik.errors.address.number}
                    </FormHelperText>
                  )}
              </FormControl>

            </Grid>
          </Grid>
        </Box>
          <InputLabel>Redes Sociales</InputLabel>
          <Box sx={{width:{xs:'80%',xl:'60%'},display:'flex'}}>
          <Grid container rowSpacing={2} >
            <Grid item xs={12} sm={6} className="grid__column" >
              <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "60%" } }}>
                <TextField
                  id="facebook"
                  name="rrss.facebook"
                  error={Boolean(
                    getIn(formik.touched, "rrss.facebook") &&
                      getIn(formik.errors, "rrss.facebook")
                  )}
                  label="Facebook"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.rrss.facebook || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {getIn(formik.touched, "rrss.facebook") &&
                  formik.errors.rrss &&
                  formik.errors.rrss.facebook && (
                    <FormHelperText error>
                      {formik.errors.rrss.facebook}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className="grid__column">
              <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "60%" } }}>
                <TextField
                  id="instagram"
                  name="rrss.instagram"
                  error={Boolean(
                    getIn(formik.touched, "rrss.instagram") &&
                      getIn(formik.errors, "rrss.instagram")
                  )}
                  label="Instagram"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.rrss.instagram || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className="grid__column">
              <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "60%" } }}>
                <TextField
                  id="tiktok"
                  name="rrss.tiktok"
                  error={Boolean(
                    getIn(formik.touched, "rrss.tiktok") &&
                      getIn(formik.errors, "rrss.tiktok")
                  )}
                  label="TikTok"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.rrss.tiktok || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className="grid__column">
              <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "60%" } }}>
            <TextField
              id="twitter"
              name="rrss.twitter"
              error={Boolean(
                getIn(formik.touched, "rrss.twitter") &&
                  getIn(formik.errors, "rrss.twitter")
              )}
              label="Twitter"
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.rrss.twitter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>
            </Grid>
          </Grid>
          </Box>

          

          <Button sx={{color:'white', mt:2}} variant="contained" type="submit" disabled={loading}>
            {loading?'Actualizando..':'Actualizar'}
          </Button>
        </form>
        {loading&&<CircularProgress color='primary'/>}
      </Box>
    </Principal>
  );
};

export default BusinessDetailsUpdate;
