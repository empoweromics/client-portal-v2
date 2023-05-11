import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import MyOpportunitiesTable from './MyOpportunitiesTable';

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
          <Grid item xs={12}>
            <MyOpportunitiesTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
