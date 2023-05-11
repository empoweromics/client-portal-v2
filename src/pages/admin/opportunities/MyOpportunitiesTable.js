import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosAdmin from 'src/utilities/axios/adminIntercept';
import DataTable from 'react-data-table-component';
import { ArrowDownward } from '@mui/icons-material';
import { nFormatter } from 'src/utilities/numbers/nFormatter';
// import { nFormatter } from 'src/utilities/numbers/nFormatter';

const columns = [
  {
    name: 'ID',
    sortable: true,
    selector: (row) => row._id
  },
  {
    name: 'Partner name',
    selector: (row) => row.user?.displayName
  },
  {
    name: 'Partner phone',
    selector: (row) => row.user?.phone
  },
  {
    name: 'Client name',
    selector: (row) => row.client?.name
  },
  {
    name: 'Client name',
    selector: (row) => row.client?.name
  },
  {
    name: 'Project',
    selector: (row) => row.project?.name
  },
  {
    name: 'Downpayment',
    sortable: true,
    format: (row) => nFormatter(row.budget?.downpayment),
    selector: (row) => row.budget?.downpayment
  },
  {
    name: 'Installment',
    sortable: true,
    format: (row) => nFormatter(row.budget?.installmentAmountDue),
    selector: (row) => row.budget?.installmentAmountDue
  }
];

export default function MyOpportunitiesTable() {
  const [opportunitiesList, setOpportunitiesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const conditionalRowStyles = [
    {
      when: (row) => row.status === 'success',
      style: {
        backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    {
      when: (row) => row.status === 'failure',
      style: {
        backgroundColor: 'rgba(248, 148, 6, 0.9)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer'
        }
      }
    }
  ];

  useEffect(async () => {
    setLoading(true);
    const axios = await axiosAdmin.get('/opportunity');
    setOpportunitiesList(axios.data);
    if (axios.data) {
      setLoading(false);
    }
  }, []);
  const sortIcon = <ArrowDownward />;

  return (
    <Card>
      <DataTable
        progressPending={loading}
        pagination
        sortIcon={sortIcon}
        columns={columns}
        data={opportunitiesList}
        conditionalRowStyles={conditionalRowStyles}
        defaultSortFieldId={1}
        persistTableHead
      />
    </Card>
  );
}
