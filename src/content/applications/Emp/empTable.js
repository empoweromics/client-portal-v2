import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, CircularProgress } from '@mui/material';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { DeleteConfirmationDialog } from './deleteConfirmationDialog';
import { TablePagination } from '@mui/material';
import styles  from './emp.module.css'

const EmpTable = ({ empLinks, setEmpLinks }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
                        <TableCell className={styles.url_column}>Url</TableCell>
                        <TableCell>Client Name</TableCell>
                        <TableCell>Views</TableCell>
                        <TableCell>Copy</TableCell>
                        <TableCell>Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {empLinks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        ?.map((el) => (
                            <TableRow key={el._id}>
                                <TableCell className={styles.url_column}>https://empoweromics-dev.web.app/empHome/{el._id}</TableCell>
                                <TableCell >{el.inputs?.clientname}</TableCell>
                                <TableCell >{el.views}</TableCell>
                                <TableCell ><ContentCopyTwoToneIcon onClick={() => { handleCopy(el._id) }}
                                    sx={{ color: '#009A67', cursor: 'pointer' }} />
                                </TableCell>
                                <TableCell><DeleteConfirmationDialog setEmpLinks={setEmpLinks} id={el._id} /></TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                
            </Table>
            <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={empLinks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
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