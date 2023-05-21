import * as React from 'react';
import Grid from '@mui/material/Grid';
import SignIn from './auth/basic/Signin';
import Copyright from './auth/copyright';
import { Box } from '@mui/material';
import Logo from 'src/components/LogoSign';
import SocialList from './auth/social';

export default function HomePage() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://empoweromics.s3.amazonaws.com/images/2980960.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Logo />

          <SignIn />
          {/* <SocialList /> */}
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
