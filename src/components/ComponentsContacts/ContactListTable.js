import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const ContactListsTable = ({ lists, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Listas</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {lists.map((list) => (
          <TableRow key={list._id}>
            <TableCell>{list.listName}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(list.listName)} color="primary">
                Editar
              </Button>
              <Button onClick={() => onDelete(list.listName)} color="secondary">
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactListsTable;
