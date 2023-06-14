import React, { useEffect, useState } from 'react'
import { logOut } from '../services/service'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getCategoriesProduct, getProduct, updateProduct } from '../services/servicesProducts'
import Principal from './Principal'
import { Box, Button, CircularProgress, FormControl, FormHelperText, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import AlertComponent from '../components/AlertComponent'
import { FileUploadOutlined } from '@mui/icons-material'
const ProductUpdatePage = () => {
    const {id}=useParams()
    const [product,setProduct]=useState({})
    const [categories,setCategories]=useState([])
    const [loading,setLoading]=useState(false)
    const[alert,setAlert]=useState(false)
    const[message,setMessage]=useState('')
    const [image,setImage]=useState(null)
    const [previewImage, setPreviewImage] = useState(null);
    const [severity,setSeverity]=useState('success')
    const navigate=useNavigate()
    useEffect(()=>{
        const getProductById=async()=>{
            const resp= await getProduct(id)
            
            
            if(!resp.error){
                setProduct(resp)
                
            }
            else{
              if(resp.status===403){
                logOut()
                navigate('/login')
              }
            }
        }
        const getBusinessCategories= async()=>{
            
                const resp= await getCategoriesProduct(localStorage.getItem('Business'))
                if(!resp.error){
                    setCategories(resp)
                }
            
        }
        getProductById()
        getBusinessCategories()
    },[id])
    const  handleUpload=(event)=>{
      formik.setFieldValue('image',event.target.files[0])
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    }
    const formik= useFormik({
        initialValues: {...product},
        enableReinitialize: true,
        validationSchema:Yup.object({
            name:Yup.string().required('El servicio necesita un nombre'),
            code:Yup.string(),
            description:Yup.string(),
            details:Yup.string(),
            stock:Yup.number().integer('El stock debe ser positivo').required('El stock es requerido'),
            price:Yup.number().integer('El precio debe ser positivo').required('El precio es requerido'),
            coin:Yup.string().required('Especifique una moneda'),
            image: Yup.mixed()
  .test("type", "Solo puede subir una imagen", function (value) {
     if(value=='undefined' || value){
       return value && (value.type === "image/jpg" || value.type === "image/jpeg" || value.type === "image/png");
     }
     else{
        return true
     }
  }),
            categoryId:Yup.string().required('Seleccione la categoría a la que pertenece el servicio')
        }),
        onSubmit:async(values)=>{
          setLoading(true)
            const resp= await updateProduct(id,values)

           
            if(resp.success){
              setLoading(false)
              setSeverity('success')
              setMessage(`El producto ${resp.data.name} ha sido actualizado con éxito.`)
              setAlert(true)
              //alert
            }
            else{
              setLoading(false)
              setSeverity('error')
              setMessage(`Ha ocurrido un error ${resp.error}. Inténtelo nuevamente.`)
              setAlert(true)
              
            }
        }

    })
  return (
    <Principal>
    <Box sx={{display:'flex', width:'100%', marginTop:'78px', marginBottom:'84px', paddingBlock:'12px',flexDirection:'column', alignItems:'center'}}>
        <Typography variant='h3' color={'primary'} sx={{mb:4}}>Actualizar Producto</Typography>
        <AlertComponent open={alert} message={message} handleClose={()=>setAlert(false)} severity={severity} route={'/products/643d4b1b9e19c3e7b5862152'}/>
        <form className='form__update' onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField 
            id='name'
            name='name'
            label='Nombre'
            variant='filled'
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formik.values.name||''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.touched.name && formik.errors.name && (
            <FormHelperText error>{formik.errors.name}</FormHelperText>
          )}
          </FormControl>
          {formik.values.categoryId &&<FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField 
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
            value={formik.values.code||''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.code && formik.errors.code && (
            <FormHelperText error>{formik.errors.code}</FormHelperText>
          )}</FormControl>
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField
            id='stock'
            name='stock'
            label='Stock'
            variant='filled'
            InputLabelProps={{ shrink: true }}
            value={formik.values.stock||''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.stock && formik.errors.stock && (
            <FormHelperText error>{formik.errors.stock}</FormHelperText>
          )}</FormControl>
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField
            id='price'
            name='price'
            label='Precio'
            variant='filled'
            InputLabelProps={{ shrink: true }}
            value={formik.values.price||''}
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
            value={formik.values.coin||''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            {formik.touched.coin && formik.errors.coin && (
            <FormHelperText error>{formik.errors.coin}</FormHelperText>
          )}
          </FormControl>
          <FormControl sx={{display:'flex',flexDirection:{xs:'column',lg:'row'}, gap:'12px', width:{xs:'100%', sm:'60%', lg:'50%'}}}>
          {product.image && !image &&
          <Box sx={{width:{xs:'100%',lg:'50%'},alignSelf:'flex-end'}}>
            <img className='image__product' src={`${process.env.REACT_APP_BASE_URL_IMAGES}${product.image.replace('\\','/')}`} alt='prodImage'/>
          </Box>}
          {image&&
          <Box sx={{width:{xs:'100%',lg:'50%'},alignSelf:'flex-end'}}>
            <img className='image__product' src={previewImage} alt='prodImage'/>
          </Box>}
          <TextField
          sx={{alignSelf:{xs:'flex-start',lg:'flex-end'}, width:{xs:'100%',lg:'50%'}}}
      variant="filled"
      value={image?.name || product.image?.split('\\')[1] || ''}          
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
          <FormControl sx={{ width:{xs:'100%', sm:'60%', lg:'50%'}}}>
            
            <TextField id='description'
            name='description'
            variant='filled'
            label='Descripción'
            multiline
            InputLabelProps={{ shrink: true }}
            maxRows={4}
            value={formik.values.description||''}
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
            value={formik.values.details||''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            
            {formik.touched.details && formik.errors.details && (
            <FormHelperText error>{formik.errors.details}</FormHelperText>
          )}
          </FormControl>
          <Button disabled={loading} variant='contained' type='submit'>{loading?'Actualizando...':'Actualizar'}</Button>
              {loading && <CircularProgress color="secondary" />}
            

        </form>

    </Box>
    </Principal>
  )
}

export default ProductUpdatePage