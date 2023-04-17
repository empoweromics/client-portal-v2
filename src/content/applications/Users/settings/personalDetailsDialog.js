
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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

export function PersonalDetailsDialog() {
    const [personalDetails, setpersonalDetails] = React.useState({
        displayName: '',
        address: '',
        dateOfbirth: new Date(),
        phone: ''
    });
    // --------------------------------------------------------------------------------------------
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //
        // --------------------------------------------------------------------------------------------
const handleSubmit=async()=>{
    try{
    const res=await axiosClient.put('/client/account',{...personalDetails,dateOfbirth:personalDetails.dateOfbirth ? format(personalDetails.dateOfbirth, 'dd MMMM yyyy'):''});
    console.log(res);
    
    }catch(e){
        console.log(e);
    }
    }
    
    return (
        <div>
            <Button variant="text" onClick={handleClickOpen} startIcon={<EditTwoToneIcon />}>
                Edit
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Update Personal Details "}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <TextField onChange={(e) => setpersonalDetails(prev => {
                            return { ...prev, displayName: e.target.value }
                        })} value={personalDetails.displayName}
                            id="displayName" label="Display Name"
                            variant="outlined" />

                        <TextField onChange={(e) => setpersonalDetails(prev => {
                            return { ...prev, phone: e.target.value }
                        })} value={personalDetails.phone}
                            id="PhoneNumber" label="Phone Number"
                            variant="outlined" />

                        <DatePicker
                            onChange={(date) => setpersonalDetails(prev => {
                                return { ...prev, dateOfbirth: date }
                            })}
                            value={personalDetails.dateOfbirth}
                            format="yyyy-MM-dd"
                            label="dDte Of Birth"
                            renderInput={(params) => <TextField sx={{
                                svg: { color: '#000 !important' },
                                margin: '15px !important'
                            }} {...params}
                                error={false} />}
                        />

                        <TextField
                            onChange={(e) => setpersonalDetails(prev => {
                                return { ...prev, address: e.target.value }
                            })} value={personalDetails.address}
                            style={{ width: '90%', margin: '0 auto' }}
                            placeholder="Address"
                            multiline
                            rows={2}
                            // maxRows={4}
                        />

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}