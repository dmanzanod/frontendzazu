import React, { useState, useEffect } from 'react';
import { getContactInformation, getContactListsData, createContactList, deleteContactList, getContactListByName, updateContactList, getContactInformationByMonth } from '../services/service';
import Principal from './Principal';
import { Box, Button, Modal, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DataTable from '../components/ComponentsContacts/Datatable';
import ContactListModal from '../components/ComponentsContacts/ContactListModal';
import ContactListsTable from '../components/ComponentsContacts/ContactListTable';
import { CalendarToday as CalendarTodayIcon } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import isWithinInterval from 'date-fns/isWithinInterval';
import { es } from 'date-fns/locale';
import { getYear, getMonth } from 'date-fns';

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateRangeModalOpen, setDateRangeModalOpen] = useState(false);
  const [isMonthAndYearModal, setMonthAndYearModal] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  
  useEffect(() => {
    setFilteredContacts(contacts); // Initialize with all contacts
  }, [contacts]);
  
  const predefinedOrder = [
    'MENÚ PRINCIPAL',
    'CATEGORÍA',
    'PROGRAMA',
    'INSCRIPCIÓN COMPLETADA'
  ];

  const parseCreatedAt = (dateString) => {
    return parse(dateString, 'dd/MM/yyyy, HH:mm', new Date());
  };
  
  useEffect(() => {
    const fetchContactInformationByMonth = async () => {
      try {
        const businessId = localStorage.getItem('Business');
        const currentYear = getYear(new Date());
        const currentMonth = getMonth(new Date()) + 1;
        const response = await getContactInformationByMonth(businessId, currentYear, currentMonth);
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
        console.error("Error fetching contact information by month:", error);
      }
    };
  
    fetchContactInformationByMonth();
  }, []);

  const fetchContactInformationByMonth = async () => {
    try {
      const businessId = localStorage.getItem('Business');
      const year = selectedYear || getYear(new Date());
      const month = selectedMonth || getMonth(new Date()) + 1; 
      const response = await getContactInformationByMonth(businessId, year, month);
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
      console.error("Error fetching contact information by month:", error);
    }
  };
  
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const startOfMonth = new Date(selectedYear, selectedMonth - 1, 1);
      const endOfMonth = new Date(selectedYear, selectedMonth, 0); // Last day of the month
  
      setStartDate(startOfMonth);
      setEndDate(endOfMonth);
  
      fetchContactInformationByMonth();
    }
  }, [selectedMonth, selectedYear]);
  

  const filterContacts = () => {
    let filtered = [...filteredContacts];
    if (searchValue) {
        const query = searchValue.toLowerCase();
        filtered = filtered.filter(contact => {
            const userId = contact.userId ? contact.userId : '';
            const username = contact.contactUsername ? contact.contactUsername.toLowerCase() : '';
            const category = contact.lastCategory ? contact.lastCategory.toLowerCase() : '';
            const createdAt = contact.createdAt ? contact.createdAt.toLowerCase() : '';
            const productValues = (contact.values || []).map(item => item.lastProduct.toLowerCase());

            return userId.includes(query) || 
                   username.includes(query) ||
                   category.includes(query) ||
                   createdAt.includes(query) ||
                   productValues.some(value => value.includes(query));
        });
    }
    // Set the filtered contacts
    setFilteredContacts(filtered);
};
const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
      filterContacts();
  }
};
const handleMonthChange = (event) => {
  setSelectedMonth(event.target.value);
};

