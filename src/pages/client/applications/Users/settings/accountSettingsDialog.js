import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { MenuItem, Select } from '@mui/material';

import axiosClient from 'src/utilities/axios/axiosIntercept';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AccountSettingsDialog({
  setCurrentUser,
  currentUser,
  setSnackBarMsg
}) {
  const [language, setLanguage] = React.useState('');
  const [isloading, setIsloading] = React.useState(false);
  // --------------------------------------------------------------------------------------------
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
  React.useEffect(() => {
    setLanguage(currentUser?.language);
  }, [currentUser]);
  // --------------------------------------------------------------------------------------------
  const handleSubmit = async () => {
    try {
      const res = await axiosClient.put('/account', { language });
      setCurrentUser(res.data);
      handleClose();
      setSnackBarMsg('your Profile  updated successfully');
      setTimeout(() => {
        setSnackBarMsg();
      }, 2000);
    } catch (e) {
      console.log(e);
    }
    setIsloading(false);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClickOpen}
        startIcon={<EditTwoToneIcon />}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Update Personal Details '}</DialogTitle>
        <DialogContent
          sx={{
            padding: '24px !important',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="language"
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value={'English'}>English</MenuItem>
            <MenuItem value={'Arabic'}>Arabic</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isloading}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
