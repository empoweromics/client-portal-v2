import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import styles from './emp.module.css';

const EmpForm = ({ setEmpLinks }) => {
    const [empForm, setEmpForm] = React.useState({
        category: '',
        area: "",
        type: "",
        sqm: '',
        budget: ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // const res=await axiosClient(`${process.env.REACT_APP_DEVELOP_URL}/client/emp/submit`,empForm)
            // setEmpLinks(prev=>([res.data,...prev]))
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <form onSubmit={handleSubmit} className={styles.emp_form_wrapper} >
            <FormControl className={styles.select} sx={{ marginY: '5px' }}>
                <InputLabel id="unit-category">Unit Category</InputLabel>
                <Select

                    required
                    labelId="unit-category"
                    id="unit-category"
                    value={empForm.category}
                    onChange={e => setEmpForm(prev => ({ ...prev, category: e.target.value }))}

                    label="Unit Category"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={styles.select} sx={{ marginY: '5px' }}>
                <InputLabel id="Project-area">Project Area</InputLabel>
                <Select

                    required
                    labelId="Project-area"
                    id="Projectarea"
                    value={empForm.area}
                    onChange={e => setEmpForm(prev => ({ ...prev, area: e.target.value }))}

                    label="Project Area"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={styles.select} sx={{ marginY: '5px' }}>
                <InputLabel id="Unit-type">Unit Type</InputLabel>
                <Select
                    required
                    labelId="Unit-type"
                    id="Unit Type"
                    value={empForm.type}
                    onChange={e => setEmpForm(prev => ({ ...prev, type: e.target.value }))}

                    label="Unit Type"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                </Select>
            </FormControl>
            <TextField className={styles.textfeild} type='number'
                sx={{ marginY: '5px' }} id="Budget"
                label="Budget " variant="outlined"
                required
                value={empForm.Budget}
                onChange={e => setEmpForm(prev => ({ ...prev, Budget: e.target.value }))}
            />

            <TextField className={styles.textfeild} sx={{ marginY: '5px' }}
                id="SQM" label="SQM"
                variant="outlined" required
                value={empForm.sqm}
                onChange={e => setEmpForm(prev => ({ ...prev, sqm: e.target.value }))}
            />
            <div style={{ width: '100%' ,marginLeft:'10px'}}>   <Button type='submit' sx={{ marginY: '5px' }} variant='contained'>submit</Button></div>
        </form>
    );
}

export { EmpForm };
