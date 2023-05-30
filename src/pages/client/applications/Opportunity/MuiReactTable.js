import React, { useMemo } from 'react';

// MRT Imports
// import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from 'material-react-table';

// Material UI Imports
import { Stack, Chip, Box, Typography } from '@mui/material';
import { nFormatter } from 'src/utilities/numbers/nFormatter';

const MuiReactTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
        enableClickToCopy: true,
        size: 150
      },
      {
        accessorKey: 'client.name',
        header: 'client Name',
        size: 150
      },
      {
        accessorKey: 'client.phone',
        header: 'client Phone',
        size: 150
      },
      {
        accessorKey: 'createdAt',
        header: 'Timestamp',
        size: 150
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
      enableColumnOrdering
      enableGrouping
      enablePinning
      renderDetailPanel={renderDetailPanelFunction}
    />
  );
};

export default MuiReactTable;
