import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';
import DashboardCounters from './counters';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>empoweromics Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <DashboardCounters />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <h2>Admin dashboard </h2>
      </Container>
      <Footer />
    </>
  );
}

export default AdminDashboard;
