import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import { useEffect, useState } from 'react';
import { VideoSection } from './video';
import styles from './academy.module.css';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';

function AcademyPage() {
  const [videos, setVideos] = useState([]);
  const [Isloading, setIsloading] = useState(false);
  const navigate=useNavigate()
    // ----------------------------------------------------------------------------------------------

  const getAccademyData = async () => {
    setIsloading(true)
    try {
      const res = await axiosClient('/master/academy');
      setVideos(res.data)
    } catch (e) {
      console.log(e);
    }
    setIsloading(false)

  };
  // ----------------------------------------------------------------------------------------------
  const navigateToEmp=()=>{
    navigate('/go/map')
  }
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    getAccademyData();
  }, []);
  return (
    <>
     <CircularProgress className={styles.absolute_centerd_element} />
      <Helmet>
        <title>Academy Page</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
        {videos.map(video => {
          return <VideoSection video={video} key={video._id} />
        })}
        <button className={styles.check_emp_button} onClick={navigateToEmp} type='button'> Click  here to Check our emp </button>
      </PageTitleWrapper>
    </>
  );
}

export default AcademyPage;
