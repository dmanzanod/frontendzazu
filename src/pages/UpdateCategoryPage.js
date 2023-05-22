import React, { useEffect, useState } from 'react'
import Principal from './Principal'
import { Box, Button, FormHelperText, InputLabel, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getCategory } from '../services/servicesServices'
import { useFormik } from 'formik'
import * as Yup from 'yup'
const UpdateCategoryPage = () => {
    const {id}= useParams()
    const [category,setCategory]=useState({})
    useEffect(()=>{
        const getCategoryById=async()=>{
            const resp= await getCategory(id)
            if(!resp.error){
                setCategory(resp)
            }
        }
        getCategoryById()

    },[id])
    const formik=useFormik({
        initialValues:category,
        validationSchema: Yup.object().shape({
            name:Yup.string().required('El nombre es requerido.')
        }),
        onSubmit:async(values)=>{
            console.log(values)
        }
    })
  return (
    <Principal>
        <Box>
            <form>
                <InputLabel htmlFor='name'>
                </InputLabel>
                <TextField
                id='name'
                name='name'
                variant='filled'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

                />
                {formik.touched.name && formik.errors.name && (<FormHelperText error>{formik.errors.name}</FormHelperText>)}

               <Button type='submit' variant='filled'>Actualizar</Button>

            </form>



        </Box>
    </Principal>
  )
}

export default UpdateCategoryPage