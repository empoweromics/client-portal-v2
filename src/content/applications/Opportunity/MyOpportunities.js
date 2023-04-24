import { Card, LinearProgress } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { useEffect, useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';

function MyOpportunities() {
  const [opportunitiesList, setOpportunitiesList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const axios = await axiosClient.get('/opportunity');
    setOpportunitiesList(axios.data.data);
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
