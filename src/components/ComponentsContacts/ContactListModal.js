import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
const ContactListModal = ({ open, onClose, onCreate, onUpdate, isEditMode, listNameToEdit }) => {
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      setListName(listNameToEdit);
    } else {
      setListName('');
    }
  }, [isEditMode, listNameToEdit]);

  const isValidListName = (name) => {
    const regex = /^[a-zA-Z0-9\s-]+$/;
    return regex.test(name);
  };

  const handleCreate = () => {
    if (listName.trim().length > 0 && isValidListName(listName)) {
      onCreate(listName);
      setListName('');
      setError('');
      onClose();
    } else {
      setError('Please enter a valid list name. Only letters, numbers, spaces, and hyphens are allowed.');
    }
  };
  const handleUpdate = () => {
    if (listName.trim().length > 0) {
      onUpdate(listName);
      setListName('');
      setError('');
      onClose();
    } else {
      setError('Please enter a valid list name.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" component="h2">
          {isEditMode ? 'Editar lista' : 'Crear lista'}
        </Typography>
        <TextField
          label="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          error={!!error}
          helperText={error}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          {isEditMode ? (
            <>
              <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mr: 1 }}>
                Aceptar
              </Button>
              <Button variant="contained" color="secondary" onClick={onClose}>
                Cancelar
              </Button>
            </>
          ) : (
            <div>
            <Button variant="contained" color="primary" onClick={handleCreate} sx={{ mr: 1 }}>
              Confirm
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default ContactListModal;
