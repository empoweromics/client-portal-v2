import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import axiosClient from 'src/utilities/axios/axiosIntercept';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function PersonalDetailsDialog({
  setCurrentUser,
  currentUser,
  setSnackBarMsg
}) {
  const [personalDetails, setpersonalDetails] = React.useState({
    displayName: '',
    address: '',
    dateOfbirth: new Date(),
    phone: ''
  });
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
    setpersonalDetails({
      displayName: currentUser?.displayName,
      address: currentUser?.address,
      dateOfbirth: new Date(currentUser?.dateOfbirth),
      phone: currentUser?.phone
    });
  }, [currentUser]);
  // --------------------------------------------------------------------------------------------
  const handleSubmit = async () => {
    let body = {
      ...personalDetails,
      dateOfbirth: personalDetails.dateOfbirth
        ? format(personalDetails.dateOfbirth, 'dd MMMM yyyy')
        : ''
    };
    setIsloading(true);
    // eslint-disable-next-line no-restricted-syntax
    for (let key in body) {
      if (!body[key]) {
        delete body[key];
      }
    }
    try {
      const res = await axiosClient.put('/account', body);
      setCurrentUser(res.data);
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
          <TextField
            sx={{ minWidth: '47%' }}
            onChange={(e) =>
              setpersonalDetails((prev) => {
                return { ...prev, displayName: e.target.value };
              })
            }
            value={personalDetails.displayName}
            id="displayName"
            label="Display Name"
            variant="outlined"
          />

          <TextField
            sx={{ minWidth: '47%' }}
            onChange={(e) =>
              setpersonalDetails((prev) => {
                return { ...prev, phone: e.target.value };
              })
            }
            value={personalDetails.phone}
            id="PhoneNumber"
            label="Phone Number"
            variant="outlined"
          />

          <DatePicker
            onChange={(date) =>
              setpersonalDetails((prev) => {
                return { ...prev, dateOfbirth: date };
              })
            }
            value={personalDetails.dateOfbirth}
            format="yyyy-MM-dd"
            label="Date Of Birth"
            renderInput={(params) => (
              <TextField
                sx={{
                  margin: '15px 0 !important'
                }}
                {...params}
                error={false}
              />
            )}
          />

          <TextField
            onChange={(e) =>
              setpersonalDetails((prev) => {
                return { ...prev, address: e.target.value };
              })
            }
            value={personalDetails.address}
            style={{ width: '190%', margin: '0 ' }}
            placeholder="Address"
            multiline
            rows={2}
            // maxRows={4}
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
