import { Autocomplete, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import styles from './emp.module.css';
import { useEffect } from 'react';

const EmpForm = ({ getLinks,isLoading }) => {
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);

    const [empForm, setEmpForm] = useState({
        category: '',
        area: "",
        type: "",
        sqm: '',
        budget: '',
        clientphone: '',
        clientname: ''
    });
    // --------------------------------------------------------------------------------------------
    const getTypes = async () => {
        try {
            const res = await axiosClient(`/client/master/type`)
            setTypes(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    // --------------------------------------------------------------------------------------------
    const getAreas = async () => {
        try {
            const res = await axiosClient(`/client/master/area`)
            setAreas(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    // --------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------
    const getCategories = async () => {
        try {
            const res = await axiosClient(`/client/master/category`)
            setCategories(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    // --------------------------------------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axiosClient.post(`${process.env.REACT_APP_DEVELOP_URL}/client/emp/submit`, empForm)
            console.log(res);
            getLinks()
        } catch (e) {
            console.log(e);
        }
    };
    // --------------------------------------------------------------------------------------------
    useEffect(() => {
        getCategories()
        getTypes()
        getAreas()
    }, []);
    // --------------------------------------------------------------------------------------------
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
                    {categories.map(category => {
                        return <MenuItem key={category} value={category}>{category}</MenuItem>
                    })}                </Select>
            </FormControl>
            <Autocomplete
                className={styles.select} sx={{ marginY: '5px' }}
                onChange={(e, newValue) => setEmpForm(prev => ({ ...prev, area: newValue || '' }))}
                id="area"
                options={areas}
                renderInput={(params) => <TextField {...params} label="area" />}
            />
            {/* <FormControl className={styles.select} sx={{ marginY: '5px' }}>
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
            </FormControl> */}
            {/* <FormControl className={styles.select} sx={{ marginY: '5px' }}>
                <InputLabel id="Unit-type">Unit Type</InputLabel>
                <Select
                    required
                    labelId="Unit-type"
                    id="Unit Type"
                    value={empForm.type}
                    onChange={e => setEmpForm(prev => ({ ...prev, type: e.target.value }))}

                    label="Unit Type"
                >
                    {types.map(type => {
                        return <MenuItem key={type} value={type}>{type}</MenuItem>
                    })}
                </Select>
            </FormControl> */}
            <Autocomplete
                className={styles.select} sx={{ marginY: '5px' }}
                onChange={(e, newValue) => setEmpForm(prev => ({ ...prev, type: newValue || '' }))}
                id="Unit-Type"
                options={types}
                renderInput={(params) => <TextField {...params} label="Unit Type" />}
            />
            <TextField className={styles.textfeild} type='number'
                sx={{ marginY: '5px' }} id="Budget"
                label="Budget " variant="outlined"
                required
                value={empForm.budget}
                onChange={e => setEmpForm(prev => ({ ...prev, budget: +e.target.value }))}
            />

            <TextField className={styles.textfeild} sx={{ marginY: '5px' }}
                id="SQM" label="SQM"
                variant="outlined" required
                value={empForm.sqm}
                onChange={e => setEmpForm(prev => ({ ...prev, sqm: +e.target.value }))}
            />

            <TextField className={styles.textfeild} sx={{ marginY: '5px' }}
                id="clientphone" label="Client Phone"
                variant="outlined" required
                value={empForm.clientphone}
                onChange={e => setEmpForm(prev => ({ ...prev, clientphone: e.target.value }))}
            />

            <TextField className={styles.textfeild} sx={{ marginY: '5px' }}
                id="clientname" label="Client Name"
                variant="outlined" required
                value={empForm.clientname}
                onChange={e => setEmpForm(prev => ({ ...prev, clientname: e.target.value }))}
            />
            <div style={{ width: '100%', marginLeft: '10px' }}>  
             <Button disabled={isLoading} type='submit' sx={{ marginY: '5px' }} variant='contained'>
                Generate Emp links</Button></div>
        </form>
    );
}

export { EmpForm };
