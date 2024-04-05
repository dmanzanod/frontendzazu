import React, { useState, useRef } from 'react';
import { Box, Button, CircularProgress, Typography, LinearProgress, Modal } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import Principal from './Principal';
import { uploadFileText } from '../services/service';

const FileUploadTextPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false); // State to track upload completion
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference to file input element

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
  
      try {
        const response = await uploadFileText(file, (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        });
  
        if (response.error) {
          setLoading(false);
          console.error('Error uploading file:', response.error);
        } else {
          setLoading(false);
          console.log('File uploaded successfully');
          setUploadComplete(true); // Set upload complete to true
          setFile(null);
          fileInputRef.current.value = null; // Clear file input value to enable selecting a new file
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
  };

  const closeModal = () => {
    setUploadComplete(false);
  };

  return (
    <Principal>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Cargar su archivo de Texto
        </Typography>
        <input
          ref={fileInputRef} // Assign the ref to the file input element
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            disabled={loading}
          >
            {file ? file.name : 'Seleccionar archivo'}
          </Button>
        </label>
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            {loading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              'Cargar archivo'
            )}
          </Button>
        </Box>
        {loading && (
          <Box mt={2} width="100%">
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}
        <Modal open={uploadComplete} onClose={closeModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2>
              Archivo subido
            </h2>
            <Button onClick={closeModal}>Cerrar</Button>
          </Box>
        </Modal>
      </Box>
    </Principal>
  );
};

export default FileUploadTextPage;
