import { Helmet } from 'react-helmet-async';
import { Card, Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import DashboardCounters from './counters';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PieChart from './charts/opportunitiesStatusPieChart';
import BarChart from './charts/opportunitiesTimelineBarChart';

function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>empoweromics Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <DashboardCounters />
      </PageTitleWrapper>
      <Container>
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <PieChart />
            </Grid>
            <Grid item xs={12} md={8}>
              <BarChart />
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default AdminDashboard;
