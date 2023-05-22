import { Alert, AlertTitle, Button, Collapse, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlertComponent = ({open,severity,message, handleClose, route}) => {
  const navigate=useNavigate()
  const handleContinue=()=>{
    if(route && severity==='success'){
        navigate(route)
    }
    else{
        handleClose()
    }
    
  }
    return (
        <Stack sx={{ width: {xs:'100%',lg:'60%'} }} spacing={2}>
    <Collapse in={open}>
        <Alert
        severity={severity}
          action={
            <Button
              aria-label="continue"
              color="inherit"
              size="small"
                onClick={handleContinue}
            >
              Continuar
            </Button>
          }
          sx={{ mb: 2 }}
        >
         <AlertTitle>{severity==='error'?'Error':'Éxito'}</AlertTitle>
         {message}
        </Alert>
      </Collapse>
      </Stack>
  )
}

export default AlertComponent