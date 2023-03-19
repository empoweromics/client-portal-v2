import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import TopDeveloper from './TopDeveloper';
import RecentActivity from './RecentActivity';

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>empoweromics Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item lg={7} xs={12}>
            <AccountBalance />
          </Grid>
          <Grid item lg={5} xs={12}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12}>
            <TopDeveloper />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default DashboardCrypto;
