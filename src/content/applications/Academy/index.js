import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';

function AcademyPage() {
  return (
    <>
      <Helmet>
        <title>Academy Page</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
    </>
  );
}

export default AcademyPage;
