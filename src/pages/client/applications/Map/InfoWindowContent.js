import React from 'react';
import styles from './map.module.css';
import { CircularProgress } from '@mui/material';
import { nFormatter } from 'src/utilities/numbers/nFormatter';

const InfoWindowContent = ({ projectDetails, setOpenSubmitForm, loading }) => {
  return (
    <div
      className={styles.info_window_wrapper}
      style={{ font: '12px/20px Helvetica Neue,Arial,Helvetica,sans-serif' }}
    >
      {loading && (
        <CircularProgress className={styles.absolute_centerd_element} />
      )}
      <img
        className={styles.logo_img}
        src={`${process.env.REACT_APP_OLD_DOMAIN_URL}/app/pl/${projectDetails?.project?.logo}`}
        alt=""
      />
      {projectDetails?.project?.units?.total > 0 ? (
        <>
          <div
            style={{
              fontSize: '1rem!important',
              marginBottom: ' 0.1rem',
              color: 'white',
              marginTop: ' 0.5rem'
            }}
          >
            empoweromics partners
          </div>
          <div
            style={{
              fontSize: '1.8rem',
              fontWight: '500',
              lineHeight: '1.2'
            }}
          >
            Earn{' '}
            {nFormatter(
              Number(projectDetails?.project?.units?.avg?.priceBase) * 0.0016
            )}{' '}
            NET Cash
          </div>
          <button
            onClick={() => {
              setOpenSubmitForm(true);
            }}
            type="button"
            className={styles.btn + ' ' + styles.btn_success}
            style={{ margin: '10px auto' }}
          >
            Submit Opportunity
          </button>
          <div className={styles.InfoWindowContent_footer}>
            *Average commission in EGP on currently available units at
            {projectDetails?.project?.i18n?.en?.name}
            {projectDetails?.project?.developer.name}
          </div>
        </>
      ) : (
        <>
          {projectDetails?.project?.developer.name && (
            <div style={{ textTransform: 'capitalize' }}>
              {projectDetails?.project?.i18n?.en?.name}{' '}
              {projectDetails?.project?.area} (
              {projectDetails?.project?.developer.name})
            </div>
          )}{' '}
          {projectDetails?.project?.developer.name && (
            <div> -{projectDetails?.project?.state}</div>
          )}
        </>
      )}
    </div>
  );
};

export { InfoWindowContent };
