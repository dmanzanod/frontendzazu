import React, { useState, useEffect } from 'react';
import ContactListComponent from '../ComponentsContacts/ContactListComponent';
import MessageInputComponent from '../ComponentsContacts/MessageInputComponent';
import {getInfoCrmData, sendBulkMessages} from '../../services/service'
const ContactDashboardComponent = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [dynamicMessageEndpoint, setDynamicMessageEndpoint] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const businessId = localStorage.getItem('Business');
        const data = await getInfoCrmData(businessId);
  
        if (data.success) {
          if (data.data.length > 0) {
            const transformedContacts = data.data.map(contact => {
              const formattedDate = formatCreatedAt(contact.createdAt);
              return {
                id: contact._id,  
                name: contact.lastProduct,
                cel: contact.userId,
                flujo: modifyFlujoValue(contact.lastFlow),
                creadoEn: formattedDate,
              };
            });
            setContacts(transformedContacts);
          } else {
            console.log('No contacts found.');
          }
        } else {
          console.error('Error fetching contacts:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    const formatCreatedAt = (createdAt) => {
      const date = new Date(createdAt);
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${date.toLocaleDateString('es-BO')} ${date.getHours()}:${minutes}`;
    };
    fetchData();
  }, []);
  
  const modifyFlujoValue = (originalFlujo) => {
    const flujoMapping = {
      scheduleFlow: 'Horarios',
      pricesFlow: 'Compra',
      mainFlow: 'Inicio conversacion',
      BuyFlow: 'Compras o Reservas',
      morningSelectionFlow: 'Seleccionando horarios',
      botSelectionFlow: 'Inicio conversacion',
      directContactFlow: 'Contacto con asesor',
      cursoHorario: 'Cursos y horarios',
      preciosMensualidad: 'Precios de la mensualidad',
      // Add more mappings as needed
    };
  
    return flujoMapping[originalFlujo] || originalFlujo;
  };
  
  const handleToggle = (contactIds) => {
    if (Array.isArray(contactIds)) {
      setSelectedContacts(contactIds);
    } else {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.includes(contactIds)
          ? prevSelectedContacts.filter((id) => id !== contactIds)
          : [...prevSelectedContacts, contactIds]
      );
    }
  };
  const updateMessageEndpoint = (message) => {
    // Logic to update dynamicMessageEndpoint based on the message value
    setDynamicMessageEndpoint(`${message}`);
  };

  const sendMessage = async (message) => {
    try {
      if (selectedContacts.length === 0) {
        console.log('No contacts selected to send messages.');
        return;
      }
      const phoneNumbers = selectedContacts.map(contactId => {
        const contact = contacts.find(c => c.id === contactId);
        return contact ? contact.cel : null;
      }).filter(Boolean);

      const messageData = { 
        message: message,
        contacts: phoneNumbers,
      };
      const urlMessages = localStorage.getItem('url');
      const result = await sendBulkMessages(urlMessages,messageData);

      if (result && result.error) {
        console.error('Error sending messages:', result.error);
      } else {
        console.log('Messages sent successfully!');
        setSentMessages([...sentMessages, { message, to: selectedContacts }]);
      }
    } catch (error) {
      console.error('Error sending messages:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: 'auto', marginTop: '70px' }}>
      <h2>Contactos</h2>
      <ContactListComponent
        style={{ marginTop: '30px' }}
        contacts={contacts}
        selectedContacts={selectedContacts}
        handleToggle={handleToggle}
      />

      <div style={{ marginTop: '20px' }}>
        <MessageInputComponent sendMessage={sendMessage} updateMessageEndpoint={updateMessageEndpoint} />
      </div>
      <div>
        <h3>Enviar mensajes</h3>
        {sentMessages.map((sentMessage, index) => (
          <div key={index}>
            {`To: ${sentMessage.to.map((contactId) => contacts.find((c) => c.id === contactId)?.cel).join(', ')} - Message: ${sentMessage.message}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDashboardComponent;
