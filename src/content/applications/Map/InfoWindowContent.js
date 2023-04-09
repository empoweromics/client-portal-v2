import React from 'react';
import styles from './map.module.css';
import { CircularProgress } from '@mui/material';

const InfoWindowContent = (
  { projectDetails,setOpenDialog ,loading}
) => {
  return (
    <div className={styles.info_window_wrapper} style={{ font: '12px/20px Helvetica Neue,Arial,Helvetica,sans-serif' }}>
                  {loading && <CircularProgress className={styles.absolute_centerd_element} />}
      <img className={styles.logo_img} src={`https://empoweromics.com/app/pl/${projectDetails?.project?._id?.split('-')[1]}`} alt='' />
      {projectDetails?.project?.units?.totla > 0 ? <><div style={{
        fontSize: '1rem!important',
        marginBottom: ' 0.1rem',
        color: 'white',
        marginTop: ' 0.5rem'
      }}>empoweromics partners</div>
        <div style={{
          fontSize: '1.8rem',
          fontWight: '500',
          lineHeight: '1.2'
        }}>Earn 186,749
          NET Cash</div>
        <button onClick={()=>{setOpenDialog(true)}} type='button' className={styles.btn + ' ' + styles.btn_success} style={{ margin: '10px auto' }}>Submit Opportunity</button>
        <div className={styles.InfoWindowContent_footer} >*Average commission in EGP on currently available units at
          *project Name*
          {projectDetails?.project?.developer_name}</div></>
          :<>
          
{projectDetails?.project?.developer_name&&   <div style={{textTransform:'capitalize'}}>*Project Name* {projectDetails?.project?.area} ({projectDetails?.project?.developer_name})</div>
}      {projectDetails?.project?.developer_name&&   <div> -{projectDetails?.project?.state}</div>}
          </>}
    </div >
  );
};

export { InfoWindowContent };
