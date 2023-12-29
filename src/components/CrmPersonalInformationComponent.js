import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Select,
  MenuItem,
  Typography,
  TextField,
  Button
} from "@mui/material";

const CrmPersonalInformationComponent = ({ contacts }) => {
    const [groupedContacts, setGroupedContacts] = useState({});
    const [selectedFlow, setSelectedFlow] = useState("");
    const [message, setMessage] = useState("");
    const uniqueFlows = Array.from(new Set(contacts.map((contact) => contact.lastFlow)));
    useEffect(() => {
      const groupContactsByFlow = () => {
        const grouped = {};
        contacts.forEach((contact) => {
          if (!grouped[contact.lastFlow]) {
            grouped[contact.lastFlow] = [];
          }
          grouped[contact.lastFlow].push(contact);
        });
        return grouped;
      };
  
      const sortedContacts = Object.entries(groupContactsByFlow()).sort(
        ([, a], [, b]) => b.length - a.length
      );
      setGroupedContacts(Object.fromEntries(sortedContacts));
    }, [contacts]);
  
    const getFlowText = (flow) => {
      if (flow === 'scheduleFlow') {
        return 'Horarios';
      }
      if (flow === 'pricesFlow') {
        return 'Compra';
      }
      if (flow === 'mainFlow') {
        return 'Inicio conversacion';
      }
      if (flow === 'BuyFlow') {
        return 'Compras o Reservas';
      }
      if (flow === 'morningSelectionFlow') {
        return 'Seleccionando horarios';
      }
      if (flow === 'botSelectionFlow') {
        return 'Inicio conversacion';
      }
      if (flow === 'directContactFlow') {
        return 'Contacto con asesor';
      }
      if (flow === 'preciosMensualidad') {
        return 'Precio de la mensualidad';
      }
      if (flow === 'cursoHorario') {
        return 'Cursos y horarios';
      }
      // Add other conditions if needed for different flows
      return flow; // Return the flow itself if no specific condition matches
    };
  
    const filterContactsByFlow = (flow) => {
      setSelectedFlow(flow);
    };
  
    const getFlowInsideCell = (flow) => {
      if (flow === 'scheduleFlow') {
        return 'Registrando horario';
      }
      // Add other conditions if needed for different flows
      return flow; // Return the flow itself if no specific condition matches
    };
    
    const sendMessage = () => {
      // Here you can use the 'message' state variable to send the message to the endpoint
      // Use it as needed, for example, send an API request with the 'message' content
      console.log("Sending message:", message);
      // You can add your API call logic here
    };

    return (
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <div style={{ padding: '40px 10px 20px', textAlign: 'center' }}>
        <Typography variant="h4" style={{ fontFamily: 'Ruby', fontSize: '2em', paddingTop: '20px' }}> {/* Added paddingTop */}
      Lista de contactos
    </Typography>
  
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Typography variant="subtitle1" style={{ marginRight: '10px' }}>
          Filter:
        </Typography>
        <Select value={selectedFlow} onChange={(e) => filterContactsByFlow(e.target.value)}>
          <MenuItem value=''>Mostrar todo</MenuItem>
          {uniqueFlows.map((flow) => (
            <MenuItem key={flow} value={flow}>
              {getFlowText(flow)}
            </MenuItem>
          ))}
        </Select>
      </div>
  
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'nowrap',
              justifyContent: 'flex-start',
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            {Object.entries(groupedContacts).map(([flow, contactsForFlow]) => (
              <div
                key={flow}
                style={{
                  flex: '0 0 450px',
                  marginBottom: '20px',
                  maxWidth: '450px',
                  display: selectedFlow === flow || selectedFlow === '' ? 'block' : 'none',
                }}
              >
                <Typography variant="h6" style={{ marginTop: '20px' }}>{getFlowText(flow)}</Typography>
                <TableContainer component={Paper} style={{ maxWidth: '100%', overflowX: 'auto' }}>
                <Table size="small">
                <TableBody>
                {contactsForFlow.map((contact, index) => (
                    <TableRow key={index}>
                    <TableCell style={{ maxWidth: '100px', wordWrap: 'break-word' }}>
                        Contact: {contact.userId}
                        <br />
                        Fecha: {contact.createdAt ? ` ${contact.createdAt.slice(0, 10)}` : 'No date available'}
                        <br />
                        Ultimo mensaje enviado: {contact.lastProduct}
                        
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                </Table>
                </TableContainer>
              </div>
            ))}
           
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          label="Escribe tu mensaje"
          variant="outlined"
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginRight: '10px', width: '250px' }}
        />
        <Button variant="contained" onClick={sendMessage}>Enviar mensajes</Button>
      </div>
        </div>
      </div>
    );
  };
  
  export default CrmPersonalInformationComponent;
  