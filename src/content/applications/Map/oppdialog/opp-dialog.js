import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { SubmitOppForm } from './submitOppForm';
import { useState } from 'react';
import { CircularProgress, Paper, Snackbar } from '@mui/material';
import styles from './oppDialog.module.css';

function SimpleDialog(props) {
  const {
    onClose,
    setSnackbarMsg,
    open,
    projectDetails,
    setProjectDetails,
    setOpen
  } = props;

  const [renderedComponent, setRenderedComponent] = useState('ProJect-Details');
  // const [projectDetails, setProjectDetails] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
      <Paper sx={{ minHeight: '320px' }}>
        {loading && (
          <CircularProgress
            className={styles.centered_element}
            color="success"
          />
        )}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={!!errorMsg}
          autoHideDuration={6000}
          //   onClose={handleClose}
          message={errorMsg}
          //   action={action}
        />

        <SubmitOppForm
          setOpen={setOpen}
          setErrorMsg={setErrorMsg}
          setSnackbarMsg={setSnackbarMsg}
          setRenderedComponent={setRenderedComponent}
          projectDetails={projectDetails}
          setLoading={setLoading}
        />

        {/* {renderedComponent === 'ProJect-Details' && (
          <ProjectDetails
            projectDetails={projectDetails}
            setRenderedComponent={setRenderedComponent}
          />
        )} */}
      </Paper>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export function OppDialog({
  setSnackbarMsg,
  open,
  projectDetails,
  setProjectDetails,
  setOpen
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SimpleDialog
        setSnackbarMsg={setSnackbarMsg}
        open={open}
        onClose={handleClose}
        projectDetails={projectDetails}
        setProjectDetails={setProjectDetails}
        setOpen={setOpen}
      />
    </div>
  );
}
