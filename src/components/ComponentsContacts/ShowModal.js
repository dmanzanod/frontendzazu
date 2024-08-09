// ListModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';

const EditDeleteListModal = ({ open, onClose, onCreate, onUpdate, isEditMode, listNameToEdit }) => {
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      setListName(listNameToEdit);
    } else {
      setListName('');
    }
  }, [isEditMode, listNameToEdit]);

  const handleCreate = () => {
    if (listName.trim().length > 0) {
      onCreate(listName);
      setListName('');
      setError('');
      onClose();
    } else {
      setError('Please enter a valid list name.');
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
          {isEditMode ? 'Edit List' : 'Create List'}
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
          <Button variant="contained" color="primary" onClick={isEditMode ? handleUpdate : handleCreate}>
            Confirm
          </Button>
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

export default EditDeleteListModal;
