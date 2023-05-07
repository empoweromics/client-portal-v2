import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, LinearProgress } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import TransactionsTable from './TransactionsTable';

function ApplicationsTransactions() {
  const [transactionsList, setTransactionsList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    const axios = await axiosClient.get('/transactions');
    setTransactionsList(axios.data);
    if (axios.data) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Transactions</title>
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
          spacing={3}
        >
          <Grid item xs={12}>
            {loading && <LinearProgress />}
            <TransactionsTable data={transactionsList} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
