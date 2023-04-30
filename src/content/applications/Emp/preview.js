import styles from './emp.module.css';
import emLogo from '../../../assets/images/dark_emp_logo.png';
import { CircularProgress } from '@mui/material';

function handleError(event) {
    event.target.src = emLogo;
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
                    <div className={styles.logos_Wrapper}>
                        <img onError={handleError}
                            alt=""
                            src={`${process.env.REACT_APP_OLD_DOMAIN_URL}pp/${el?.project?.logo}`}
                            className={styles.project_logo}
                        />
                        <img onError={handleError}

                            alt=""
                            src={`${process.env.REACT_APP_OLD_DOMAIN_URL}pl/${el?.developer?.logo}`}
                            className={styles.developer_logo}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', margin: '0 10px' }}>
                        <div className={styles.title}>{el?.project?.name}</div>
                        <div>Price: {el.priceBase?.toLocaleString()}</div>
                        <div className={styles.secondary_text}>Developed By <span style={{ color:'black',fontWeight:'bold' }}>{el?.developer?.name}</span>

                        </div>
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