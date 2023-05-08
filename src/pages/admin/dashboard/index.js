import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container } from '@mui/material';
import Footer from 'src/components/Footer';

function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>empoweromics Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <h2>Admin dashboard </h2>
      </Container>
      <Footer />
    </>
  );
}

export default AdminDashboard;
