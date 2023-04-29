import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Snackbar,
  TextField
} from '@mui/material';
import React, { useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import styles from './emp.module.css';
import { useEffect } from 'react';
import { GenerateEmpSuccessMsg } from './generateEmpSuccessMsg';



const validateForm = (formData) => {
  let isFormValid=true
  Object.values(formData).forEach(el => {
    if (!el) {
      isFormValid= false;
    }
  
  })
  return isFormValid
}
const EmpForm = ({ getLinks, isLoading, setPreviewEmp, setIsPreviewLoading }) => {
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [generatedEmpId, setGeneratedEmpId] = useState('');

  const [empForm, setEmpForm] = useState({
    category: '',
    area: '',
    type: '',
    sqm: { min: 100, max: 200 },
    budget: { min: 1, max: 50 },
    clientphone: '',
    clientname: ''
  });
  // --------------------------------------------------------------------------------------------
  const getTypes = async () => {
    try {
      const res = await axiosClient(`/master/type?category=${empForm.category}&area=${empForm.area}`);
      setTypes(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // --------------------------------------------------------------------------------------------
  const getAreas = async () => {
    try {
      const res = await axiosClient(`/master/area`);
      setAreas(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // --------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------
  const getCategories = async () => {
    try {
      const res = await axiosClient(`/master/category?area=${empForm.area}`);
      setCategories(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // --------------------------------------------------------------------------------------------

  const generateEmp = async (e) => {
  let body=JSON.parse(JSON.stringify(empForm))
  body.budget.min*=1000000
  body.budget.max*=1000000

    if (!validateForm(empForm)) {
      setSnackbarMsg('All feilds are required')
      setTimeout(() => {
        setSnackbarMsg()
      }, 3000);
      return
    }
    try {
      const res = await axiosClient.post(
        `/emp/submit`,
        body
      );
      setGeneratedEmpId(res._id);
      setOpenSuccessModal(true)
      setEmpForm({
        category: '',
        area: '',
        type: '',
        sqm: { min: 100, max: 200 },
        budget: { min: 1, max: 50 },
        clientphone: '',
        clientname: ''
      });
      getLinks();
    } catch (e) {
      console.log(e);
    }
  };
  // --------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------

  const previewEmp = async (e) => {
    let body=JSON.parse(JSON.stringify(empForm))
    body.budget.min*=1000000
    body.budget.max*=1000000
    if (!validateForm(empForm)) {
      setSnackbarMsg('All feilds are required')
      setTimeout(() => {
        setSnackbarMsg()
      }, 3000);
      return
    }
    setIsPreviewLoading(true)
    try {
      const res = await axiosClient.post(
      `/emp/preview`,
        body
      );
      console.log(res);
    delete  res.data.lenght
      setPreviewEmp(
        Object.values(res.data)
      )
    } catch (e) {
      console.log(e);
    }
    setIsPreviewLoading(false)

  };
  // --------------------------------------------------------------------------------------------

  useEffect(() => {
    if (empForm.category) setEmpForm((prev) => ({ ...prev, category: '' }))
    if (empForm.type) setEmpForm((prev) => ({ ...prev, type: '' }))

    getAreas();
  }, []);
  // --------------------------------------------------------------------------------------------
  useEffect(() => {
    if (empForm.type) setEmpForm((prev) => ({ ...prev, type: '' }))
    if (empForm.category) setEmpForm((prev) => ({ ...prev, category: '' }))
    if (empForm.area) getCategories();
  }, [empForm.area]);
  // --------------------------------------------------------------------------------------------
  useEffect(() => {
    if (empForm.type) setEmpForm((prev) => ({ ...prev, type: '' }))
    if (empForm.area && empForm.category) getTypes();
  }, [empForm.area, empForm.category]);
  // --------------------------------------------------------------------------------------------


  function budgetValueLabelFormat(value) {
    return `${(value)}M LE`;
  }
  function sqmValueLabelFormat(value) {
    return `${(value)}M `;
  }
  // --------------------------------------------------------------------------------------------

  return (<>
    <form className={styles.emp_form_wrapper}>
      <TextField
        classes={styles.client_details_input}
        className={styles.textfeild}
        sx={{ marginY: '5px' }}
        id="clientphone"
        label="Client Phone"
        variant="outlined"
        required
        value={empForm.clientphone}
        onChange={(e) =>
          setEmpForm((prev) => ({ ...prev, clientphone: e.target.value }))
        }
      />

      <TextField
        className={styles.textfeild}
        sx={{ marginY: '5px' }}
        id="clientname"
        label="Client Name"
        variant="outlined"
        required
        value={empForm.clientname}
        onChange={(e) =>
          setEmpForm((prev) => ({ ...prev, clientname: e.target.value }))
        }
      />
      <Autocomplete
        className={styles.select}
        sx={{ marginY: '5px' }}
        onChange={(e, newValue) =>
          setEmpForm((prev) => ({ ...prev, area: newValue || '' }))
        }
        value={empForm.area}
        id="area"
        options={areas}
        renderInput={(params) => <TextField {...params} label="area" />}
      />
      <FormControl className={styles.select} sx={{ marginY: '5px' }}>
        <InputLabel id="unit-category">Unit Category</InputLabel>
        <Select
          required
          labelId="unit-category"
          id="unit-category"
          value={empForm.category}
          onChange={(e) =>
            setEmpForm((prev) => ({ ...prev, category: e.target.value }))
          }
          label="Unit Category"

        >
          {categories.map((category,i) => {
            return (
              <MenuItem key={i} value={category}>
                {category}
              </MenuItem>
            );
          })}{' '}
        </Select>
      </FormControl>

      <Autocomplete
        className={styles.select}
        value={empForm.type}
        sx={{ marginY: '5px' }}
        onChange={(e, newValue) =>
          setEmpForm((prev) => ({ ...prev, type: newValue || '' }))
        }
        id="Unit-Type"
        options={types}
        renderInput={(params) => <TextField {...params} label="Unit Type" />}
      />



      <div className={styles.slider} style={{ padding: '15px' }}>
        <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>  Budget from <span style={{ color: 'blue' }}>{empForm.budget.min} M </span> to <span style={{ color: 'blue' }}> {empForm.budget.max} M </span></div>
        <Slider

          // eslint-disable-next-line react/jsx-no-bind
          valueLabelFormat={budgetValueLabelFormat}
          value={[empForm.budget.min, empForm.budget.max]}
          onChange={(e) =>
            setEmpForm((prev) => ({ ...prev, budget: { min: e.target.value[0], max: e.target.value[1] } }))
          }
          min={1}
          max={50}
          valueLabelDisplay="auto"
        />
      </div>
      <div className={styles.slider} style={{ padding: '15px' }}>
        <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>  SQM from <span style={{ color: 'blue' }}>{empForm.sqm.min} M </span> to <span style={{ color: 'blue' }}> {empForm.sqm.max} M </span></div>
        <Slider

          // eslint-disable-next-line react/jsx-no-bind
          valueLabelFormat={sqmValueLabelFormat}
          value={[empForm.sqm.min, empForm.sqm.max]}
          onChange={(e) =>
            setEmpForm((prev) => ({ ...prev, sqm: { min: e.target.value[0], max: e.target.value[1] } }))
          }
          min={100}
          max={500}
          valueLabelDisplay="auto"
        />
      </div>
      <div className={styles.buttons_wrapper}>
        <Button
          disabled={isLoading}
          onClick={() => generateEmp()}
          sx={{ marginY: '5px' }}
          variant="contained"
        >
          Generate Emp links
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => previewEmp()}
          sx={{ marginY: '5px', paddingX: '12%' }}
          variant="contained"
        >
          Preview
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={!!snackbarMsg}
        autoHideDuration={6000}
        //   onClose={handleClose}
        message={snackbarMsg}
      //   action={action}
      />
    </form>
    <GenerateEmpSuccessMsg  setOpen={setOpenSuccessModal } open={openSuccessModal} id={generatedEmpId}/>
    </>
  );
};

export { EmpForm };
