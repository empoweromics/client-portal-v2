import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { TextField } from '@mui/material';

import axiosClient from 'src/utilities/axios/axiosIntercept';
import { useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function EditMailDialog({ setCurrentUser, currentUser }) {
  const [email, setEmail] = React.useState(' ');
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
  useEffect(() => {
    setEmail(currentUser?.email);
  }, [currentUser]);
  // --------------------------------------------------------------------------------------------
  const handleSubmit = async () => {
    setIsloading(true);

    try {
      const res = await axiosClient.put('/account', { email: email });
      setCurrentUser(res.data);
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
          <TextField
            sx={{ minWidth: '47%' }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            label="Email"
            variant="outlined"
          />
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
