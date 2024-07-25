import React, { useState, useEffect } from 'react';
import { getContactInformation, getContactListsData, createContactList, deleteContactList, getContactListByName, udpateContactList } from '../services/service';
import Principal from './Principal';
import { Box, Button, Modal, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DataTable from '../components/ComponentsContacts/Datatable';
import ContactListModal from '../components/ComponentsContacts/ContactListModal';
import ContactListsTable from '../components/ComponentsContacts/ContactListTable';

const CrmPersonalInformationPage = () => {
  const [contacts, setContacts] = useState([]);
  const [uniqueLastFlows, setUniqueLastFlows] = useState([]);
  const [selectedFlow, setSelectedFlow] = useState('');
  const [searchValue, setSearchValue] = useState(''); // Added search state
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [lists, setLists] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [listNameToEdit, setListNameToEdit] = useState('');
  const [newListName, setNewListName] = useState('');
  const [selectedListIds, setSelectedListIds] = useState([]);
  const [showListsTable, setShowListsTable] = useState(false);

  const predefinedOrder = [
    'menu principal',
    'categoría',
    'inscripción',
    'inscripción completa'
  ];

  useEffect(() => {
    const fetchContactInformation = async () => {
      try {
        const businessId = localStorage.getItem('Business');
        const response = await getContactInformation(businessId);
        const responseContactListData = await getContactListsData(businessId);
        if (response.success && responseContactListData) {
          setContacts(response.data);
          setLists(responseContactListData.data);
          const sortedFlows = response.uniqueLastFlows.sort((a, b) => {
            const indexA = predefinedOrder.indexOf(a) !== -1 ? predefinedOrder.indexOf(a) : predefinedOrder.length;
            const indexB = predefinedOrder.indexOf(b) !== -1 ? predefinedOrder.indexOf(b) : predefinedOrder.length;
            return indexA - indexB;
          });
          setUniqueLastFlows(sortedFlows);
        } else {
          console.error("Failed to fetch contact information:", response.message);
        }
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };

    fetchContactInformation();
  }, []);

  const formatContactData = (contacts) => {
    return contacts.map(contact => {
      const flowData = {};

      uniqueLastFlows.forEach(flow => {
        const key = `lastFlow_${flow}`;
        flowData[key] = '-';
      });

      if (contact.values) {
        for (const value of contact.values) {
          const key = `lastFlow_${value.lastFlow}`;
          flowData[key] = value.lastProduct;

          if (value.lastFlow === contact.lastFlow) {
            break;
          }
        }
      }

      const mainFlowKey = `lastFlow_${contact.lastFlow}`;
      flowData[mainFlowKey] = contact.lastProduct;

      return {
        userId: contact.userId,
        contactUsername: contact.contactUsername ? contact.contactUsername : '-',
        lastCategory: contact.lastCategory ? `${contact.lastCategory}` : '-',
        createdAt: contact.createdAt ? `${contact.createdAt}` : '-',
        actions: null,
        ...flowData
      };
    });
  };

  const handleFlowChange = (event) => {
    setSelectedFlow(event.target.value);
  };

  // Updated filtering logic to include search functionality
  const filteredContacts = contacts
    .filter(contact => {
      // If a flow is selected, filter by the flow
      if (selectedFlow && contact.lastFlow !== selectedFlow) {
        return false;
      }

      // Convert contact fields to a string and check if it contains the search value
      const contactString = Object.values({
        userId: contact.userId,
        contactUsername: contact.contactUsername || '-',
        lastCategory: contact.lastCategory || '-',
        createdAt: contact.createdAt || '-',
        ...contact.values.reduce((acc, value) => ({
          ...acc,
          [`lastFlow_${value.lastFlow}`]: value.lastProduct || '-'
        }), {})
      }).join(' ').toLowerCase();

      return contactString.includes(searchValue.toLowerCase());
    });

  const headers = ["Numero", "Usuario", ...uniqueLastFlows, "Creado en"];
  const dataKeys = ["userId", "contactUsername", ...uniqueLastFlows.map(flow => `lastFlow_${flow}`), "createdAt"];

  const totalPages = Math.ceil(filteredContacts.length / 10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (event, id) => {
    console.log(`Delete item with id: ${id}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setListNameToEdit('');
  };

  const handleEdit = async (listName) => {
    try {
      const businessId = localStorage.getItem('Business');
      console.log("MODAL LIST VALUES", listName);

      const listNameData = await getContactListByName(businessId, listName);
      console.log(listNameData);

      const editableUserIds = listNameData.data.users || [];
      const contactNumbersToEdit = editableUserIds.map(user => user.contactNumber);
      console.log("Number to edit", contactNumbersToEdit)
      console.log(editableUserIds)
      const usersToEdit = contacts.filter(contact => contactNumbersToEdit.includes(contact.userId));
      console.log(usersToEdit)
      setSelectedUserIds(usersToEdit.map(user => user.userId)); // Ensure correct ids are set
      setIsEditMode(true);
      setListNameToEdit(listName);
      setNewListName(listName);
    } catch (error) {
      console.error('Error handling edit:', error);
    }
  };

  const handleDeleteList = async (listName) => {
    try {
      const businessId = localStorage.getItem('Business');
      console.log(listName)
      const response = await deleteContactList(businessId, listName);
      if (response.success) {
        const responseContactListData = await getContactListsData(businessId);
        if (responseContactListData.success) {
          setLists(responseContactListData.data);
        }
      } else {
        console.error('Failed to delete list:', response.message);
      }
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const handleCreateList = async (listName) => {
    try {
      const businessId = localStorage.getItem('Business');
      console.log("USUARIOS CREAR LISTA\n", selectedUserIds);
      console.log(contacts)
      const users = selectedUserIds.map(userId => {
        const contact = contacts.find(contact => contact.userId === userId);
        if (contact) {
          return {
            contactNumber: contact.userId,
            username: contact.contactUsername || 'Desconocido',
            lastFlow: contact.lastFlow || null,
          };
        } else {
          return {
            contactNumber: userId,
            username: 'desconocido',
            lastFlow: null,
          };
        }
      });

      const values = {
        businessId: businessId,
        listName: listName,
        users: users,
      };

      const response = await createContactList(values);
      if (response.success) {
        const responseContactListData = await getContactListsData(businessId);
        if (responseContactListData.success) {
          setLists(responseContactListData.data);
        }
      } else {
        console.error('Failed to create list:', response.message);
      }
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleUpdateList = async (listName) => {
    try {
      const businessId = localStorage.getItem('Business');
      const users = selectedUserIds.map(userId => {
        const contact = contacts.find(contact => contact.userId === userId);
        if (contact) {
          return {
            contactNumber: contact.userId,
            username: contact.contactUsername || 'Desconocido',
            lastFlow: contact.lastFlow || null,
          };
        } else {
          return {
            contactNumber: userId,
            username: 'desconocido',
            lastFlow: null,
          };
        }
      });

      const values = {
        contactNumbers: selectedUserIds,
        newListName: newListName || listName, // Use newListName if provided
        users: users
      };

      const response = await udpateContactList(businessId, listName, values);
      if (response.success) {
        const responseContactListData = await getContactListsData(businessId);
        if (responseContactListData.success) {
          setLists(responseContactListData.data);
        }
      } else {
        console.error('Failed to update list:', response.message);
      }
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const handleSelectItem = (selectedIds) => {
    setSelectedUserIds(selectedIds);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setListNameToEdit('');
    setSelectedUserIds([]);
  };

  const handleAcceptEdit = () => {
    handleUpdateList(listNameToEdit); // Pass the original list name
    setIsEditMode(false);
  };

  const formattedContacts = formatContactData(filteredContacts);

  return (
    <Principal>
      <Box sx={{ p: { xs: '10px', md: '0' }, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1600px',
            padding: '90px 20px 0 20px',
            marginBottom: '20px', // Add margin bottom for padding between buttons and DataTable
          }}
        >
          <h2>Contactos</h2>
          <Box sx={{ display: 'flex', gap: '5px' }}> {/* Box to group buttons with 5px gap */}
            <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
              Crear lista
            </Button>
            <Button variant="contained" color="primary" onClick={() => setShowListsTable(!showListsTable)}>
              {showListsTable ? 'Ocultar listas' : 'Listas'}
            </Button>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="flow-selector-label">Seleccionar flujo</InputLabel>
              <Select
                labelId="flow-selector-label"
                value={selectedFlow}
                onChange={handleFlowChange}
                label="Seleccionar flujo"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {uniqueLastFlows.map(flow => (
                  <MenuItem key={flow} value={flow}>{flow}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Buscar"
              variant="outlined"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{ marginLeft: '10px', maxWidth: '300px' }}
            />
          </Box>
        </Box>
        {isEditMode && (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1600px', padding: '10px 20px' }}>
            <TextField
              label="List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              sx={{ marginRight: '10px', flexGrow: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleAcceptEdit}>
              Aceptar
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelEdit} sx={{ marginLeft: '10px' }}>
              Cancelar
            </Button>
          </Box>
        )}
        <Box
          sx={{
            width: '100%',
            maxWidth: '1600px',
            padding: '0',
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', overflow: 'auto', maxHeight: '1600px' }}>
            <DataTable
              items={formattedContacts}
              dataKeys={dataKeys}
              headers={headers}
              selectedItems={selectedUserIds}
              onSelectItem={handleSelectItem}
              totalPages={totalPages}
              page={page}
              rowsPerPage={10}
              onPageChange={handlePageChange}
              onDelete={handleDelete}
            />
          </Box>
        </Box>
        <ContactListModal
          open={isModalOpen}
          onClose={handleModalClose}
          onCreate={handleCreateList}
          onUpdate={handleUpdateList}
          isEditMode={isEditMode}
          listNameToEdit={listNameToEdit}
          selectedItems={selectedUserIds}
        />
        <Modal
          open={showListsTable}
          onClose={() => setShowListsTable(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Listas
            </Typography>
            <ContactListsTable
              lists={lists}
              onEdit={(listName) => {
                setIsEditMode(true);
                setListNameToEdit(listName);
                handleEdit(listName);
                setShowListsTable(false);
              }}
              onDelete={handleDeleteList}
            />
          </Box>
        </Modal>
      </Box>
    </Principal>
  );
};

export default CrmPersonalInformationPage;
