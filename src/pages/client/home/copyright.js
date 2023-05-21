import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from 'src/utilities/axios/axiosIntercept';

function Copyright() {
  const [apiCheck, setApiCheck] = useState({
    status: '',
    copyright: '',
    version: '1.0.0',
    timestamp: ''
  });

  const getEmpData = async () => {
    try {
      const res = await axiosClient.get('/check');
      setApiCheck(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getEmpData();
  }, []);
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      Ⓒ {apiCheck.copyright} version {apiCheck.version}
      <Link color="inherit" href="https://empoweromics.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
