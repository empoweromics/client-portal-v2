import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from '@mui/material';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { DeleteConfirmationDialog } from './deleteConfirmationDialog';

const EmpTable = ({ empLinks, setEmpLinks }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const agents = [
        { name: 'John Smith', email: 'john@example.com', phone: '555-1234', experience: '5 years', recentSales: '12' },
        { name: 'Jane Doe', email: 'jane@example.com', phone: '555-5678', experience: '10 years', recentSales: '22' },
        { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012', experience: '3 years', recentSales: '6' },
    ];
    function handleCopy(link) {
        navigator.clipboard.writeText(`https://empoweromics-dev.web.app/empHome/${link}`);
        setOpenSnackbar(true);
        setTimeout(() => {
            setOpenSnackbar(false);
        }, 3000);
    }
    return (
        <TableContainer component={Paper}>
            {/* <div style={{padding:'15px'}}>Top-performing Real Estate Agents</div>  */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Url</TableCell>
                        <TableCell>Copy</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {empLinks.map((el) => (
                        <TableRow key={el._id}>
                            <TableCell >https://empoweromics-dev.web.app/empHome/{el._id}</TableCell>
                            <TableCell ><ContentCopyTwoToneIcon onClick={() => { handleCopy(el._id) }}
                                sx={{ color: '#009A67', cursor: 'pointer' }} />
                            </TableCell>
                            <TableCell><DeleteConfirmationDialog setEmpLinks={setEmpLinks} id={el._id} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={!!openSnackbar}
                autoHideDuration={6000}
                message={'Link copied'}
            />
        </TableContainer>
    );
};

export { EmpTable };