const handleYearChange = (event) => {
  setSelectedYear(event.target.value);
};

  const handleCloseDateRangeModal = () => {
      setDateRangeModalOpen(false);
  };
  const handleCloseYearAndMonthModal = () => {
    setMonthAndYearModal(false);
};

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

  const handleFlowChange = async (event) => {
    setSelectedFlow(event.target.value);
    const selectedFlow = event.target.value;

    // If 'Ninguno' is selected, reset to all contacts
    if (selectedFlow === 'ninguno') {
        console.log("Ninguno selected");
        setFilteredContacts(contacts);
        return;
    }

    let filteredContacts = contacts;

    // Filter contacts based on the selected flow
    filteredContacts = filteredContacts.filter(contact => {
        // If selected flow is in predefinedOrder
        if (predefinedOrder.includes(selectedFlow)) {
            const flowValues = contact.values.filter(value => value.lastFlow === selectedFlow);

            const validFlowValues = flowValues.filter(value => value.lastProduct !== "-" && value.lastProduct !== undefined);

            if (validFlowValues.length > 0) {
                // Get the latest flow value based on creation date
                const latestFlowValue = validFlowValues.reduce((latest, current) => {
                    const latestDate = new Date(latest.createdAt);
                    const currentDate = new Date(current.createdAt);
                    return currentDate > latestDate ? current : latest;
                }, validFlowValues[0]);

                return latestFlowValue.lastFlow === selectedFlow;
            }

            // Ensure that the contact matches the selected flow and has a valid last product
            return contact.lastFlow === selectedFlow && contact.lastProduct !== "-" && contact.lastProduct !== undefined;
        } else {
            // For flows not in predefinedOrder, only show if lastProduct is valid
            return contact.values.some(value => 
                value.lastFlow === selectedFlow && value.lastProduct !== "-" && value.lastProduct !== undefined
            );
        }
    });

    // Apply date range filter if dates are set
    if (startDate && endDate) {
        const parsedStartDate = parse(format(startDate, 'dd/MM/yyyy, HH:mm'), 'dd/MM/yyyy, HH:mm', new Date());
        const parsedEndDate = parse(format(endDate, 'dd/MM/yyyy, HH:mm'), 'dd/MM/yyyy, HH:mm', new Date());

        filteredContacts = filteredContacts.filter(contact => {
            const contactDate = parseCreatedAt(contact.createdAt);
            return isWithinInterval(contactDate, { start: parsedStartDate, end: parsedEndDate });
        });
    }

    // Update the state with the filtered contacts
    setFilteredContacts(filteredContacts);
};

  const headers = ["NÚMERO", "USUARIO", ...uniqueLastFlows, "CREADA EN"];
  const dataKeys = ["userId", "contactUsername", ...uniqueLastFlows.map(flow => `lastFlow_${flow}`), "createdAt"];

  const totalPages = Math.ceil(filteredContacts.length / 100);

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

      const editableUsers = listNameData.data.users || [];
      console.log("Editable users", editableUsers);

      const usersToEdit = contacts.filter(contact => {
        return editableUsers.some(editableUser => 
          `${editableUser.contactNumber}|${editableUser.createdAt}` === `${contact.userId}|${contact.createdAt}`
        );
      });

      console.log("Users to edit", usersToEdit);
      setSelectedUserIds(usersToEdit.map(user => `${user.userId}|${user.createdAt}`));
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
      const users = selectedUserIds.map(idWithCreatedAt => {
        const [userId, createdAt] = idWithCreatedAt.split('|');
        const contact = contacts.find(contact => contact.userId === userId && contact.createdAt === createdAt);
        if (contact) {
          return {
            contactNumber: contact.userId,
            username: contact.contactUsername || 'Desconocido',
            lastFlow: contact.lastFlow || null,
            createdAt: contact.createdAt || 'null',
          };
        } else {
          return {
            contactNumber: userId,
            username: 'desconocido',
            lastFlow: null,
            createdAt: 'Indefinido',
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
    console.log("USUARIOS ACTUALIZAR LISTA\n", selectedUserIds);
    console.log(contacts);
    const users = selectedUserIds.map(idWithCreatedAt => {
      const [userId, createdAt] = idWithCreatedAt.split('|');
      const contact = contacts.find(contact => contact.userId === userId && contact.createdAt === createdAt);
      if (contact) {
        return {
          contactNumber: contact.userId,
          username: contact.contactUsername || 'Desconocido',
          lastFlow: contact.lastFlow || null,
          createdAt: contact.createdAt || 'null',
        };
      } else {
        return {
          contactNumber: userId,
          username: 'desconocido',
          lastFlow: null,
          createdAt: 'Indefinido',
        };
      }
    });

    const values = {
      contactNumbers: selectedUserIds,
      newListName: newListName || listName, 
      users: users
    };

    const response = await updateContactList(businessId, listName, values);
    if (response.success) {
      const responseContactListData = await getContactListsData(businessId);
      if (responseContactListData.success) {
        setLists(responseContactListData.data);
      }
      handleModalClose();
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
    handleUpdateList(listNameToEdit);
    setIsEditMode(false);
  };
  const handleOpenDateRangeModal = () => {
    setDateRangeModalOpen(true);
};
  const formattedContacts = formatContactData(filteredContacts);

  const handleApplyDateRange = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredContacts(contacts);
    setDateRangeModalOpen(false);
  };


  const applyDateSelectionData = () => {
    if (startDate && endDate) {
      const parsedStartDate = parse(format(startDate, 'dd/MM/yyyy, HH:mm'), 'dd/MM/yyyy, HH:mm', new Date());
      const parsedEndDate = parse(format(endDate, 'dd/MM/yyyy, HH:mm'), 'dd/MM/yyyy, HH:mm', new Date());
  
      const filtered = contacts.filter(contact => {
        const contactDate = parseCreatedAt(contact.createdAt);
        return isWithinInterval(contactDate, { start: parsedStartDate, end: parsedEndDate });
      });
  
      console.log("Filtered Values: ", filtered); // Debugging output
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  
    setDateRangeModalOpen(false);
  };
  
  
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
            marginBottom: '20px',
          }}
        >
          <h2>LISTA DE CONTACTOS</h2>
          <Box sx={{ display: 'flex', gap: '5px' }}> {}
            <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
              Crear lista
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleOpenDateRangeModal(true)}>
              Seleccionar Fechas
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setMonthAndYearModal(true)}>
              Seleccionar Mes y Año
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
                <MenuItem value="ninguno"><em>NINGUNO</em></MenuItem>
                {uniqueLastFlows.map(flow => (
                <MenuItem key={flow} value={flow}>{flow}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="text" 
              value={searchValue} 
              onChange={(e) => setSearchValue(e.target.value)} 
              onKeyDown={handleKeyDown}
              placeholder="Buscar..."
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
              rowsPerPage={100}
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
        <Modal open={isDateRangeModalOpen} onClose={handleCloseDateRangeModal}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        padding: '20px', backgroundColor: 'white', borderRadius: '8px', width: '400px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography
          id="date-picker-modal-title"
          variant="h6"
          component="h2"
          style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Seleccionar Fechas
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '20px' }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            defaultValue={startDate || new Date()}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            defaultValue={endDate || new Date()}
            renderInput={(params) => <TextField {...params} />}
          />
          </Box>
        </LocalizationProvider>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={applyDateSelectionData}
            style={{ marginRight: '10px' }}
          >
            Aceptar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleApplyDateRange}
          >
            Reestablecer
          </Button>
        </Box>
      </div>
    </Modal>
    <Modal
          open={isMonthAndYearModal}
          onClose={handleCloseYearAndMonthModal}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Seleccionar Mes y Año
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="month-select-label">Mes</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={handleMonthChange}
                label="Mes"
              >
                {[...Array(12).keys()].map(i => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('es', { month: 'long' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="year-select-label">Año</InputLabel>
              <Select
                labelId="year-select-label"
                value={selectedYear}
                onChange={handleYearChange}
                label="Año"
              >
                {[2023, 2024, 2025].map(year => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" >
              Aplicar
            </Button>
          </Box>
        </Modal>
      </Box>
    </Principal>
  );
};

export default CrmPersonalInformationPage;
