import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the CloudUpload icon
import { useNavigate } from 'react-router-dom';
import Principal from './Principal';
import { uploadExcel } from '../services/service';

const ExcelUploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
  
      // Call the uploadExcel service
      try {
        const response = await uploadExcel(localStorage.getItem('Business'), file); // Replace 'businessId' with the actual business ID
  
        if (response.error) {
          // Handle errors
          setLoading(false);
          console.error('Error uploading file:', response.error);
        } else {
          // File upload was successful, handle the response
          setLoading(false);
          console.log('File uploaded successfully');
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
  };

  return (
    <Principal>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Center both horizontally and vertically
        }}
      >
        <Typography variant="h4" gutterBottom>
          Cargar su archivo de Excel
        </Typography>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />} // Use the CloudUpload icon
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
      </Box>
    </Principal>
  );
};

export default ExcelUploadPage;
