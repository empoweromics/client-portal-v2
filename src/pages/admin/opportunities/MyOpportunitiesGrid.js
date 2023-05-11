import { Card, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosAdmin from 'src/utilities/axios/adminIntercept';
import { DataGrid } from '@mui/x-data-grid';
import { nFormatter } from 'src/utilities/numbers/nFormatter';

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  {
    field: 'user',
    valueGetter: ({ value }) => value?.displayName,
    headerName: 'Partner name',
    width: 130
  },
  {
    field: 'user',
    valueGetter: ({ value }) => value?.email,
    headerName: 'Partner Email',
    width: 130
  },
  {
    field: 'client',
    valueGetter: ({ value }) => value.name,
    headerName: 'Client name',
    width: 130
  },

  {
    field: 'client',
    headerName: 'Client phone',
    renderCell: ({ row }) => {
      return <div className="rowitem">{row.client.phone}</div>;
    },
    sortable: false,
    width: 130
  },
  {
    field: 'project',
    valueGetter: ({ value }) => value.name,
    headerName: 'Project name',
    width: 130
  },

  {
    field: 'budget',
    description: 'This column has a value for a budget downpayment.',
    headerName: 'Downpayment',
    valueGetter: ({ value }) => nFormatter(value.downpayment),
    width: 120
  }
];

export default function MyOpportunitiesGrid() {
  const [opportunitiesList, setOpportunitiesList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const axios = await axiosAdmin.get('/opportunity');
    setOpportunitiesList(axios.data);
    if (axios.data) {
      setLoading(false);
    }
  }, []);

  return (
    <Card>
      {loading && <LinearProgress />}
      <DataGrid
        getRowId={(row) => row._id}
        rows={opportunitiesList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      {/* <RecentOrdersTable Opportunities={opportunitiesList} /> */}
    </Card>
  );
}
