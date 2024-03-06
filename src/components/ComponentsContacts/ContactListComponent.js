import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Modal,
} from '@mui/material';
import { People as PeopleIcon, ArrowDropDown } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import {es} from 'date-fns/locale'
import { parse } from 'date-fns';
const ContactListComponent = ({ contacts, selectedContacts, handleToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFlujo, setSelectedFlujo] = useState('');
  const [uniqueFlujoValues, setUniqueFlujoValues] = useState([]);
  const contactsPerPage = 10;
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDateRangeModalOpen, setDateRangeModalOpen] = useState(false);
  const [currentContacts, setCurrentContacts] = useState([]);
  const [sortedContacts, setSortedContacts] = useState([]);
  const [indexOfFirstContact, setIndexOfFirstContact] = useState(0);
  const [indexOfLastContact, setIndexOfLastContact] = useState(contactsPerPage);
  const [totalPages, setTotalPages] = useState(1);

  const handleApplyDateRange = () => {
    // Close the modal after applying the date range
    handleCloseDateRangeModal();
    const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
    let endDate = selectedEndDate ? new Date(selectedEndDate) : null;
    if (endDate) {
      endDate.setHours(23, 59, 59, 999);
    }
  
    // Filter the contacts based on the selected date range
    const filteredContacts = contacts.filter((contact) => {
      const contactDate = parse(contact.creadoEn, 'dd/MM/yyyy HH:mm', new Date());
      // Check if the contactDate is within the selected range
      return (
        (!startDate || contactDate >= startDate) &&
        (!endDate || contactDate <= endDate)
      );
    });
  
    // Update total pages based on filtered contacts
    const newTotalPages = Math.ceil(filteredContacts.length / contactsPerPage);
    setTotalPages(newTotalPages);
  
    // Update contacts for the current page
    const newIndexOfFirstContact = (currentPage - 1) * contactsPerPage;
    const newIndexOfLastContact = currentPage * contactsPerPage;
  
    setCurrentContacts(filteredContacts.slice(newIndexOfFirstContact, newIndexOfLastContact));
    setIndexOfFirstContact(newIndexOfFirstContact);
    setIndexOfLastContact(newIndexOfLastContact);
  };
  
  
  const handleOpenDateRangeModal = () => {
    setDateRangeModalOpen(true);
  };

  const handleCloseDateRangeModal = () => {
    setDateRangeModalOpen(false);
  };

  const handleStartDateChange = (newDate) => {
    setSelectedStartDate(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setSelectedEndDate(newDate);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (newOrder) => {
    setOrder(newOrder);
    setSortAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const updatedSelection = isChecked ? contacts.map((contact) => contact.id) : [];

    handleToggle(updatedSelection);
  };

  const handleFlujoFilterChange = (event) => {
    setSelectedFlujo(event.target.value);
    setAnchorEl(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Combine sorting and initial page setup into a single useEffect
  useEffect(() => {
    const sortedContactsArray = contacts.slice().sort((a, b) => {
      const aValue = a.name.toLowerCase();
      const bValue = b.name.toLowerCase();
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    setSortedContacts(sortedContactsArray);

    // Set indices based on the current page
    setIndexOfFirstContact(0); // Set to 0 for the first page
    setIndexOfLastContact(contactsPerPage);
    setCurrentPage(1); // Set the current page to 1 initially
  }, [contacts, order, contactsPerPage]);

  // Combine selectedFlujo filtering and total pages calculation
  useEffect(() => {
    const sortedAndFilteredContacts = sortedContacts.filter((contact) =>
      selectedFlujo ? contact.flujo === selectedFlujo : true
    );

    const newTotalPages = Math.ceil(sortedAndFilteredContacts.length / contactsPerPage);

    setTotalPages(newTotalPages);

    const newIndexOfFirstContact = (currentPage - 1) * contactsPerPage;
    const newIndexOfLastContact = currentPage * contactsPerPage;

    setCurrentContacts(sortedAndFilteredContacts.slice(newIndexOfFirstContact, newIndexOfLastContact));

    setCurrentPage((prevPage) => Math.min(prevPage, newTotalPages));
  }, [sortedContacts, selectedFlujo, currentPage, contactsPerPage]);

  useEffect(() => {
      handleApplyDateRange();
  }, [currentPage]); // Include applyDateRangeEffect in the dependencies
  

  useEffect(() => {
    const updatedUniqueFlujoValues = [...new Set(sortedContacts.map((contact) => contact.flujo))];

    if (!arraysAreEqual(updatedUniqueFlujoValues, uniqueFlujoValues)) {
      setUniqueFlujoValues(updatedUniqueFlujoValues);
    }
  }, [sortedContacts]);

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    return true;
  };

  return (
    <div>
      <TableContainer component={Paper}>
      <Table align="middle" hover="true" responsive="true">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '48px' }} className="text-center">
                <Checkbox
                  checked={selectedContacts.length === contacts.length && contacts.length !== 0}
                  onChange={handleSelectAll}
                  style={{ padding: '0' }}
                />
              </TableCell>
              <TableCell>
                Nombre
                <IconButton onClick={(event) => { setSortAnchorEl(event.currentTarget); }}>
                  <ArrowDropDown />
                </IconButton>   
                <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleClose}>
                  <MenuItem onClick={() => handleMenuItemClick('asc')}>A-Z</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('desc')}>Z-A</MenuItem>
                </Menu>
              </TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Flujo
              <IconButton onClick={handleFilterClick}>
                  <ArrowDropDown />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={() => handleFlujoFilterChange({ target: { value: '' } })}>
                    Todos
                  </MenuItem>
                  {uniqueFlujoValues.map((value) => (
                    <MenuItem key={value} onClick={() => handleFlujoFilterChange({ target: { value } })}>
                      {value}
                    </MenuItem>
                  ))}
                </Menu>
              </TableCell>
              <TableCell>
                Creado en
                <IconButton onClick={handleOpenDateRangeModal}>
                  <CalendarTodayIcon />
                </IconButton>
                <Modal open={isDateRangeModalOpen} onClose={handleCloseDateRangeModal}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                     <DatePicker
                        value={selectedStartDate}
                        onChange={handleStartDateChange}
                        texts={{ selectDate: 'Seleccionar fecha', openDatePicker: 'Abrir selector de fecha' }}
                        textField={(props) => (
                          <TextField
                            {...props}
                            variant="standard"
                            margin="normal"
                            helperText=""
                            label="Inicio"
                            id="start-date-input" 
                          />
                        )}
                      />
                      <span style={{ margin: '20px', display: 'inline-block', lineHeight: '1.5' }}> - </span>
                      <DatePicker
                        value={selectedEndDate}
                        onChange={handleEndDateChange}
                        texts={{ selectDate: 'Seleccionar fecha', openDatePicker: 'Abrir selector de fecha' }}
                        textField={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            margin="normal"
                            helperText=""
                            label="Fin"
                            id="end-date-input" 
                          />
                        )}
                      />
                    </LocalizationProvider>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <Button variant="contained" color="primary"  onClick={handleApplyDateRange}>
                        Aplicar rango de fechas
                      </Button>
                    </div>
                  </div>
                </Modal>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell style={{ width: '48px', padding: '8px', textAlign: 'center' }}>
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => handleToggle(contact.id)}
                    style={{ padding: '0' }}
                  />
                </TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.cel}</TableCell>
                <TableCell>{contact.flujo}</TableCell>
                <TableCell>{contact.creadoEn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span style={{ margin: '0 10px' }}>{`Pagina ${currentPage} de ${totalPages}`}</span>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default ContactListComponent;
