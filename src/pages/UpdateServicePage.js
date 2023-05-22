import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategories, getService, updateService } from '../services/servicesServices'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Principal from './Principal'
import AlertComponent from '../components/AlertComponent'
const UpdateServicePage = () => {
    const {id}=useParams()
    const [service,setService]=useState({})
    const [categories,setCategories]=useState([])
    const [loading,setLoading]=useState(false)
    const[alert,setAlert]=useState(false)
    const[message,setMessage]=useState('')
    const [severity,setSeverity]=useState('success')
    const navigate=useNavigate()
    useEffect(()=>{
        const getServiceById=async()=>{
            const resp= await getService(id)
            console.log(resp)
            if(!resp.error){
                setService(resp)
                
            }
            else{
              if(resp.status===403){
                navigate('/login')
              }
            }
        }
        const getBusinessCategories= async()=>{
            
                const resp= await getCategories('643d4b1b9e19c3e7b5862152')
                if(!resp.error){
                    setCategories(resp)
                }
            
        }
        getServiceById()
        getBusinessCategories()
    },[id])

    const formik= useFormik({
        initialValues: {...service},
        enableReinitialize: true,
        validationSchema:Yup.object({
            name:Yup.string().required('El servicio necesita un nombre'),
            code:Yup.string(),
            description:Yup.string(),
            details:Yup.string(),
            price:Yup.number().integer('El precio debe ser positivo').required('El precio es requerido'),
            coin:Yup.string().required('Especifique una moneda'),
            categoryId:Yup.string().required('Seleccione la categoría a la que pertenece el servicio')
        }),
        onSubmit:async(values)=>{
          setLoading(true)
            const resp= await updateService(id,values)

            console.log(resp)
            if(resp.success){
              setLoading(false)
              setSeverity('success')
              setMessage(`El servicio ${resp.data.name} ha sido actualizado con éxito.`)
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
        <Typography variant='h3' color={'primary'} sx={{mb:4}}>Actualizar Servicio</Typography>
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
            value={formik.values.name}
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
          <Button disabled={loading} variant='contained' type='submit'>{loading?'Actualizando...':'Actualizar'}</Button>
              {loading && <CircularProgress color="secondary" />}
            

        </form>

    </Box>
    </Principal>
  )
}

export default UpdateServicePage