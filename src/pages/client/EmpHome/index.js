import React, { useState } from 'react';
import IntroCard from './IntroCard';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import EMPDeveloperSection from './stepper/pages/Developer';
import EMPProjectSection from './stepper/pages/Project';
import EMPUnitSection from './stepper/pages/Unit';
import EMPFinancialsSection from './stepper/pages/Financials';
import { Helmet } from 'react-helmet-async';
import axiosClient from 'src/utilities/axios/axiosIntercept';

export default function EmpHome() {
  const [empData, setEmpData] = useState();
  const [isloading, setIsloading] = useState(true);
  const { id } = useParams();
  // ------------------------------------------------------------------------------------------------
  const getEmpData = async () => {
    try {
      const res = await axiosClient.get(`/public/emp/${id}`);
      setEmpData(res.data);
      setIsloading(false);
    } catch (e) {
      console.log(e);
    }
  };
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    getEmpData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Comparative Market Analysis دراسة السوق حسب طلبكم</title>
      </Helmet>
      {isloading ? (
        <>
          <Alert severity="success">Page Loading ...</Alert>
          <CircularProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'transulate(-50%,-50%)'
            }}
          />
        </>
      ) : (
        <>
          <IntroCard empData={empData} />
          <EMPDeveloperSection empData={empData} />
          <EMPProjectSection empData={empData} />
          <EMPUnitSection empData={empData} />
          <EMPFinancialsSection empData={empData} />{' '}
        </>
      )}
    </>
  );
}
