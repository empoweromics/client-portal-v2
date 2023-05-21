import { useEffect, useState } from 'react';
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
    <p>
      Copyright Ⓒ {apiCheck.copyright} version {apiCheck.version}
    </p>
  );
}

export default Copyright;
