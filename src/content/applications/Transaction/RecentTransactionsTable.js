import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
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
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

const getStatusLabel = (Transactionstatus) => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    success: {
      text: 'Success',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
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

const RecentTransactionsTable = ({ Transactions }) => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const selectedBulkActions = selectedTransactions.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'success',
      name: 'Success'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllTransactions = (event) => {
    setSelectedTransactions(
      event.target.checked
        ? Transactions.map((Opportunity) => Opportunity.id)
        : []
    );
  };

  const handleSelectOneTransaction = (event, OpportunityId) => {
    if (!selectedTransactions.includes(OpportunityId)) {
      setSelectedTransactions((prevSelected) => [
        ...prevSelected,
        OpportunityId
      ]);
    } else {
      setSelectedTransactions((prevSelected) =>
        prevSelected.filter((id) => id !== OpportunityId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredTransactions = applyFilters(Transactions, filters);
  const paginatedTransactions = applyPagination(
    filteredTransactions,
    page,
    limit
  );
  const selectedSomeTransctions =
    selectedTransactions.length > 0 &&
    selectedTransactions.length < Transactions.length;
  const selectedAllTransactions =
    selectedTransactions.length === Transactions.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
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
                  {statusOptions.map((statusOption) => (
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
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllTransactions}
                  indeterminate={selectedSomeTransctions}
                  onChange={handleSelectAllTransactions}
                />
              </TableCell>
              {/* <TableCell>Transaction ID</TableCell> */}
              <TableCell>Reference ID</TableCell>

              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>

              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((transaction) => {
              const isTransactionselected = selectedTransactions
                .includes
                // transaction.id
                ();
              return (
                <TableRow
                  hover
                  key={transaction._id}
                  selected={isTransactionselected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isTransactionselected}
                      onChange={(event) =>
                        handleSelectOneTransaction(event, transaction._id)
                      }
                      value={isTransactionselected}
                    />
                  </TableCell>
                  {/* <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction._id}
                    </Typography>
                  </TableCell> */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      ... {transaction.ref.slice(-10)}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap> */}
                    {/* {format(transaction.orderDate, 'MMMM dd yyyy')} */}
                    {/* </Typography> */}
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {transaction.amaount} {transaction.currency}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {transaction.currency}
                    </Typography> */}
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
                      {transaction.method.replace('_', ' ')}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(transaction.installment).format(`0,0.00`)} EGP -
                      installment / Monthlly
                    </Typography> */}
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
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(transaction.installment).format(`0,0.00`)} EGP -
                      installment / Monthlly
                    </Typography> */}
                  </TableCell>
                  <TableCell>{getStatusLabel(transaction.status)}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentTransactionsTable.propTypes = {
  Transactions: PropTypes.array.isRequired
};

RecentTransactionsTable.defaultProps = {
  Transactions: []
};

export default RecentTransactionsTable;
