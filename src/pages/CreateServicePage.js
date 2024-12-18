import React, { useEffect, useState } from 'react'
import Principal from './Principal'
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getCategories, newService } from '../services/servicesServices'
import { AddOutlined,FileUploadOutlined } from '@mui/icons-material'
import NewCategoryModal from '../components/NewCategoryModal'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../components/AlertComponent'
import { logOut } from '../services/service'
const CreateServicePage = () => {
    const [categories,setCategories]=useState([])
    const [open,setOpen]=useState(false)
    const [loading,setLoading]=useState(false)
    const[alert,setAlert]=useState(false)
    const[availableSpaces,setAvailableSpaces]=useState(false)
    const [image,setImage]=useState(null)
    const [previewImage, setPreviewImage] = useState(null);
    const [severity,setSeverity]=useState('success')
    const [message,setMessage]=useState('Servicio creado exitosamente.')
    const navigate= useNavigate()
    
    const handleClose=()=>{
        setOpen(false)
    }
    const  handleUpload=(event)=>{
      formik.setFieldValue('image',event.target.files[0])
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    }
    const handleAvailableSpaces=(e)=>{
        setAvailableSpaces(e.target.checked)
        if(!e.target.checked){
          formik.setFieldValue('availableSpaces',0)
        }
    }
    const formik= useFormik({
        initialValues: {
            name:"",
            code:"",
            description:"",
            details:"",
            price:0,
            coin:"",
            availableSpaces:0,
            state:true,
            categoryId:"",
            businessId:localStorage.getItem('Business'),
            image: null,
        },
        
        validationSchema:Yup.object({
            name:Yup.string().required('El servicio necesita un nombre'),
            code:Yup.string(),
            state:Yup.boolean(),
            description:Yup.string(),
            details:Yup.string(),
            availableSpaces:Yup.number().integer('Los cupos deben ser positivos'),
            price:Yup.number().integer('El precio debe ser positivo').required('El precio es requerido'),
            coin:Yup.string().required('Especifique una moneda'),
            categoryId:Yup.string().required('Seleccione la categoría a la que pertenece el servicio'),
            image: Yup.mixed().nullable()
            .test("type", "Solo puede subir una imagen", function (value) {
              if (!image) {
                return true
              } else {
                return value && (value.type === "image/jpg" || value.type === "image/jpeg" || value.type === "image/png");
              }
            }),
          }),
        onSubmit:async(values)=>{
            setLoading(true)
            const resp= await newService(values)
            if(resp.success){
              setLoading(false)
              setMessage(`Servicio ${resp.data.name} creado con éxito`)
              setSeverity('success')
              setAlert(true)
            }
            
              else{

              
           
              setMessage(`Ha ocurrido un error: ${resp.name}`)
              setSeverity('error')
              setAlert(true)
              setLoading(false)
            }
            
            
        }

    })
    useEffect(()=>{
        const getBusinessCategories= async()=>{
            
            const resp= await getCategories(localStorage.getItem('Business'))
            if(!resp.error){
                setCategories(resp)
            }
            else{
              if(resp.status===403){
                
                logOut()
                navigate('/login')
              }
            }
        
    }
    getBusinessCategories()
    },[open])
  return (
    <Principal>
        <Box sx={{display:'flex', width:'100%', marginTop:'78px', marginBottom:'84px', paddingBlock:'12px',flexDirection:'column', alignItems:'center'}}>
        <Typography variant='h3' color={'primary'} sx={{mb:4}}>Nuevo Servicio</Typography>
         {alert && <AlertComponent open={alert} severity={severity} message={message} handleClose={()=>setAlert(false)} route={`/products/${localStorage.getItem('Business')}`}/>}
        <form className='form__update' onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
           
            <TextField 
            id='name'
            name='name'
            label='Nombre'
            variant='filled'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.touched.name && formik.errors.name && (
            <FormHelperText error>{formik.errors.name}</FormHelperText>
          )}
          </FormControl>
          {categories.length>0 &&
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            <Box sx={{display:'flex',gap:'12px', width:'100%', justifyContent:'center', alignContent:'center'}}>

            
            <TextField 
            sx={{flexGrow:1}}
            id='categoryId'
            name='categoryId'
            variant='filled'
            label='Categoría'
            
            select
            value={formik.values.categoryId || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}>
            {categories.length>0 && categories.map(category=>(
                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
            ))}
            </TextField>
            <IconButton variant='filled' onClick={()=>setOpen(true)}>
                <AddOutlined/>
            </IconButton>
            </Box>
            {formik.touched.categoryId && formik.errors.categoryId && (
            <FormHelperText error>{formik.errors.categoryId}</FormHelperText>
          )}
          </FormControl>}
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField
            id='code'
            name='code'
            label='Código'
            InputLabelProps={{ shrink: true }}
            variant='filled'
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.code && formik.errors.code && (
            <FormHelperText error>{formik.errors.code}</FormHelperText>
          )}</FormControl>
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField
            id='price'
            name='price'
            label='Precio'
            variant='filled'
            InputLabelProps={{ shrink: true }}
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price && (
            <FormHelperText error>{formik.errors.price}</FormHelperText>
          )}</FormControl>
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField id='coin'
            name='coin'
            label='Moneda'
            variant='filled'
            InputLabelProps={{ shrink: true }}
            value={formik.values.coin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
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
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField id='description'
            name='description'
            variant='filled'
            label='Descripción'
            multiline
            InputLabelProps={{ shrink: true }}
            maxRows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.touched.description && formik.errors.description && (
            <FormHelperText error>{formik.errors.description}</FormHelperText>
          )}</FormControl>
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField 
            id='details'
            name='details'
            label='Detalles'
            variant='filled'
            InputLabelProps={{ shrink: true }}
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            
            {formik.touched.details && formik.errors.details && (
            <FormHelperText error>{formik.errors.details}</FormHelperText>
          )}
          </FormControl>
          <FormControl sx={{ width: { xs: "100%", sm: "60%", lg: "50%" } }}>
            <FormControlLabel
              control={
                <Checkbox
                  value={formik.values.state}
                  name="availableSpaces"
                  
                  onChange={handleAvailableSpaces}
                 
                />
              }
              label="Cupos disponibles?"
            />
          </FormControl>
          <FormControl sx={{display:'flex',flexDirection:{xs:'column',lg:'row'}, gap:'12px', width:{xs:'100%', sm:'60%', lg:'50%'}}}>
          {image&&
          <Box sx={{width:{xs:'100%',lg:'50%'},alignSelf:'flex-end'}}>
            <img className='image__product' src={previewImage} alt='prodImage'/>
          </Box>}
          
          <TextField
          sx={{alignSelf:{xs:'flex-start',lg:'flex-end'}, width:{xs:'100%',lg:'50%'}}}
      variant="filled"
      value={image?.name|| ''}          
      type="text"
      label='Imagen'
      InputLabelProps={{ shrink: true }}
      InputProps={{
        endAdornment: (
          <IconButton component='label'>
            <FileUploadOutlined />
            <input
              styles={{display:"none"}}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              hidden
              onChange={(e)=>handleUpload(e)}
              name="image"
            />
          </IconButton>
        ),
      }}
    />
    {formik.touched.image && formik.errors.image&&<FormHelperText>{formik.errors.image}</FormHelperText>}
          </FormControl>
          {availableSpaces && 
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
          <TextField
          id='availableSpaces'
          name='availableSpaces'
          label='Número de cupos disponibles'
          variant='filled'
          InputLabelProps={{ shrink: true }}
          value={formik.values.availableSpaces||''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          />
          {formik.touched.availableSpaces && formik.errors.availableSpaces && (
          <FormHelperText error>{formik.errors.availableSpaces}</FormHelperText>
        )}</FormControl>
          }
          {loading&&<CircularProgress color="primary" />}
          <Button disabled={loading || alert} variant='contained' type='submit'>{loading?'Creando..':'Crear'}</Button>

            

        </form>
        
        <NewCategoryModal open={open} handleClose={handleClose}/>

    </Box>
    </Principal>
  )
}

export default CreateServicePage