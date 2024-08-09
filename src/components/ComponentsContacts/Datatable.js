import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import { grey, green, common } from "@mui/material/colors";
import { Container, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const grey500 = grey["500"];
const green400 = green["400"];
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
    marginRight: "1em",
    color: white,
    backgroundColor: green400,
  },
  editButtonIcon: {
    fill: white,
  },
  deleteButton: {
    color: "grey",
    fill: grey500,
  },
  columns: {
    width10: {
      width: "30%",
    },
  },
  row: {
    margin: "1.5em",
    width: "95%",
  },
  pagination: {
    width: 350,
    margin: "0 auto",
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
    backgroundColor: grey["100"],
    fontSize: '1rem',
  },
  tableContainer: {
    borderRadius: '8px',
    overflow: 'auto',
    border: `1px solid ${grey["300"]}`,
  },
};

function DataTable({
  model = "",
  items = [],
  dataKeys = [],
  totalPages = 1,
  page = 1,
  rowsPerPage = 100,
  headers = [],
  onPageChange = () => {},
  onDelete = () => {},
  onSelectItem = () => {},
  selectedItems = [],
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState(selectedItems);

  useEffect(() => {
    setSelected(selectedItems);
  }, [selectedItems]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortItems = (items, comparator) => {
    const stabilizedItems = items.map((el, index) => [el, index]);
    stabilizedItems.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedItems.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = items.map((n) => `${n.userId}|${n.createdAt}`);
      setSelected(newSelecteds);
      onSelectItem(newSelecteds);
      return;
    }
    setSelected([]);
    onSelectItem([]);
  };

  const handleClick = (event, userId, createdAt) => {
    const id = `${userId}|${createdAt}`;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    onSelectItem(newSelected);
  };

  const isSelected = (userId, createdAt) => selected.indexOf(`${userId}|${createdAt}`) !== -1;

  const renderData = (dataKey, data) => {
    if (!data) return null;

    if (dataKey === "avatar") {
      return <img width={35} src={data[dataKey]} alt="avatar" />;
    } else if (dataKey === "actions") {
      const isItemSelected = isSelected(data.userId, data.createdAt);
      return (
        <Checkbox
          checked={isItemSelected}
          onChange={(event) => handleClick(event, data.userId, data.createdAt)}
          color="primary"
        />
      );
    } else {
      if (dataKey.includes(".")) {
        const keys = dataKey.split(".");
        return <>{data[keys[0]] ? data[keys[0]][keys[1]] : null}</>;
      } else {
        return <>{data[dataKey]}</>;
      }
    }
  };

  const sortedItems = sortItems(items, getComparator(order, orderBy));
  const paginatedItems = sortedItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const headerCount = headers.length;

  return (
    <ThemeProvider theme={theme}>
      <Paper style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={styles.headerCell}>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < items.length}
                  checked={items.length > 0 && selected.length === items.length}
                  onChange={handleSelectAllClick}
                  color="primary"
                />
              </TableCell>
              {headers.length > 0 &&
                headers.map((header, index) => (
                  <TableCell
                    key={header}
                    component="th"
                    style={styles.headerCell}
                  >
                    <TableSortLabel
                      active={orderBy === dataKeys[index]}
                      direction={orderBy === dataKeys[index] ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, dataKeys[index])}
                    >
                      {header}
                    </TableSortLabel>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, index) => {
                const isItemSelected = isSelected(item.userId, item.createdAt);
                const rowStyle = index % 2 === 0 ? styles.tableCell : styles.alternateTableCell;
                return (
                  <TableRow
                    key={`${item.userId}|${item.createdAt}`}
                    hover
                    onClick={(event) => handleClick(event, item.userId, item.createdAt)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    selected={isItemSelected}
                    style={rowStyle}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, item.userId, item.createdAt)}
                        color="primary"
                      />
                    </TableCell>
                    {dataKeys.map((dataKey) => (
                      <TableCell
                        key={dataKey}
                        component="th"
                        style={styles.columns.width10}
                      >
                        {renderData(dataKey, item)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={headerCount} style={{ textAlign: "center" }}>
                  No Data Available
                </TableCell>
              </TableRow>
            )}
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
}

export default DataTable;
