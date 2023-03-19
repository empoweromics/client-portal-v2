import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';

function EmpPage() {
  return (
    <>
      <Helmet>
        <title>eMP tool</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
    </>
  );
}

export default EmpPage;
