import styles from './emp.module.css';
import emLogo from '../../../assets/images/dark_emp_logo.png';
import { CircularProgress } from '@mui/material';

const x = {
    "_id": "6435f355533d4ae1fe616d56",
    "category": "Residential",
    "type": "Serviced Apartment",
    "finishingType": "Fully Finished",
    "priceBase": 1164900,
    "spaceBuildUp": 59,
    "pricePerMeter": 19744.07,
    "paymentYears": 8,
    "estDelivery": [
        2.5
    ],
    "area": "new cairo",
    "active": true,
    "createdAt": "2023-04-11T23:55:01.399Z",
    "updatedAt": "2023-04-12T00:00:37.453Z",
    "project": "6435f3198ee697e6819ea9e2",
    "developer": "6435d5ed91155b33caeab238"
}
const Preview = ({ previewEmp, isLoading }) => {
    return (
        <div className={styles.preview_wrapper}>
            {isLoading && <CircularProgress className={styles.centerd_element} />}
            <div className={styles.card_header}>
                  Recommended Properties
                </div>
            {previewEmp.length > 0 ? previewEmp.map(el => {
                return <div key={el._id} className={styles.property_card}>
                    <img
                        alt=""
                        src={emLogo}
                        className={styles.project_logo}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', margin: '0 10px' }}>
                        <div className={styles.title}>test test test</div>
                        <div className={styles.secondary_text}>test test test</div>
                    </div>
                </div>
            })
                :

                <div className={styles.preview_placeholder}><div className={styles.card}>
                
                <div className={styles.card_body}>
                  <p>Click the preview button to see our top recommended properties.</p>
                  {/* <button className="btn-preview">Preview</button> */}
                </div>
              </div></div>}
        </div>
    );
}

export { Preview };
