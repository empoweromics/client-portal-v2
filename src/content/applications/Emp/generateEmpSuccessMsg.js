import styles from './emp.module.css';
import Box from '@mui/material/Box';
import checkMark from '../../../assets/images/checkmark.png';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    borderRadius: '15px',
    p: 4,
};
const sucMsgStyles = {
    color: '#129e1b',
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '10px',
}
const secondaryTextStyles = {
    color: 'gray',
    fontSize: '14px'
}
const idStyles = {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#129e1b'
}

export function GenerateEmpSuccessMsg({ setOpen = () => { }, open = true, id = '545' }) {
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.check_mark_img_wrappper}>
                        <img src={checkMark} alt='' style={{ width: '100%' }} />
                    </div>
                    <Typography sx={sucMsgStyles} id="modal-modal-title" variant="h6" component="h2">
                        Your Emp has been Generated Successfully!
                    </Typography>
                    <div style={secondaryTextStyles}>
                        Your reference ID is <span style={idStyles}>{id}</span>
                        {' '} and Please take screenshot for your reference
                    </div>
                    <div style={{ margin: '20px auto 0', display: 'flex', justifyContent: 'center' }}>   <Button sx={{ paddingX: '40px' }} variant='contained' color='primary' onClick={handleClose}> Done</Button></div>
                </Box>
            </Modal>
        </div>
    );
}