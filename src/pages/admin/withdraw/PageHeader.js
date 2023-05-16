import { Typography, Grid } from '@mui/material';

function PageHeader() {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Withdraw Requests
          </Typography>
          <Typography variant="subtitle2">
            Get empowered & Start selling
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
