import React, { useState } from 'react'
import Principal from './Principal'
import moment from 'moment'
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import 'moment/locale/es'
import { saveSchedule } from '../services/service';
import AlertComponent from '../components/AlertComponent';
const SchedulePage = () => {
    const [startDate,setStartDate]=useState("")
    const [endDate,setEndDate]=useState("")
    const [simultaneous, setSimultaneous]=useState(false)
    const [limit, setLimit]=useState(0)
    const [duration,setDuration]=useState('30')
    const [schedule,setSchedule]=useState({
        lunes:{
            start:null,
            end:null,
        },
        martes:{
            start:null,
            end:null,
        },
        miercoles:{
            start:null,
            end:null,
        },
        jueves:{
            start:null,
            end:null,
        },
        viernes:{
            start:null,
            end:null,
        },
        sabado:{
            start:null,
            end:null,
        },
        domingo:{
            start:null,
            end:null,
        }
    })
    const[loading,setLoading]=useState(false)
  const[alert,setAlert]=useState(false)
  const[message,setMessage]=useState('')
  const [severity,setSeverity]=useState('success')
    const initialState={
        startDate,
        endDate,
        schedule,
        duration,
        simultaneous,
        limit,
        businessId:localStorage.getItem('Business')
    }
    const validationSchema = Yup.object({
        startDate: Yup.date(),
        endDate: Yup.date().when('startDate', (startDate, schema) =>
          startDate && schema.min(startDate, 'La fecha fin debe ser mayor a la fecha de inicio.')
        ),
        schedule: Yup.object().shape(
          {
            lunes: Yup.object().shape({
              start: Yup.date(),
              end: Yup.date().when('start', (start, schema) =>
                start && schema.min(start, 'La hora de cierre debe ser mayor a la hora de apertura')
              ),
            }),
            martes: Yup.object().shape({
              start: Yup.date(),
              end: Yup.date().when('start', (start, schema) =>
                start && schema.min(start, 'La hora de cierre debe ser mayor a la hora de apertura')
              ),
            }),
            miercoles: Yup.object().shape({
              start: Yup.date(),
              end: Yup.date().when('start', (start, schema) =>
                start && schema.min(start, 'La hora de cierre debe ser mayor a la hora de apertura')
              ),
            }),
            jueves: Yup.object().shape({
              start: Yup.date(),
              end: Yup.date().when('start', (start, schema) =>
                start && schema.min(start, 'La hora de cierre debe ser mayor a la hora de apertura')
              ),
            }),
            viernes: Yup.object().shape({
              start: Yup.date(),
              end: Yup.date().when('start', (start, schema) =>
                start && schema.min(start, 'La hora de cierre debe ser mayor a la hora de apertura')
              ),
            }),
            sabado: Yup.object().shape({
              start: Yup.date(),
              end: Yup.date().when('start', (start, schema) =>
                start && schema.min(start, 'La hora de cierre debe ser mayor a la hora de apertura')
              ),
            }),
           domingo: Yup.object().shape({
              start: Yup.date(),
              end: Yup.date().when('start', (start, schema) =>
                start && schema.min(start, 'La hora de cierre debe ser mayor a la hora de apertura')
              ),
            }),
            
          }
        ),
        limit: Yup.number().integer('El número de citas debe ser mayor a 0').min(1, 'El número de citas debe ser mayor a 0'),
      });
      
      // Rest of the component remains the same...
      
      const formik = useFormik({
        initialValues: initialState,
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const resp=await saveSchedule(values)
            if(resp.success===true){
              setLoading(false)
              setSeverity('success')
              setMessage('Los datos fueron guardados correctamente.')
              setAlert(true)
            }
            else{
              setLoading(false)
              setSeverity('error')
              setMessage(`Ha ocurrido un Error: ${resp.error}. Inténtelo nuevamente`)
              setAlert(true)
      
            }
          },
        
      });
    const checkSimultaneous=(event)=>{
        setSimultaneous(event.target.checked)
        formik.setFieldValue('simultaneous',event.target.checked)
    }
    const changeStartDate=(value)=>{
        
        setStartDate(value._i)
        formik.setFieldValue('startDate',value._i)
    }
    const handleTimeChange = (day, timeType, value) => {
        console.log(value._d)
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [day]: {
              ...prevSchedule[day],
              [timeType]: value._d,
            },
          }));
        
        const date=new Date(value._d)
        formik.setFieldValue(`schedule.${day}.${timeType}`, date);
       // 
    };
    const changeEndDate=(value)=>{
        
        setEndDate(value._i)
        formik.setFieldValue('endDate',value._i)
    }
    const handleChangeSelect=(e)=>{
        setDuration(e.target.value)
    }
    
  return (
    <Principal>
         <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='es'>
        <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "78px",
          marginBottom: "84px",
          paddingBlock: "12px",
          flexDirection: "column",
          alignItems: "center",
          flexGrow:1
        }}
      >
        <Typography variant='h3' color={'primary'}>Agenda</Typography>
        <AlertComponent open={alert} severity={severity} message={message} handleClose={()=>setAlert(false) } route={'/'}/>
        <Box sx={{
            display:'flex', 
            flexDirection:{xs:'column',sm:'row'},
            justifyContent:'space-between',
            alignContent:'center',
            width:{sm:'80%',lg:'60%'},
            paddingInline:'12px',
            marginBottom:'24px',
            marginTop:'20px'
        }}>
            
        <FormControl>
          <FormLabel>Fecha de inicio</FormLabel>
            <DatePicker name='startDate' defaultValue={moment(new Date())} onChange={(value)=>changeStartDate(value)}/>
            {formik.errors.startDate && <FormHelperText>{formik.errors.startDate}</FormHelperText>}
        </FormControl>
        <FormControl>
            <FormLabel>Fecha final</FormLabel>
            <DatePicker name='endDate' defaultValue={moment(new Date())} onChange={(value)=>changeEndDate(value)}/>
            {formik.touched.endDate && formik.errors.endDate && <FormHelperText>{formik.errors.endDate}</FormHelperText>}
        </FormControl>
        </Box>
        <Box sx={{
            display:'flex', 
            flexDirection:{xs:'column',sm:'row'},
            justifyContent:'space-between',
            alignContent:'center',
            width:{sm:'80%',lg:'60%'},
            paddingInline:'12px',
            marginBottom:'24px',
            marginTop:'20px'
        }}>
        <FormLabel>Lunes</FormLabel>
        <FormControl>
            <FormLabel>Hora de inicio</FormLabel>
            <TimePicker 
            name='schedule.lunes.start'
            onChange={(value) => handleTimeChange('lunes', 'start', value)}></TimePicker>
        </FormControl>
        <FormControl>
            <FormLabel>Hora de cierre</FormLabel>
            <TimePicker
             name='schedule.lunes.end'
            onChange={(value) => handleTimeChange('lunes', 'end', value)}
            ></TimePicker>
        </FormControl>
        </Box>
        <Box sx={{
            display:'flex', 
            flexDirection:{xs:'column',sm:'row'},
            justifyContent:'space-between',
            alignContent:'center',
            width:{sm:'80%',lg:'60%'},
            paddingInline:'12px',
            marginBottom:'24px',
            marginTop:'20px'
        }}>
        <FormLabel>Martes</FormLabel>
        <FormControl>
            <FormLabel>Hora de inicio</FormLabel>
            <TimePicker
             name='schedule.martes.start'
            onChange={(value) => handleTimeChange('martes', 'start', value)}></TimePicker>
        </FormControl>
        <FormControl>
            <FormLabel>Hora de cierre</FormLabel>
            <TimePicker
             name='schedule.martes.end'
            onChange={(value) => handleTimeChange('martes', 'end', value)}></TimePicker>
        </FormControl>
        </Box>
        <Box sx={{
            display:'flex', 
            flexDirection:{xs:'column',sm:'row'},
            justifyContent:'space-between',
            alignContent:'center',
            width:{sm:'80%',lg:'60%'},
            paddingInline:'12px',
            marginBottom:'24px',
            marginTop:'20px'
        }}>
        <FormLabel>Miércoles</FormLabel>
        <FormControl>
            <FormLabel>Hora de inicio</FormLabel>
            <TimePicker 
             name='schedule.miercoles.start'
            onChange={(value) => handleTimeChange('miercoles', 'start', value)}></TimePicker>
        </FormControl>
        <FormControl>
            <FormLabel>Hora de cierre</FormLabel>
            <TimePicker
             name='schedule.miercoles.end'
            onChange={(value) => handleTimeChange('miercoles', 'end', value)}></TimePicker>
        </FormControl>
        </Box>
        <Box sx={{
            display:'flex', 
            flexDirection:{xs:'column',sm:'row'},
            justifyContent:'space-between',
            alignContent:'center',
            width:{sm:'80%',lg:'60%'},
            paddingInline:'12px',
            marginBottom:'24px',
            marginTop:'20px'
        }}>
        <FormLabel>Jueves</FormLabel>
        <FormControl>
            <FormLabel>Hora de inicio</FormLabel>
            <TimePicker 
             name='schedule.jueves.start'
            onChange={(value) => handleTimeChange('jueves', 'start', value)}></TimePicker>
        </FormControl>
        <FormControl>
            <FormLabel>Hora de cierre</FormLabel>
            <TimePicker
             name='schedule.jueves.end'
            onChange={(value) => handleTimeChange('miercoles', 'end', value)}></TimePicker>
        </FormControl>
        </Box>
        <Box sx={{
            display:'flex', 
            flexDirection:{xs:'column',sm:'row'},
            justifyContent:'space-between',
            alignContent:'center',
            width:{sm:'80%',lg:'60%'},
            paddingInline:'12px',
            marginBottom:'24px',
            marginTop:'20px'
        }}>
        <FormLabel>Viernes</FormLabel>
        <FormControl>
            <FormLabel>Hora de inicio</FormLabel>
            <TimePicker
             name='schedule.viernes.start'
            onChange={(value) => handleTimeChange('viernes', 'start', value)}></TimePicker>
        </FormControl>
        <FormControl>
            <FormLabel>Hora de cierre</FormLabel>
            <TimePicker
             name='schedule.viernes.end'
            onChange={(value) => handleTimeChange('viernes', 'end', value)}></TimePicker>
        </FormControl>
        </Box>
        <Box sx={{
            display:'flex', 
            flexDirection:{xs:'column',sm:'row'},
            justifyContent:'space-between',
            alignContent:'center',
            width:{sm:'80%',lg:'60%'},
            paddingInline:'12px',
            marginBottom:'24px',
            marginTop:'20px'
        }}>
        <FormLabel>Sábado</FormLabel>
        <FormControl>
            <FormLabel>Hora de inicio</FormLabel>
            <TimePicker 
             name='schedule.sabado.start'
            onChange={(value) => handleTimeChange('sabado', 'start', value)}></TimePicker>
        </FormControl>
        <FormControl>
            <FormLabel>Hora de cierre</FormLabel>
            <TimePicker 
             name='schedule.sabado.end'
            onChange={(value) => handleTimeChange('sabado', 'end', value)}></TimePicker>
        </FormControl>
        </Box>
        <Box sx={{
            display:'flex', 
            flexDirection:{xs:'column',sm:'row'},
            justifyContent:'space-between',
            alignContent:'center',
            width:{sm:'80%',lg:'60%'},
            paddingInline:'12px',
            marginBottom:'24px',
            marginTop:'20px'
        }}>
        <FormLabel>Domingo</FormLabel>
        <FormControl>
            <FormLabel>Hora de inicio</FormLabel>
            <TimePicker 
             name='schedule.domingo.start'
            onChange={(value) => handleTimeChange('domingo', 'start', value)}></TimePicker>
        </FormControl>
        <FormControl>
            <FormLabel>Hora de cierre</FormLabel>
            <TimePicker 
             name='schedule.domingo.end'
            onChange={(value) => handleTimeChange('domingo', 'end', value)}></TimePicker>
        </FormControl>
        </Box>
        <Box sx={{display:'flex',
    flexDirection:'column',
    width:{sm:'80%',lg:'60%'},
    gap:'16px',
    alignItems:'flex-start'}}>

        
        <FormControl>
            <FormLabel>Duración de cada cita</FormLabel>
            <Select
            value={duration}
            onChange={(e)=>handleChangeSelect(e)}
            >
                <MenuItem value={30}>30 minutos</MenuItem>
                <MenuItem value={45}>45 minutos</MenuItem>
                <MenuItem value={60}>1 hora</MenuItem>
                <MenuItem value={90}>1.5 horas</MenuItem>
            </Select>
        </FormControl>
        <FormControlLabel  control={<Checkbox onChange={(event)=> checkSimultaneous(event)}/>} label="Habilitar citas simultáneas" />
        {simultaneous && <FormControl>
            <FormLabel>Citas disponibles simultáneas</FormLabel>
        
        <TextField
          id="outlined-number"
          onChange={(e)=>formik.setFieldValue('limit',e.target.value)}
          type="number"
          name='limit'
        />
        </FormControl>}
        </Box>
        <Button disabled={loading || alert} onClick={(e)=>formik.handleSubmit(e)} variant='contained'>{loading?'Guardando':'Guardar'}</Button>
      </Box>
      </LocalizationProvider>
    </Principal>
  )
}

export default SchedulePage