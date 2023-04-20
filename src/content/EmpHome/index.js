import React, { useState } from 'react';
import StepperPages from './stepper/Stepper';
import IntroCard from './IntroCard';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

export default function EmpHome() {
  const [empData, setEmpData] = useState();
  const [isloading, setIsloading] = useState(false);
  const { id } = useParams();
  // ------------------------------------------------------------------------------------------------
  const getEmpData = async () => {
    setIsloading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_DEVELOP_URL}/client/public/emp/${id}`
      );
      setEmpData(res.data);
    } catch (e) {
      console.log(e);
    }
    setIsloading(false);
  };
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    getEmpData();
  }, []);

  return (
    <>
      {isloading && (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'transulate(-50%,-50%)'
          }}
        />
      )}
      <IntroCard empData={empData} />
      <StepperPages empData={empData} />
    </>
  );
}
