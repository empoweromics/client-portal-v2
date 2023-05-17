import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { DeleteConfirmationDialog } from './deleteConfirmationDialog';
import { TablePagination } from '@mui/material';
import moment from 'moment';

const EmpTable = ({ empLinks, setEmpLinks }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <TableContainer component={Paper}>
      {/* <div style={{padding:'15px'}}>Top-performing Real Estate Agents</div>  */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Views</TableCell>
            {/* <TableCell>Copy</TableCell> */}
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empLinks
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((el, i) => (
              <TableRow key={i}>
                <TableCell>
                  <a
                    style={{ textDecoration: 'none' }}
                    target="_blanck"
                    href={`/emp/${el._id}`}
                  >
                    {el.inputs?.clientname}
                  </a>
                </TableCell>
                <TableCell>{moment(el.createdAt).fromNow()}</TableCell>

                <TableCell>{el.views}</TableCell>
                <TableCell>
                  <DeleteConfirmationDialog
                    setEmpLinks={setEmpLinks}
                    id={el._id}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={empLinks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </TableContainer>
  );
};

export { EmpTable };
