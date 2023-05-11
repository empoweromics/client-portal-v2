import { Typography, Grid } from '@mui/material';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          eMP tool
        </Typography>
        <Typography variant="subtitle2">
          Propose ideal properties to your clients in seconds! Using our eMP
          tool, empoweromics autogenerates live comparisons between properties,
          projects, and payment plans to close your deals faster and more
          effectively.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
