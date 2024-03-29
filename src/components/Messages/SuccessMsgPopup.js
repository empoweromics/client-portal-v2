import styles from './emp.module.css';
import Box from '@mui/material/Box';
import checkMark from 'src/assets/images/checkmark.svg';
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
  p: 4
};
const sucMsgStyles = {
  textAlign: 'center',
  color: '#045269',
  fontWeight: 'bold',
  fontSize: '18px',
  marginBottom: '15px'
};
const secondaryTextStyles = {
  color: 'gray',
  fontSize: '12px'
};
const idStyles = {
  fontWeight: 'bold',
  // fontSize: '16px',
  color: '#000'
};

export function SuccessMsgPopup({ open = true, message, id }) {
  function refreshPage() {
    window.location.reload(false);
  }
  const handleClose = () => refreshPage();
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
            <img src={checkMark} alt="" style={{ width: '100%' }} />
          </div>
          <Typography
            sx={sucMsgStyles}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {message}
          </Typography>
          <div style={secondaryTextStyles}>
            Reference ID: <span style={idStyles}>{id}</span>
            <br />
            Please take screenshot for your reference
          </div>
          <div
            style={{
              margin: '20px auto 0',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {' '}
            <Button
              sx={{ paddingX: '40px' }}
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              {' '}
              Done
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
