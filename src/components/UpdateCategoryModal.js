import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getCategory, updateCategory } from '../services/servicesServices'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, TextField } from '@mui/material'
import AlertComponent from './AlertComponent'
import { getCategoryProduct } from '../services/servicesProducts'
const UpdateCategoryModal = ({id,open,handleClose, updated}) => {
   
    const [category,setCategory]=useState({})
    const[loading,setLoading]=useState(false)
    const[result,setResult]=useState('')
    const[severity,setSeverity]=useState('success')
    const[alert,setAlert]=useState(false)
    useEffect(()=>{
        const getCategoryById=async()=>{
            const resp= await getCategory(id)
            
            if(!resp.error){
                setCategory(resp)
            }
        }
        const getCategoryProductById=async()=>{
            const resp= await getCategoryProduct(id)
            
            if(!resp.error){
                setCategory(resp)
            }
        }
        if(localStorage.getItem('type')==='services'){
            getCategoryById()
        }
        else{
            getCategoryProductById()
        }
        

    },[id])
    const formik=useFormik({
        initialValues:{...category},
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            name:Yup.string().required('El nombre es requerido.')
        }),
        onSubmit:async(values)=>{
            setLoading(true)
            const resp= await updateCategory(id,values)
            
            if(!resp.error){
                setLoading(false)
                setSeverity('success')
                setResult(`La categoría ${resp.name} fue actualizada correctamente.`)
                setAlert(true)

            }
            else{
                setLoading(false)
                setSeverity('error')
                setResult(`Ha ocurrido un error: ${resp.error}`)
                setAlert(true)
            }
            updated()
        }
    })
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Actualizar Categoría
        </DialogTitle>
        <DialogContent>
            <AlertComponent open={alert} message={result} severity={severity} handleClose={()=>setAlert(false)}/>
            <form onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width:'100%'}}>
            
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

        <DialogActions sx={{justifyContent:'space-around'}}>
            <Button variant='contained' type='submit' disabled={loading}>{loading?'Actualizando...':'Actualizar'}</Button>
            <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
        </form>
</DialogContent>
    </Dialog>
  )
}

export default UpdateCategoryModal