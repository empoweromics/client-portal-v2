
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axiosClient from 'src/utilities/axios/axiosIntercept';

export function DeleteConfirmationDialog({ id,setEmpLinks }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // ------------------------------------------------------------------------------------------------
    const deleteLink = async () => {
        try {
            const res = await axiosClient.delete(`${process.env.REACT_APP_DEVELOP_URL}/${id}`)
            setEmpLinks(prev=>prev.filter(el=>el._id!==id))
            handleClose()
        } catch (e) {
            console.log(e);
        }
    }
    // ------------------------------------------------------------------------------------------------
    return (
        <div>
            {/* <Button variant="outlined" > */}
            <DeleteForeverTwoToneIcon sx={{ cursor: 'pointer' }} color='error' onClick={handleClickOpen} />
            {/* </Button> */}
            <Dialog open={open} onClose={handleClose}>
                {/* <DialogTitle></DialogTitle> */}
                <DialogContent sx={{ paddingBottom: '0 !important' }}>
                    <DialogContentText>
                        Are you Sure you want to delete this link
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteLink} color='error'>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}