import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { SubmitOppForm } from './submitOppForm';
import { useEffect, useState } from 'react';
import { ProjectDetails } from './projectDetails';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import { CircularProgress, Paper } from '@mui/material';
import styles from './oppDialog.module.css';

function SimpleDialog(props) {
  const { onClose, open, projectId } = props;
  const [renderedComponent, setRenderedComponent] = useState('ProJect-Details');
  const [projectDetails, setProjectDetails] = useState();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setRenderedComponent('ProJect-Details');
    setProjectDetails();
    onClose();
  };
  // ----------------------------------------------------------------------------------------------
  // const authLogin=async(user) =>{
  //   console.log(user);
  //   try{
  // const res=await axios.put(`${process.env.REACT_APP_DEVELOP_URL}/client/auth/${user.uid}`,user)
  // console.log(res);
  //   }
  //   catch(e){
  // console.log(e);
  //   }
  // }
  // ----------------------------------------------------------------------------------------------

  const getProject = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/client/project/project/${projectId}`);
      setProjectDetails(res.data);
    } catch (e) {
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

        {renderedComponent === 'Submit-Opp' && (
          <SubmitOppForm
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

export function OppDialog({ projectId, open, setDialogProjectId }) {
  const handleClose = () => {
    setDialogProjectId(false);
  };

  return (
    <div>
      <SimpleDialog projectId={projectId} open={open} onClose={handleClose} />
    </div>
  );
}
