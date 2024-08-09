import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MessageInputComponent = ({ sendMessage, updateMessageEndpoint }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(message);
    updateMessageEndpoint(message);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop:"10px" }}>
      <TextField
        label="Escribe tu mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        multiline
        style={{ width: '450px', marginRight: '8px' }}
      />
      <Button variant="contained" onClick={handleSendMessage} style={{ height: '100%' }}>
        Enviar
      </Button>
    </div>
  );
};

export default MessageInputComponent;
