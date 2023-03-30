import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useState } from 'react';
import Form from './Form';

function PageHeader() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Transactions
          </Typography>
          <Typography variant="subtitle2">
            Get empowered & Start selling
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={handleClickOpen}
          >
            Submit Transaction
          </Button>
        </Grid>
      </Grid>
      {open && <Form open={open} handleClose={handleClose} />}
    </>
  );
}

export default PageHeader;
