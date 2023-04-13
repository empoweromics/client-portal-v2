import styles from './projectDrawer.module.css';
import emLogo from '../../../../assets/images/dark_emp_logo.png';
import { Rating } from '@mui/material';

function handleError(event) {
  event.target.src = emLogo;
}
const ImgsSection = ({ projectDetails }) => {
  return (
    <div className={styles.header_imgs_wrapper}>
      <img
        onError={handleError}
        className={styles.cover_img}
        alt=""
        src={`https://empoweromics.com/app/pp/${projectDetails?.project?.logo}`}
      />
      <div className={` ${styles.upper_logo_wrapper}`}>
        <img
          alt=""
          src={`https://empoweromics.com/app/pl/${projectDetails?.project?.logo}`}
          className={styles.top_logo}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginY: '0' }} className={styles.sub_title_text}>
            By {projectDetails?.project?.i18n?.en?.name}
          </div>

          <div style={{ marginY: '0' }} className={styles.sub_title_text}>
            {' '}
            {projectDetails?.project?.state}
          </div>
        </div>
      </div>
      <div className={` ${styles.lower_logo_wrapper}`}>
        {/* <Rating
                    name="read-only"
                    value={projectDetails?.project?.rating || 0}
                    precision={0.5}
                    readOnly
                /> */}
        <div
          className={styles.sub_title_text}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}
        >
          By {projectDetails?.project?.developer_name}
          <Rating
            name="read-only"
            value={projectDetails?.project?.rating || 0}
            precision={0.5}
            readOnly
          />
        </div>
        {/* <img alt='' src={`https://empoweromics.com/app/dl/${projectDetails?.project?.developer?.split('-')[1]}`} className={styles.bottom_logo} /> */}
      </div>
      <div className={styles.sub_title_text + ' ' + styles.units_div}>
        {' '}
        {projectDetails?.project?.units?.totla} Units
      </div>
    </div>
  );
};

export { ImgsSection };
