import { Button, Rating } from '@mui/material';
import styles from './oppDialog.module.css';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import emLogo from '../../../../assets/images/dark_emp_logo.png';
import { SeeMoreComponent } from 'src/components/SeeMore/seeMoreComponent';

const ProjectDetails = ({ setRenderedComponent, projectDetails }) => {
  return (
    <div className={styles.project_details_wrapper}>
      <div className={styles.project_header_wrapper}>
        <div className={styles.right_header_sec}>
          <div className={styles.logo_wrapper}>
            <img
              alt=""
              style={{ width: '100%' }}
              src={
                projectDetails?.logo
                  ? `${process.env.REACT_APP_OLD_DOMAIN_URL}/app/pl/${projectDetails?.logo}`
                  : emLogo
              }
            />
          </div>
          <div style={{ marginLeft: '15px', fontWeight: 'bold' }}>
            <div> {projectDetails?.i18n?.en?.name}</div>
            <div> {projectDetails?.developer.name}</div>
            <div> {projectDetails?.state}</div>
            <div> {projectDetails?.units.total} Units</div>
            <Rating
              name="read-only"
              value={projectDetails?.rating || 0}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
        {/*  */}
        <div className={styles.pricing_sec_wrapper}>
          <div>
            <CheckCircleTwoToneIcon sx={{ color: '#155724', margin: '10px' }} />
          </div>
          <div>
            <div>
              Starting:{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {projectDetails?.units?.start?.priceBase.toLocaleString()} EGP
              </span>{' '}
              for{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {projectDetails?.units?.start?.spaceBuildUp}
              </span>{' '}
              sqm
            </div>
            <div>
              Average:{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {projectDetails?.units?.avg?.priceBase.toLocaleString()}
              </span>{' '}
              / sqm
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      {/*  */}

      <div className={styles.project_desc}>
        <SeeMoreComponent text={projectDetails?.i18n?.en?.description} />
      </div>
      {/*  */}
      {projectDetails?.units.total ? (
        <Button
          style={{ marginTop: '10px' }}
          onClick={() => {
            setRenderedComponent('Submit-Opp');
          }}
        >
          Submit Opportunity
        </Button>
      ) : null}
    </div>
  );
};

export { ProjectDetails };
