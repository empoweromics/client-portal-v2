import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

export default function DashboardCounters() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Total opportunities
            </Typography>
            <Box mt={2}>
              <Typography variant="h4">160</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              deal opportunities
            </Typography>
            <Box mt={2}>
              <Typography variant="h4">19</Typography>
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
