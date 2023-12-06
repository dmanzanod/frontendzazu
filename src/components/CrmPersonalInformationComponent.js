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
} from "@mui/material";

const CrmPersonalInformationComponent = ({ contacts }) => {
    const [groupedContacts, setGroupedContacts] = useState({});
    const [selectedFlow, setSelectedFlow] = useState("");
  
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
              <MenuItem value="mainFlow">Filtrar por inicio de conversacion</MenuItem>
              <MenuItem value="morningSelectionFlow">Filtrar por seleccion de Horarios</MenuItem>
              <MenuItem value="BuyFlow">Filtrar por reserva o compra de productos</MenuItem>
              {/* Add more items for other flows as needed */}
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
                        Fecha: {contact.createdAt ? `Fecha: ${contact.createdAt.slice(0, 10)}` : 'No date available'}
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
        </div>
      </div>
    );
  };
  
  export default CrmPersonalInformationComponent;
  