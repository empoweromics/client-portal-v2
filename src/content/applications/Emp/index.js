import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { EmpForm } from './EmpForm';
import { EmpTable } from './empTable';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';

function EmpPage() {
  const [empLinks, setEmpLinks] = useState([]);
  // ----------------------------------------------------------------------------------------------
  const getLinks = async () => {
    try {
      const res = await axiosClient(`/client/emp`)
      setEmpLinks(res.data.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    getLinks()
  }, []);
  // ----------------------------------------------------------------------------------------------
  return (
    <>
      <Helmet>
        <title>eMP tool</title>
      </Helmet>

      <PageTitleWrapper >
        <PageHeader />
        <EmpForm setEmpLinks={setEmpLinks}/>
        <EmpTable setEmpLinks={setEmpLinks} empLinks={empLinks} />
      </PageTitleWrapper>
    </>
  );
}

export default EmpPage;
