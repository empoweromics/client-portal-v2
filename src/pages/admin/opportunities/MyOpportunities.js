import { Card, LinearProgress } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { useEffect, useState } from 'react';
import axiosAdmin from 'src/utilities/axios/adminIntercept';

function MyOpportunities() {
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
      <RecentOrdersTable Opportunities={opportunitiesList} />
    </Card>
  );
}

export default MyOpportunities;
