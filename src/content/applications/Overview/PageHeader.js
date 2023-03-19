import { Typography, Avatar, Grid, useTheme } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';

function PageHeader() {
  const { state } = useContext(UserContext);
  // const user = {
  //   name: 'Omar Fateen',
  //   avatar: '/static/images/avatars/1.jpg'
  // };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={state.user?.name}
          src={state.user?.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {state.user?.name}!
        </Typography>
        <Typography variant="subtitle2">
          Your account is now set up and you’ve successfully reserved your spot.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
