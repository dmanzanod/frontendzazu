import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { newCategory } from '../services/servicesServices'

import { newCategoryProduct } from '../services/servicesProducts'

const NewCategoryModal = ({open, handleClose,created}) => {
   
    const[result,setResult]=useState('')
    const[loading,setLoading]=useState(false)
    const formik=useFormik({
        initialValues:{
            name:'',
            businessId:localStorage.getItem('Business')
        },
        validationSchema:Yup.object({
            name:Yup.string().required('La categoría necesita un nombre')
        }),
        onSubmit:async(values)=>{
            setLoading(true)
            let resp
            if(localStorage.getItem('type')==='services'){
                resp=await newCategory(values)
            }
            else{
                resp=await newCategoryProduct(values)
            } 
            if(resp.success){
                setLoading(false)
                setResult(`La categoría ${resp.data.name} fue creada correctamente.`)
            }
            else{
                setLoading(false)
                setResult(`Ha ocurrido un error ${resp.error}`)
            }
            created()

        }
    })
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Nueva Categoría
        </DialogTitle>
        {result===''?<DialogContent>
            <form>
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
            </form>

        </DialogContent>:
        <DialogContent>
            <Typography variant='h6'>{result}</Typography>
        </DialogContent>
        }
        {result===''?
            <DialogActions sx={{justifyContent:'space-around'}}>
            <Button variant='contained' disabled={loading} onClick={formik.handleSubmit}>{loading?'Creando...':'Crear'}</Button>
            <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>:
        <DialogActions>
            <Button variant='contained' onClick={handleClose}>Continuar</Button>
        </DialogActions>
        }

    </Dialog>
  )
}

export default NewCategoryModal