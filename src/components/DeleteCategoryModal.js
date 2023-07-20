import React, { useEffect, useState } from 'react'
import { deleteCategory, getCategory } from '../services/servicesServices'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { DeleteForeverOutlined } from '@mui/icons-material'
import { red } from '@mui/material/colors'
import { deleteCategoryProduct, getCategoryProduct } from '../services/servicesProducts'

const DeleteCategoryModal = ({open,handleClose,id,deleted}) => {
    const [category,setCategory]=useState({})
    const[result,setResult]=useState('')
    const[loading,setLoading]=useState(false)
    useEffect(()=>{
        const getCategoryById=async()=>{
            const resp= await getCategory(id)
            if(!resp.error){
                setCategory(resp)
            }
        }
        const getCategoryByIdProduct=async()=>{
            const resp= await getCategoryProduct(id)
            if(!resp.error){
                setCategory(resp)
            }
        }
        if(localStorage.getItem('type')==='services'){
            getCategoryById()
        }
        else{
            getCategoryByIdProduct()
        }

    },[id])
    const deleteActualCategory=async()=>{
        setLoading(true)
        let resp
        if(localStorage.getItem('type')==='services'){
                resp= await deleteCategory(id)
        }
        else{
            resp= await deleteCategoryProduct(id)
        }
        
        if(resp.success){
            setLoading(false)
            setResult(`${resp.message}`)
        }
        else{
            setLoading(false)
            setResult(`Ha ocurrido un error ${resp.name}. No se ha eliminado la categoría`)
        }
        deleted()
    }
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{color:red[400], display:'flex', alignItems:'center'}}>
            <DeleteForeverOutlined fontSize='large' sx={{color:red[400]}}/>
            Eliminar Categoría 
        
        </DialogTitle>
        {result===''?
        <DialogContent>
            <Typography variant='h5' >Se eliminará la categoría <strong>{category.name}</strong> y todos los productos asociados a ésta.</Typography>
            <Typography variant='h6'> Esta acción no se puede deshacer</Typography>
            
            

        </DialogContent>:
        <DialogContent>
            <Typography variant='h6'>{result}</Typography>
        </DialogContent>}
        {result===''?
        <DialogActions sx={{justifyContent:'space-around'}}>
            <Button variant='contained' disabled={loading} onClick={deleteActualCategory}>{loading?'Eliminando...':'Eliminar'}</Button>
            <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>:
        <DialogActions>
            <Button variant='contained' onClick={handleClose}>Continuar</Button>
        </DialogActions>}

    </Dialog>
  )
}

export default DeleteCategoryModal