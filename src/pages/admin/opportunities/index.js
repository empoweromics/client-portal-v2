import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AllOpportunities from './AllOpportunities';

export default function AdminOpportunity() {
  return (
    <>
      <Helmet>
        <title>Opportunity</title>
      </Helmet>
      <PageTitleWrapper>
        <AllOpportunities />
      </PageTitleWrapper>

      <Footer />
    </>
  );
}
