import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import TableData from './table';

export default function AdminWithdraw() {
  return (
    <>
      <Helmet>
        <title>Admin Withdraw</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <TableData />
      <Footer />
    </>
  );
}
