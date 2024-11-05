  import React, { useState,useEffect } from 'react'
  import Principal from './Principal'
  import moment from 'moment'
  import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Select, TextField, Typography,IconButton } from '@mui/material'
  import ClearIcon from '@mui/icons-material/Clear';
  import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
  import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
  import {useFormik} from 'formik'
  import * as Yup from 'yup'
  import 'moment/locale/es'
  import { saveSchedule,updateSimpleSchedule, getSimpleScheduleByBussinesId } from '../services/service';
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
    const [initialValues, setInitialValues] = useState({
      startDate,
      endDate,
      schedule,
      duration,
      simultaneous,
      limit,
      businessId: localStorage.getItem('Business'),
    });
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
          initialValues,
          // validationSchema: validationSchema,
          onSubmit: async (values) => {
              console.log("Data being sent to the backend:", values);
              setLoading(true)
              const scheduleId = localStorage.getItem('ScheduleId');
              console.log(`Estoy mostrando el scheduleID ${scheduleId}`)
              const resp = await (scheduleId?updateSimpleSchedule(scheduleId,values):saveSchedule(values))
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
          const isSimultaneus = event.target.checked;
          setSimultaneous(event.target.checked)
          formik.setFieldValue('simultaneous',event.target.checked)
          if(!isSimultaneus){
            setLimit(0);
            formik.setFieldValue('limit',0)
          }
      }
      
      const changeStartDate=(value)=>{
          
          setStartDate(value._i)
          formik.setFieldValue('startDate',value._i)
      }
      // const handleTimeChange = (day, timeType, value) => {
      //     console.log(value._d)
      //     setSchedule((prevSchedule) => ({
      //         ...prevSchedule,
      //         [day]: {
      //           ...prevSchedule[day],
      //           [timeType]: value._d,
      //         },
      //       }));
          
      //     const date=new Date(value._d)
      //     formik.setFieldValue(`schedule.${day}.${timeType}`, date);
      //    // 
      // };
      const handleTimeChange = (day, timeType, value) => {
        // Extract the hour and minute components from the selected time
        const hour = value._d.getHours();
        const minute = value._d.getMinutes();
      
        // Format the time as "HH:mm"
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
        setSchedule((prevSchedule) => ({
          ...prevSchedule,
          [day]: {
            ...prevSchedule[day],
            [timeType]: formattedTime, // Store the formatted time
          },
        }));
      
        // Update the corresponding field in the Formik form state with the formatted time
        formik.setFieldValue(`schedule.${day}.${timeType}`, formattedTime);
      };
      const handleClearTime = (day, timeType) => {
        setSchedule((prevSchedule) => ({
          ...prevSchedule,
          [day]: {
            ...prevSchedule[day],
            [timeType]: null,
          },
        }));
        formik.setFieldValue(`schedule.${day}.${timeType}`, null);
      };
      const changeEndDate=(value)=>{
          
          setEndDate(value._i)
          formik.setFieldValue('endDate',value._i)
      }
      const handleChangeSelect = (e) => {
        const selectedValue = e.target.value;
        setDuration(selectedValue); // Update the duration state
        formik.setFieldValue('duration', selectedValue); // Update Formik's duration value
      };
      useEffect(() => {
        const fetchData = async () => {
          // Make your API request to get the schedule data here, e.g., using getSimpleScheduleByBussinesId
          const businessId = localStorage.getItem('Business');
          // Assuming you have fetched the data successfully
          const response = await getSimpleScheduleByBussinesId(businessId);
          console.log(`Response fetched == ${JSON.stringify(response.scheduleData.schedule)}`);
          if (response.success && response.scheduleData) {
            // Use the schedule data from the API response
            const parsedInterval = parseInt(response.scheduleData.duration)
            setSchedule(response.scheduleData.schedule);
            setDuration(parsedInterval)
            setLimit(response.scheduleData.limit)
            console.log(`LIMITE ${response.scheduleData.limit}`)
            if(response.scheduleData.limit > 0){
              setSimultaneous(true);
            }
            formik.setValues({
              ...formik.values,
              schedule: response.scheduleData.schedule,
              duration: parsedInterval,
              limit:response.scheduleData.limit
            });
            console.log(`INITIAL VALUEs despues de cargar la API :: ${JSON.stringify(initialValues)}`)
            console.log(`Se seteo schedule`);
          }
        };
      
        fetchData(); // Call the fetchData function when the component mounts
      }, []);
      


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
              
          {/* <FormControl>
            <FormLabel>Fecha de inicio</FormLabel>
              <DatePicker name='startDate' defaultValue={moment(new Date())} onChange={(value)=>changeStartDate(value)}/>
              {formik.errors.startDate && <FormHelperText>{formik.errors.startDate}</FormHelperText>}
          </FormControl>
          <FormControl>
              <FormLabel>Fecha final</FormLabel>
              <DatePicker name='endDate' defaultValue={moment(new Date())} onChange={(value)=>changeEndDate(value)}/>
              {formik.touched.endDate && formik.errors.endDate && <FormHelperText>{formik.errors.endDate}</FormHelperText>}
          </FormControl> */}
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
               name='schedule.lunes.start'
               value={schedule.lunes.start ? moment(schedule.lunes.start, 'HH:mm') : null}
                onChange={(value) => handleTimeChange('lunes', 'start', value)}
             />
             {schedule.lunes.start && (
               <IconButton
                 onClick={() => handleClearTime('lunes', 'start')}
                 color='primary'
                 size='small'
                 style={{ marginLeft: '8px' }}
               >
                 <ClearIcon />
               </IconButton>
              )}
           </div>
          </FormControl>

          <FormControl>
              <FormLabel>Hora de cierre</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.lunes.end'
              value={schedule.lunes.end ? moment(schedule.lunes.end, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('lunes', 'end', value)}
              />{schedule.lunes.end && (
                <IconButton
                  onClick={() => handleClearTime('lunes', 'end')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.martes.start'
              value={schedule.martes.start ? moment(schedule.martes.start, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('martes', 'start', value)}
              />{schedule.martes.start && (
                <IconButton
                  onClick={() => handleClearTime('martes', 'start')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
          </FormControl>
          <FormControl>
              <FormLabel>Hora de cierre</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.martes.end'
              value={schedule.martes.end ? moment(schedule.martes.end, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('martes', 'end', value)}
              />{schedule.martes.end && (
                <IconButton
                  onClick={() => handleClearTime('martes', 'end')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.miercoles.start'
              value={schedule.miercoles.start ? moment(schedule.miercoles.start, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('miercoles', 'start', value)}
              />{schedule.miercoles.start && (
                <IconButton
                  onClick={() => handleClearTime('miercoles', 'start')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
          </FormControl>
          <FormControl>
              <FormLabel>Hora de cierre</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.miercoles.end'
              value={schedule.miercoles.end ? moment(schedule.miercoles.end, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('miercoles', 'end', value)}
              />{schedule.miercoles.end && (
                <IconButton
                  onClick={() => handleClearTime('miercoles', 'end')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.jueves.start'
              value={schedule.jueves.start ? moment(schedule.jueves.start, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('jueves', 'start', value)}
              />{schedule.jueves.start && (
                <IconButton
                  onClick={() => handleClearTime('jueves', 'start')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
          </FormControl>
          <FormControl>
              <FormLabel>Hora de cierre</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.jueves.end'
              value={schedule.jueves.end ? moment(schedule.jueves.end, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('jueves', 'end', value)}
              />{schedule.jueves.end && (
                <IconButton
                  onClick={() => handleClearTime('jueves', 'end')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.viernes.start'
              value={schedule.viernes.start ? moment(schedule.viernes.start, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('viernes', 'start', value)}
              />{schedule.viernes.start && (
                <IconButton
                  onClick={() => handleClearTime('viernes', 'start')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
          </FormControl>
          <FormControl>
              <FormLabel>Hora de cierre</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.viernes.end'
              value={schedule.viernes.end ? moment(schedule.viernes.end, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('viernes', 'end', value)}
              />{schedule.viernes.end && (
                <IconButton
                  onClick={() => handleClearTime('viernes', 'end')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.sabado.start'
              value={schedule.sabado.start ? moment(schedule.sabado.start, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('sabado', 'start', value)}
              />{schedule.sabado.start && (
                <IconButton
                  onClick={() => handleClearTime('sabado', 'start')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
          </FormControl>
          <FormControl>
              <FormLabel>Hora de cierre</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.sabado.end'
              value={schedule.sabado.end ? moment(schedule.sabado.end, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('sabado', 'end', value)}
              />{schedule.sabado.end && (
                <IconButton
                  onClick={() => handleClearTime('sabado', 'end')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.domingo.start'
              value={schedule.domingo.start ? moment(schedule.domingo.start, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('domingo', 'start', value)}
              />{schedule.domingo.start && (
                <IconButton
                  onClick={() => handleClearTime('domingo', 'start')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
          </FormControl>
          <FormControl>
              <FormLabel>Hora de cierre</FormLabel>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TimePicker
              name='schedule.domingo.end'
              value={schedule.domingo.end ? moment(schedule.domingo.end, 'HH:mm') : null}
              onChange={(value) => handleTimeChange('domingo', 'end', value)}
              />{schedule.domingo.end && (
                <IconButton
                  onClick={() => handleClearTime('domingo', 'end')}
                  color='primary'
                  size='small'
                  style={{ marginLeft: '8px' }}
                >
                  <ClearIcon />
                </IconButton>
               )}
              </div>
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
          <FormControlLabel  control={<Checkbox  checked = {simultaneous} onChange={(event)=> checkSimultaneous(event)}/>} label="Habilitar citas simultáneas" />
          {simultaneous && <FormControl>
              <FormLabel>Citas disponibles simultáneas</FormLabel>
          
          <TextField
            id="outlined-number"
            onChange={(e)=>formik.setFieldValue('limit',e.target.value)}
            type="number"
            name='limit'
            defaultValue={limit}
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