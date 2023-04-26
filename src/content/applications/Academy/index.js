import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import { useEffect } from 'react';

function AcademyPage() {
  const getAccademyData = async () => {
    try {
      const res = await axiosClient('/master/academy');
      console.log(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAccademyData();
  }, []);
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
