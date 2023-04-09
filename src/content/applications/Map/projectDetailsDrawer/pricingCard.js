import styles from './projectDrawer.module.css';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
// import { SeeMoreComponent } from './seeMoreComponent';
// import emLogo from '../../../../assets/images/dark_emp_logo.png';

const PricingCard = ({projectDetails}) => {
    return (
        <div style={{ fontWeight: 'bold' }}>
        
         <div className={styles.pricing_sec_wrapper}>
          <div>
            <CheckCircleTwoToneIcon sx={{ color: '#155724', margin: '10px' }} />
          </div>
          <div>
            <div>
              Starting:{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {projectDetails?.project?.units?.start?.priceBase.toLocaleString()} EGP
              </span>{' '}
              for{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {projectDetails?.project?.units?.start?.spaceBuildUp}
              </span>{' '}
              sqm
            </div>
            <div>
              Average:{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {projectDetails?.project?.units?.avg?.priceBase.toLocaleString()}
              </span>{' '}
              / sqm
            </div>
          </div>
        </div>
      </div>
    );
}

export  {PricingCard};
