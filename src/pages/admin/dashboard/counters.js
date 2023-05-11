import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosAdmin from 'src/utilities/axios/adminIntercept';

export default function DashboardCounters() {
  const [counters, setCounters] = useState({
    opportunity: '0',
    opportunityToday: '0',
    empToday: '0'
  });
  // ----------------------------------------------------------------------------------------------
  const getAccount = async () => {
    try {
      const res = await axiosAdmin('/dashboard');
      setCounters(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    getAccount();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Total opportunities
            </Typography>
            <Box mt={2}>
              <Typography variant="h4">{counters.opportunity}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Today opportunities
            </Typography>
            <Box mt={2}>
              <Typography variant="h4">{counters.opportunityToday}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              EMP Today
            </Typography>
            <Box mt={2}>
              <Typography variant="h4">{counters.empToday}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Total Properties
            </Typography>
            <Box mt={2}>
              <Typography variant="h4">200</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
