import React, { useState, useEffect } from 'react';
import ContactListComponent from '../ComponentsContacts/ContactListComponent';
import MessageInputComponent from '../ComponentsContacts/MessageInputComponent';
import { getContactListsData, sendBulkMessages, updateLastMessageSendByList } from '../../services/service';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, ThemeProvider, createTheme, Modal, Button, List, ListItem, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SortIcon from '@mui/icons-material/Sort';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins-medium, sans-serif',
    fontSize: 14,
  },
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ContactDashboardComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedListName, setSelectedListName] = useState('');
  const [dynamicMessageEndpoint, setDynamicMessageEndpoint] = useState('');
  const [lastMessageSend, setLastMessageSend] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const businessId = localStorage.getItem('Business');
        const data = await getContactListsData(businessId);
        if (data.success) {
          setLists(data.data);
          if (data.data.length > 0) {
            setSelectedListName(data.data[0].listName);
            setContacts(data.data[0].users);
            setLastMessageSend(data.data[0].lastMessageSend || []);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleListChange = (e) => {
    const listName = e.target.value;
    setSelectedListName(listName);
    const selectedList = lists.find(list => list.listName === listName);
    setContacts(selectedList ? selectedList.users : []);
    setLastMessageSend(selectedList ? selectedList.lastMessageSend : []);
    setCurrentPage(1);  // Reset to first page on list change
  };

  const updateMessageEndpoint = (message) => {
    setDynamicMessageEndpoint(`${message}`);
  };

  const sendMessage = async (message) => {
    try {
      const businessId = localStorage.getItem('Business');
      if (contacts.length === 0) {
        console.log('No contacts to send messages.');
        return;
      }
      const phoneNumbers = contacts.map(contact => contact.contactNumber).filter(Boolean);

      const messageData = { 
        message: message,
        contacts: phoneNumbers,
      };
      console.log(messageData, selectedListName);
      const urlMessages = localStorage.getItem('url');
      console.log('URL MENSAJES\n', message);
      const result = await sendBulkMessages(urlMessages, messageData);  
      const messageAdditionToList = await updateLastMessageSendByList(businessId, selectedListName, { message: messageData.message });
      if (result && result.error) {
        console.error('Error sending messages:', result.error);
      } else {
        console.log('Messages sent successfully!');
      }
    } catch (error) {
      console.error('Error sending messages:', error);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSortOrderToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedMessages = sortOrder === 'asc' ? lastMessageSend : [...lastMessageSend].reverse();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = sortedMessages.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (startIndex + itemsPerPage < lastMessageSend.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ textAlign: 'center', margin: 'auto', marginTop: '70px' }}>
        <Typography variant="h2" gutterBottom>Contactos</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, marginBottom: '20px' }}>
          <FormControl sx={{ minWidth: 200, width: '200px' }}>
            <InputLabel id="list-selector-label">Select List</InputLabel>
            <Select
              labelId="list-selector-label"
              value={selectedListName}
              onChange={handleListChange}
              label="Select List"
            >
              {lists.map(list => (
                <MenuItem key={list._id} value={list.listName}>{list.listName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleOpenModal} variant="outlined" sx={{ width: '200px' }}>
            Mensajes enviados
          </Button>
        </Box>
        <ContactListComponent contacts={contacts} />
        <MessageInputComponent
          sendMessage={sendMessage}
          updateMessageEndpoint={updateMessageEndpoint}
        />
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              Mensajes enviados
            </Typography>
            <IconButton onClick={handleSortOrderToggle} aria-label="sort">
              <SortIcon />
            </IconButton>
            <List>
              {paginatedMessages.map((message, index) => (
                <ListItem key={index}>
                  {message || 'No message'}
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <IconButton onClick={handlePrevPage} disabled={currentPage === 1}>
                <ArrowBackIcon />
              </IconButton>
              <Typography>{currentPage}</Typography>
              <IconButton onClick={handleNextPage} disabled={startIndex + itemsPerPage >= lastMessageSend.length}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default ContactDashboardComponent;
