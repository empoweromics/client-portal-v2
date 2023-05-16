import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import RecentActivity from './RecentActivity';
import { useEffect, useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import { OverviewContext } from 'src/contexts/OverviewContext';

function DashboardCrypto() {
  const [account, setAccount] = useState({
    balance: '0',
    currency: 'EGP',
    opportunity: [],
    academy: []
  });
  // ----------------------------------------------------------------------------------------------
  const getAccount = async () => {
    try {
      const res = await axiosClient('/account');
      setAccount(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    getAccount();
  }, []);
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
          <OverviewContext.Provider value={account}>
            <Grid item lg={7} xs={12}>
              <AccountBalance />
            </Grid>
            <Grid item lg={5} xs={12}>
              <RecentActivity />
            </Grid>
          </OverviewContext.Provider>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default DashboardCrypto;
