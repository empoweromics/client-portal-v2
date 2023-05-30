import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import MuiReactTable from './MuiReactTable';

export default function MyOpportunities() {
  const [opportunitiesList, setOpportunitiesList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const axios = await axiosClient.get('/opportunity');
    setOpportunitiesList(axios.data);
    if (axios.data) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <LinearProgress />;
  }
  // If user is logged out
  return <MuiReactTable data={opportunitiesList} />;
}
