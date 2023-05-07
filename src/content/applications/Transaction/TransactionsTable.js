import { useState } from 'react';

import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';

const getStatusLabel = (Transactionstatus) => {
  const map = {
    debit: {
      text: 'debit',
      color: 'error'
    },
    credit: {
      text: 'credit',
      color: 'success'
    }
  };

  const { text, color } = map[Transactionstatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (Transactions, filters) => {
  return Transactions.filter((Transaction) => {
    let matches = true;

    if (filters.status && Transaction.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (Transactions, page, limit) => {
  return Transactions.slice(page * limit, page * limit + limit);
};

const TransactionsTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({
    type: null
  });

  const typeOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'credit',
      name: 'credit'
    },
    {
      id: 'debit',
      name: 'debit'
    }
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      type: value
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const filteredTransactions = applyFilters(data, filters);
  const paginatedTransactions = applyPagination(filteredTransactions, page, 10);

  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || 'all'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth
              >
                {typeOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Recent Transactions"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reference ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>details</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((transaction) => {
              return (
                <TableRow hover key={transaction._id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction._id}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction.amount} EGP
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getStatusLabel(transaction.type)}
                    </Typography>
                    {
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {transaction.details}
                      </Typography>
                    }
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {/* {numeral(transaction.downPayment).format(`0,0`)} EGP- Down */}
                      {transaction.createdAt}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredTransactions.length}
          onPageChange={handlePageChange}
          page={page}
          rowsPerPage={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>
    </Card>
  );
};

TransactionsTable.propTypes = {
  data: PropTypes.array.isRequired
};

TransactionsTable.defaultProps = {
  data: []
};

export default TransactionsTable;
