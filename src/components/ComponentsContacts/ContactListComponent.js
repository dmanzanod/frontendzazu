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
import { People as PeopleIcon, ArrowDropDown, KeyboardArrowLeft, KeyboardArrowRight, Search } from '@mui/icons-material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { es } from 'date-fns/locale';
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
  const [goToPage, setGoToPage] = useState('');
  const [isGoToPageModalOpen, setIsGoToPageModalOpen] = useState(false);

  const getUniqueFlujoValues = () => {
    const uniqueValues = [...new Set(contacts.map(contact => contact.flujo))];
    setUniqueFlujoValues(uniqueValues);
  };

  useEffect(() => {
    // Calculate unique flujo values when contacts change
    getUniqueFlujoValues();
  }, [contacts]);
  
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const updatedSelection = isChecked ? contacts.map((contact) => contact.id) : [];
    handleToggle(updatedSelection);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setIsGoToPageModalOpen(false);
      setGoToPage('');
    } else {
      // Display an error message or handle invalid page number
      console.error('Invalid page number');
    }
  };

  const handleMenuItemClick = (newOrder) => {
    setOrder(newOrder);
    setSortAnchorEl(null);
  };

  const handleFlujoFilterChange = (event) => {
    setSelectedFlujo(event.target.value);
    setAnchorEl(null);
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const sortedContactsArray = contacts.slice().sort((a, b) => {
      const aValue = a.name.toLowerCase();
      const bValue = b.name.toLowerCase();
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    setSortedContacts(sortedContactsArray);

    const filteredAndSortedContacts = applyFilters(sortedContactsArray);
    const newTotalPages = Math.ceil(filteredAndSortedContacts.length / contactsPerPage);
    setTotalPages(newTotalPages);

    const newIndexOfFirstContact = (currentPage - 1) * contactsPerPage;
    const newIndexOfLastContact = currentPage * contactsPerPage;
    setCurrentContacts(filteredAndSortedContacts.slice(newIndexOfFirstContact, newIndexOfLastContact));
    setIndexOfFirstContact(newIndexOfFirstContact);
    setIndexOfLastContact(newIndexOfLastContact);
  }, [contacts, order, selectedFlujo, selectedStartDate, selectedEndDate, currentPage]);

  const handleResetDateRange = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setDateRangeModalOpen(false);
  };

  const applyFilters = (contactsArray) => {
    let filteredContacts = contactsArray;
    if (selectedFlujo) {
      filteredContacts = filteredContacts.filter((contact) => contact.flujo === selectedFlujo);
    }
    if (selectedStartDate && selectedEndDate) {
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);
      endDate.setHours(23, 59, 59, 999);
      filteredContacts = filteredContacts.filter((contact) => {
        const contactDate = parse(contact.creadoEn, 'dd/MM/yyyy HH:mm', new Date());
        return contactDate >= startDate && contactDate <= endDate;
      });
    }
    return filteredContacts;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFlujo, selectedStartDate, selectedEndDate]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table align="middle" hover="true" responsive="true">
          {/* Table header */}
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
                <IconButton onClick={(event) => setSortAnchorEl(event.currentTarget)}>
                  <ArrowDropDown />
                </IconButton>
                {/* Sorting options */}
                <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleClose}>
                  <MenuItem onClick={() => handleMenuItemClick('asc')}>A-Z</MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick('desc')}>Z-A</MenuItem>
                </Menu>
              </TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>
                Flujo
                <IconButton onClick={handleFilterClick}>
                  <ArrowDropDown />
                </IconButton>
                {/* Flujo filter */}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={() => handleFlujoFilterChange({ target: { value: '' } })}>Todos</MenuItem>
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
                {/* Date range modal */}
                <Modal open={isDateRangeModalOpen} onClose={handleCloseDateRangeModal}>
                  {/* Date range selection */}
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
                    <Button variant="contained" color="primary" onClick={handleResetDateRange}>
                        Reestablecer
                      </Button>
                    </div>
                  </div>
                </Modal>
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
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
      {/* Pagination */}
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <IconButton color="primary" onClick={handlePrevPage} disabled={currentPage === 1}>
          <KeyboardArrowLeft />
        </IconButton>
        <span style={{ margin: '0 10px' }}>{`Página ${currentPage} de ${totalPages}`}</span>
        <IconButton color="primary" onClick={() => setIsGoToPageModalOpen(true)}>
          <Search />
        </IconButton>
        <IconButton color="primary" onClick={handleNextPage} disabled={currentPage === totalPages}>
          <KeyboardArrowRight />
        </IconButton>
      </div>

      {/* Go to page modal */}
      <Modal open={isGoToPageModalOpen} onClose={() => setIsGoToPageModalOpen(false)}>
        <form onSubmit={(e) => { e.preventDefault(); handleGoToPage(); setIsGoToPageModalOpen(false); }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
            <TextField
              label="Numero de pagina"
              variant="outlined"
              value={goToPage}
              onChange={(e) => setGoToPage(e.target.value)}
              fullWidth
            />
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Ir
            </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ContactListComponent;
