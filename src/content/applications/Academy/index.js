import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import axios from 'axios';
import { useEffect } from 'react';

function AcademyPage() {
  const getAccademyData=async()=>{
    try{
    const res=await axios('https://www.coderrocketfuel.com/article/embed-a-vimeo-video-into-a-react-website')
console.log(res);
  }
  catch(e){
console.log(e);
  }
  }
  useEffect(() => {
                                                                                                          
    getAccademyData()
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
