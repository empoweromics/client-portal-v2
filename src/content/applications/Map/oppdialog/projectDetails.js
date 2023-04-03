import { Button, Rating } from '@mui/material';
import styles from './oppDialog.module.css';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { SeeMoreComponent } from './seeMoreComponent';

const ProjectDetails = ({ setRenderedComponent, projectDetails }) => {
    return (
        <div className={styles.project_details_wrapper}>
            <div className={styles.project_header_wrapper}>
                <div style={{display:'flex'}}>
                <div className={styles.logo_wrapper}>
                    <img alt='' style={{ width: '100%' }} src={`https://empoweromics.com/app/pl/${projectDetails.logo}`} />
                </div>
                <div style={{ marginLeft: '15px', fontWeight: 'bold' }}>
                    <div> {projectDetails?.i18n?.en?.name}</div>
                    <div>  {projectDetails?.developer_name}</div>
                    <div>  {projectDetails?.state}</div>
                    <div>  {projectDetails?.units.totla} Units</div>
                    <Rating name="read-only" value={projectDetails.rating} precision={0.5} readOnly />
                </div>
                </div>
                {/*  */}
                <div className={styles.pricing_sec_wrapper}>
                <div>
                    <CheckCircleTwoToneIcon sx={{ color: '#155724', margin: '10px' }} />
                </div>
                <div>

                    <div>
                        Starting: <span style={{ fontWeight: 'bolder' }}>{projectDetails?.units?.start?.priceBase} EGP</span> for <span style={{ fontWeight: 'bolder' }}>105</span> sqm
                    </div>
                    <div>
                        Average: <span style={{ fontWeight: 'bolder' }}>{projectDetails?.units?.avg?.priceBase}</span> / sqm
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
            <Button onClick={() => {
                setRenderedComponent('Submit-Opp')
            }}>Submit Opportunity</Button>
        </div>
    );
}

export { ProjectDetails };
