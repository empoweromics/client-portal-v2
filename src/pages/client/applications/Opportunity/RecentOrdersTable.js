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
  CardHeader,
  Avatar,
  Grid
} from '@mui/material';

import Label from 'src/components/Label';

import { nFormatter } from 'src/utilities/numbers/nFormatter';

const getStatusLabel = (Opportunitiestatus) => {
  const map = {
    failure: {
      text: 'Failure',
      color: 'error'
    },
    success: {
      text: 'Completed',
      color: 'success'
    },
    pendding: {
      text: 'In review',
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
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All status'
    },
    {
      id: 'pendding',
      name: 'In review'
    },
    {
      id: 'closed',
      name: 'Closed'
    },
    {
      id: 'success',
      name: 'Open'
    },
    {
      id: 'failure',
      name: 'Failure'
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

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Refrance</TableCell>
              <TableCell>Project Name</TableCell>

              <TableCell>Client</TableCell>
              <TableCell align="right">Budget</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOpportunities.map((Opportunity) => {
              return (
                <TableRow hover key={Opportunity._id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Opportunity._id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Avatar
                          variant="square"
                          alt="Remy Sharp"
                          src={
                            process.env.REACT_APP_OLD_DOMAIN_URL +
                            '/app/pl/' +
                            Opportunity.project.logo
                          }
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {Opportunity.project.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Opportunity.client.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {Opportunity.client.phone}
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
                      {nFormatter(Opportunity.budget.downpayment)}- Down payment
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {nFormatter(Opportunity.budget.installmentAmountDue)}-
                      installment
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(Opportunity.status)}
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
