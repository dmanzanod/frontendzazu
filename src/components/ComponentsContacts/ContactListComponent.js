import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, common } from '@mui/material/colors';

const grey500 = grey['500'];
const white = common.white;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins-medium, sans-serif',
    fontSize: 14,
  },
});

const styles = {
  tableContainer: {
    borderRadius: '8px',
    overflow: 'auto',
    border: `1px solid ${grey['300']}`,
    margin: 'auto',
    marginTop: '30px',
    width: '80%',
  },
  headerCell: {
    padding: '16px',
    minWidth: '150px',
    backgroundColor: '#2818A0',
    color: white,
    fontSize: '1rem',
  },
  tableCell: {
    backgroundColor: white,
    fontSize: '1rem',
  },
  alternateTableCell: {
    backgroundColor: grey['100'],
    fontSize: '1rem',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

const ContactListComponent = ({ contacts }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the paginated contacts
  const paginatedContacts = contacts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles.headerCell}>Numero de usuario</TableCell>
              <TableCell style={styles.headerCell}>Nombre de usuario</TableCell>
              <TableCell style={styles.headerCell}>Flujo del usuario</TableCell>
              <TableCell style={styles.headerCell}>Creacion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map((contact, index) => (
              <TableRow key={index} style={index % 2 === 0 ? styles.tableCell : styles.alternateTableCell}>
                <TableCell>{contact.contactNumber}</TableCell>
                <TableCell>{contact.username}</TableCell>
                <TableCell>{contact.lastFlow}</TableCell>
                <TableCell>{contact.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Container style={styles.paginationContainer}>
        <Pagination
          count={Math.ceil(contacts.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Container>
    </ThemeProvider>
  );
};

export default ContactListComponent;
