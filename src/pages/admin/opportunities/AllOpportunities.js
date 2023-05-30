import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import MuiReactTable from './MuiReactTable';
import axiosAdmin from 'src/utilities/axios/adminIntercept';

export default function AllOpportunities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const axios = await axiosAdmin.get('/opportunity');
    setData(axios.data);
    setLoading(false);
  }, []);

  if (loading) {
    return <LinearProgress />;
  }
  // If user is logged out
  return <MuiReactTable data={data} />;
}
