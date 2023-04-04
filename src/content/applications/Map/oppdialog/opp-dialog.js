import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { SubmitOppForm } from './submitOppForm';
import { useEffect, useState } from 'react';
import { ProjectDetails } from './projectDetails';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import { CircularProgress, Paper, Snackbar } from '@mui/material';
import styles from './oppDialog.module.css';

function SimpleDialog(props) {
  const { onClose, open, projectId ,setDialogProjectId,setSnackbarMsg} = props;

  const [renderedComponent, setRenderedComponent] = useState('ProJect-Details');
  const [projectDetails, setProjectDetails] = useState();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    console.log('close');
    setRenderedComponent('ProJect-Details');
    setProjectDetails();
    onClose();
  };
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    console.log(renderedComponent);
    // setRenderedComponent('ProJect-Details')
  }, []);
  // ----------------------------------------------------------------------------------------------

  const getProject = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/client/project/project/${projectId}`, {headers:{'user': 'cXtdTSxTS0a5nyti9CpGeKokWun2'}});
      setProjectDetails(res.data);
    } catch (e) {
      setErrorMsg('Something went wrong with getting  project details, please try again')
      console.log(e);
    }
    setLoading(false);
  };

  // ----------------------------------------------------------------------------------------------

  useEffect(() => {
    if (projectId) getProject();
  }, [projectId]);
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
        horizontal: 'center',
      }}
        open={!!errorMsg}
        autoHideDuration={6000}
        //   onClose={handleClose}
        message={errorMsg}
      //   action={action}
      />
        {renderedComponent === 'Submit-Opp' && (
          <SubmitOppForm
          setErrorMsg={setErrorMsg}
          setSnackbarMsg={setSnackbarMsg}
          setDialogProjectId={setDialogProjectId}
            setRenderedComponent={setRenderedComponent}
            projectDetails={projectDetails}
            setLoading={setLoading}
          />
        )}
        {renderedComponent === 'ProJect-Details' && (
          <ProjectDetails
            projectDetails={projectDetails}
            setRenderedComponent={setRenderedComponent}
          />
        )}
      </Paper>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export function OppDialog({ projectId, open, setDialogProjectId,setSnackbarMsg }) {
  const handleClose = () => {
    setDialogProjectId(false);
  };

  return (
    <div>
      <SimpleDialog setSnackbarMsg={setSnackbarMsg} setDialogProjectId={setDialogProjectId} projectId={projectId} open={open} onClose={handleClose} />
    </div>
  );
}
