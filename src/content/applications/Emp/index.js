import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { EmpForm } from './EmpForm';
import { EmpTable } from './empTable';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import { CircularProgress } from '@mui/material';
import styles from './emp.module.css';

function EmpPage() {
  const [empLinks, setEmpLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // ----------------------------------------------------------------------------------------------
  const getLinks = async () => {
    setIsLoading(true);
    try {
      const res = await axiosClient(`/emp`);
      console.log(res.data);
      setEmpLinks(res.data.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    getLinks();
  }, []);
  // ----------------------------------------------------------------------------------------------
  return (
    <>
      <Helmet>
        <title>eMP tool</title>
      </Helmet>
      {isLoading && <CircularProgress className={styles.centerd_element} />}

      <PageTitleWrapper>
        <PageHeader />
        <EmpForm getLinks={getLinks} isLoading={isLoading} />
        {empLinks.length > 0 && (
          <EmpTable
            setEmpLinks={setEmpLinks}
            empLinks={empLinks}
            isLoading={isLoading}
          />
        )}
      </PageTitleWrapper>
    </>
  );
}

export default EmpPage;
