import React, { useState } from 'react'
import Principal from './Principal'
import { Box, FormControl, FormHelperText, TextField, Typography } from '@mui/material'
import AlertComponent from '../components/AlertComponent'
import NewCategoryModal from '../components/NewCategoryModal'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { getCategoriesProduct, newProduct } from '../services/servicesProducts'
import { logOut } from '../services/service'
const CreateProductPage = () => {
    const [categories,setCategories]=useState([])
    const [open,setOpen]=useState(false)
    const [loading,setLoading]=useState(false)
    const[alert,setAlert]=useState(false)
    const [severity,setSeverity]=useState('success')
    const [message,setMessage]=useState('Producto creado exitosamente.')
    const navigate= useNavigate()
    
    const handleClose=()=>{
        setOpen(false)
    }
    const formik= useFormik({
        initialValues: {
            name:"",
            code:"",
            description:"",
            details:"",
            price:0,
            stock:0,
            coin:"",
            categoryId:"",
            businessId:localStorage.getItem('Business')

        },
        
        validationSchema:Yup.object({
            name:Yup.string().required('El servicio necesita un nombre'),
            code:Yup.string(),
            description:Yup.string(),
            details:Yup.string(),
            stock:Yup.number().integer('El stock debe ser positivo').required('El stock es requerido'),
            price:Yup.number().integer('El precio debe ser positivo').required('El precio es requerido'),
            coin:Yup.string().required('Especifique una moneda'),
            categoryId:Yup.string().required('Seleccione la categoría a la que pertenece el servicio')
        }),
        onSubmit:async(values)=>{
            setLoading(true)
            const resp= await newProduct(values)
            if(resp.success){
              setLoading(false)
              setMessage(`Producto ${resp.data.name} creado con éxito`)
              setSeverity('success')
              setAlert(true)
            }
            
              else{

              
              console.log('failed')
              setMessage(`Ha ocurrido un error: ${resp.name}`)
              setSeverity('error')
              setAlert(true)
              setLoading(false)
            }
            
            console.log(resp)
        }

    })
    useEffect(()=>{
        const getBusinessCategories= async()=>{
            
            const resp= await getCategoriesProduct(localStorage.getItem('Business'))
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
         {alert && <AlertComponent open={alert} severity={severity} message={message} handleClose={()=>setAlert(false)} route={'/products/643d4b1b9e19c3e7b5862152'}/>}
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
            id='stock'
            name='stock'
            label='Stock'
            variant='filled'
            InputLabelProps={{ shrink: true }}
            value={formik.values.stock}
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
          {loading&&<CircularProgress color="primary" />}
          <Button disabled={loading} variant='contained' type='submit'>{loading?'Creando..':'Crear'}</Button>

            

        </form>
        
        <NewCategoryModal open={open} handleClose={handleClose}/>

    </Box>
    </Principal>
  )
}

export default CreateProductPage