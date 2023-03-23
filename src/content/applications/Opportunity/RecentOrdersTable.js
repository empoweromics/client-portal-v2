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

const getStatusLabel = (Opportunitiestatus) => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color } = map[Opportunitiestatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (Opportunities, filters) => {
  return Opportunities.filter((Opportunity) => {
    let matches = true;

    if (filters.status && Opportunity.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (Opportunities, page, limit) => {
  return Opportunities.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = ({ Opportunities }) => {
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const selectedBulkActions = selectedOpportunities.length > 0;
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
      id: 'closed',
      name: 'Closed'
    },
    {
      id: 'open',
      name: 'Open'
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

  const handleSelectAllOpportunities = (event) => {
    setSelectedOpportunities(
      event.target.checked
        ? Opportunities.map((Opportunity) => Opportunity.id)
        : []
    );
  };

  const handleSelectOneOpportunity = (event, OpportunityId) => {
    if (!selectedOpportunities.includes(OpportunityId)) {
      setSelectedOpportunities((prevSelected) => [
        ...prevSelected,
        OpportunityId
      ]);
    } else {
      setSelectedOpportunities((prevSelected) =>
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

  const filteredOpportunities = applyFilters(Opportunities, filters);
  const paginatedOpportunities = applyPagination(
    filteredOpportunities,
    page,
    limit
  );
  const selectedSomeOpportunities =
    selectedOpportunities.length > 0 &&
    selectedOpportunities.length < Opportunities.length;
  const selectedAllOpportunities =
    selectedOpportunities.length === Opportunities.length;
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
          title="Recent Opportunities"
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
                  checked={selectedAllOpportunities}
                  indeterminate={selectedSomeOpportunities}
                  onChange={handleSelectAllOpportunities}
                />
              </TableCell>
              <TableCell>Opportunity ID</TableCell>
              <TableCell>Project Name</TableCell>

              <TableCell>Client</TableCell>
              <TableCell align="right">Budget</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOpportunities.map((Opportunity) => {
              const isOpportunitieselected = selectedOpportunities.includes(
                Opportunity.id
              );
              return (
                <TableRow
                  hover
                  key={Opportunity.id}
                  selected={isOpportunitieselected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isOpportunitieselected}
                      onChange={(event) =>
                        handleSelectOneOpportunity(event, Opportunity.id)
                      }
                      value={isOpportunitieselected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Opportunity.opportunityID}
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
                      {Opportunity.projectName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(Opportunity.orderDate, 'MMMM dd yyyy')}
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
                      {Opportunity.clientName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {Opportunity.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {numeral(Opportunity.downPayment).format(`0,0`)} EGP- Down
                      payment
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(Opportunity.installment).format(`0,0.00`)} EGP -
                      installment / Monthlly
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(Opportunity.status)}
                  </TableCell>
                  <TableCell align="right">
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
          count={filteredOpportunities.length}
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

RecentOrdersTable.propTypes = {
  Opportunities: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  Opportunities: []
};

export default RecentOrdersTable;