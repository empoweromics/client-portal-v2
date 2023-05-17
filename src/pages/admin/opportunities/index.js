import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import RecentOrdersTable from './RecentOrdersTable';
import { Container, Grid } from '@mui/material';

export default function AdminOpportunity() {
  return (
    <>
      <Helmet>
        <title>Opportunity</title>
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
          {' '}
          <RecentOrdersTable />
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
