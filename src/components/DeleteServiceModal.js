import React, { useEffect, useState } from 'react'
import { deleteService, getService } from '../services/servicesServices'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { DeleteForeverOutlined } from '@mui/icons-material'
import { red } from '@mui/material/colors'
import { deleteProduct, getProduct } from '../services/servicesProducts'

const DeleteServiceModal = ({open,handleClose,id,deleted}) => {
    const [service,setService]=useState({})
    const [loading,setLoading]=useState(false)
    const [result,setResult]=useState(false)
    const [response,setResponse]=useState('')
    useEffect(()=>{
        const getServiceById=async()=>{
            const resp= await getService(id)
            if(!resp.error){
                setService(resp)
            }
        }
        const getProductById=async()=>{
            const resp= await getProduct(id)
            if(!resp.error){
                setService(resp)
            }
        }
        if(localStorage.getItem('type')==='services'){
            getServiceById()
        }
        else{
            getProductById()
        }
        

    },[id])
    const deleteServiceById=async()=>{
        setLoading(true)
        let resp
        if(localStorage.getItem('type')==='services'){
            resp= await deleteService(id)
        }
        else{
            resp= await deleteProduct(id)
        }
        
        console.log(resp)
        if(resp.success){
            setLoading(false)
            deleted()
            setResult(true)
            setResponse(resp.message)

        }
        else{
            setResult(true)
            setLoading(false)
            setResponse(`Ha ocurrido un error ${resp.name}. No se ha eliminado el servicio.`)
        }
    }
    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{color:red[400], display:'flex', alignItems:'center'}}>
            <DeleteForeverOutlined fontSize='large' sx={{color:red[400]}}/>
            <Typography variant='h4'>Eliminar Servicio </Typography>
        
        </DialogTitle>
        {!result?<DialogContent>
            <Typography variant='h5' >Se eliminará el servicio <strong>{service.name}</strong>.</Typography>
            <Typography variant='h6'> Esta acción no se puede deshacer</Typography>
            
            

        </DialogContent>:
        <DialogContent>
            <Typography variant='h6'>{response}</Typography>
        </DialogContent>
        }
        { result?
        <DialogActions>
            <Button variant='contained' onClick={handleClose}>Continuar</Button>
        </DialogActions>:
        <DialogActions sx={{justifyContent:'space-around'}}>
            <Button variant='contained' disabled={loading} onClick={deleteServiceById}>{loading?'Eliminando...':'Eliminar'}</Button>
            <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>}

    </Dialog>
  )
}

export default DeleteServiceModal