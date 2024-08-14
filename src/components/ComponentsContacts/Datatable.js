import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Paper, Container, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, green, common } from '@mui/material/colors';
import Pagination from "@mui/material/Pagination";
import PropTypes from 'prop-types';
import parse from 'date-fns/parse';

const grey500 = grey['500'];
const green400 = green['400'];
const white = common.white;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins-medium, sans-serif',
    fontSize: 14,
  },
});

const styles = {
  searchButton: {
    marginRight: 20,
  },
  editButton: {
    marginRight: '1em',
    color: white,
    backgroundColor: green400,
  },
  editButtonIcon: {
    fill: white,
  },
  deleteButton: {
    color: 'grey',
    fill: grey500,
  },
  columns: {
    width10: {
      width: '30%',
    },
  },
  row: {
    margin: '1.5em',
    width: '95%',
  },
  pagination: {
    width: 350,
    margin: '0 auto',
    paddingTop: 10,
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
  tableContainer: {
    borderRadius: '8px',
    overflow: 'auto',
    border: `1px solid ${grey['300']}`,
  },
};

const DataTable = ({
  items, dataKeys, headers, selectedItems,
  onSelectItem, totalPages, page, rowsPerPage,
  onPageChange, onDelete
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortData = (array, comparator) => {
    const stabilizedArray = array.map((el, index) => [el, index]);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === 'createdAt') {
      const dateA = parse(a[orderBy], 'dd/MM/yyyy HH:mm', new Date());
      const dateB = parse(b[orderBy], 'dd/MM/yyyy HH:mm', new Date());
      if (dateB < dateA) return -1;
      if (dateB > dateA) return 1;
      return 0;
    } else {
      if (b[orderBy] < a[orderBy]) return -1;
      if (b[orderBy] > a[orderBy]) return 1;
      return 0;
    }
  };

  const sortedItems = sortData(items, getComparator(order, orderBy));

  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={header}
                  style={styles.headerCell}
                  sortDirection={orderBy === dataKeys[index] ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === dataKeys[index]}
                    direction={orderBy === dataKeys[index] ? order : 'asc'}
                    onClick={() => handleRequestSort(dataKeys[index])}
                  >
                    {header}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((item, index) => (
              <TableRow key={index} style={index % 2 === 0 ? styles.tableCell : styles.alternateTableCell}>
                {dataKeys.map((key) => (
                  <TableCell key={key} style={styles.columns.width10}>
                    {item[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Container style={styles.pagination}>
          <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={(_, newPage) => onPageChange(_, newPage)}
          />
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

DataTable.propTypes = {
  items: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  selectedItems: PropTypes.array,
  onSelectItem: PropTypes.func,
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

export default DataTable;
