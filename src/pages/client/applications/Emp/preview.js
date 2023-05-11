import styles from './emp.module.css';
import emLogo from 'src/assets/images/dark_emp_logo.png';
import { CircularProgress } from '@mui/material';
import { nFormatter } from 'src/utilities/numbers/nFormatter';

function handleError(event) {
  event.target.src = emLogo;
}
const Preview = ({ previewEmp, isLoading }) => {
  return (
    <div className={styles.preview_wrapper}>
      {isLoading && <CircularProgress className={styles.centerd_element} />}
      {previewEmp.length > 0 ? (
        previewEmp.map((el) => {
          return (
            <div key={el._id} className={styles.property_card}>
              <div className={styles.logos_Wrapper}>
                <img
                  onError={handleError}
                  alt=""
                  src={`${process.env.REACT_APP_OLD_DOMAIN_URL}/app/pl/${el?.project?.logo}`}
                  className={styles.project_logo}
                />
                <img
                  onError={handleError}
                  alt=""
                  src={`${process.env.REACT_APP_OLD_DOMAIN_URL}/app/dl/${el?.developer?.logo}`}
                  className={styles.developer_logo}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  margin: '0 20px'
                }}
              >
                <div className={styles.title}>{el?.project?.name}</div>
                <div>Price: {nFormatter(el.priceBase)} EGP</div>
                <div>
                  Space Build Up: {el.spaceBuildUp} SQM {el.finishingType}
                </div>

                <div className={styles.secondary_text}>
                  Developed By{' '}
                  <span style={{ color: 'black', fontWeight: 'bold' }}>
                    {el?.developer?.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.preview_placeholder}>
          <div className={styles.card}>
            <div className={styles.card_body}>
              <p>No preview properties to display.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Preview };
