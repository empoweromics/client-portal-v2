import React, { useMemo } from 'react';

// MRT Imports
// import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from 'material-react-table';

// Material UI Imports
import {
  Box,
  Stack,
  Chip,
  ListItemIcon,
  MenuItem,
  Typography
} from '@mui/material';

// Icons Imports
import { Check, Clear } from '@mui/icons-material';
import { nFormatter } from 'src/utilities/numbers/nFormatter';
// Mock Data
const MuiReactTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: '_id', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        header: 'Id',
        size: 100
      },
      {
        accessorKey: 'user.displayName', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: 'Partner',
        size: 100
      },
      {
        accessorKey: 'createdAt', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        header: 'createdAt',
        size: 100
      }
    ],
    []
  );

  const renderDetailPanelFunction = ({ row }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}
    >
      <img
        alt="avatar"
        height={100}
        src={
          process.env.REACT_APP_OLD_DOMAIN_URL +
          '/app/pl/' +
          row.original.project.logo
        }
        loading="lazy"
        style={{ borderRadius: '50%' }}
      />
      <Stack direction="row" spacing={1}>
        <Chip label={row.original.createdAt.substr(0, 10)} color="primary" />
        <Chip
          label={row.original.status}
          color={
            row.original.status === 'failure'
              ? 'error'
              : row.original.status === 'success'
              ? 'success'
              : 'warning'
          }
        />
      </Stack>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4">{row.original.client.name}</Typography>
        <Typography variant="h4">{row.original.client.phone}</Typography>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4">{row.original.project.name}</Typography>
        <hr />
        <Typography variant="h4">
          Downpayment : {nFormatter(row.original.budget.downpayment)}
        </Typography>
        <Typography variant="h4">
          Installment :{nFormatter(row.original.budget.installmentAmountDue)}
        </Typography>
        <Typography variant="h4">
          For :{row.original.budget.totalNumberOfInstallments} Months
        </Typography>
      </Box>
    </Box>
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableGrouping
      enablePinning
      enableRowActions
      initialState={{ showColumnFilters: true }}
      positionToolbarAlertBanner="bottom"
      renderDetailPanel={renderDetailPanelFunction}
      renderRowActionMenuItems={({ closeMenu }) => [
        <MenuItem
          key={0}
          onClick={() => {
            // View profile logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          Accept Opportunity
        </MenuItem>,
        <MenuItem
          key={1}
          onClick={() => {
            // Send email logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <Clear />
          </ListItemIcon>
          Close Opportunity
        </MenuItem>
      ]}
    />
  );
};

export default MuiReactTable;
