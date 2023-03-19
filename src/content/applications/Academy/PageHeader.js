import { Typography, Grid } from '@mui/material';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          empoweromics Academy
        </Typography>
        <Typography variant="subtitle2">
          One of the many benefits we offer our community is the empoweromics
          academy. All empoweromics members can partake in a free seven-level
          Real Estate training program that covers subjects including:
          Introduction to Sales, Sales Cycle, Prospecting, Psychology,
          Professionalism, and After Sales.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
