import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';

export default function AdminAcademy() {
  return (
    <>
      <Helmet>
        <title>Admin Academy</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Footer />
    </>
  );
}
