import {
  DialogContent,
  styled,
  Dialog,
  TextField,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  DialogTitle,
  Alert
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import ProjectField from './ProjectField';
import { Controller, useForm } from 'react-hook-form';

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const types = [
  'serviced-apartment',
  'apartment',
  'twin-house',
  'penthouse',
  'townhouse',
  'villa',
  'duplex',
  'center',
  'food-&-beverage',
  'clinic',
  'bank',
  'palace',
  'health-&-fitness',
  'office-space',
  'shop',
  'show-room',
  'supermarket',
  'building',
  'chalet',
  'pharmacy',
  'store',
  'studio',
  'entertainment',
  's-villa',
  'lab',
  'land',
  'coworking-space',
  'factory',
  'storage',
  'cabin'
];
const finishingTypes = [
  'deluxe-finishing',
  'fully-finished',
  'core-&-shell',
  'semi-finished',
  'finished-with-acs',
  'land'
];

export default function Form({ open, handleClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      project: '',
      type: '',
      total: '',
      downPayment: '',
      monthly: '',
      maxDelivery: '',
      name: '',
      phone: '',
      directly: false
      // note: '',
      // status: 'open|success|failure',
      // adminComments: ''
    },
    mode: 'onTouched'
  });
  const onSubmit = (data) => console.log(data);

  let [selectedProject, setSelectedProject] = useState(null);
  let [data, setData] = useState(null);

  // let [budget, setBudget] = useState();

  useEffect(() => {
    if (selectedProject) {
      setData({
        type: [
          { id: 1, label: 'test1' },
          { id: 2, label: 'test2' },
          { id: 3, label: 'test3' }
        ],
        pricing: {
          total: 20000,
          downPayment: 10000,
          monthly: 1000
        },
        maxDelivery: 1
      });
    }
  }, [selectedProject]);
  return (
    <>
      <DialogWrapper
        open={open}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Submit Opportunity
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography variant="subtitle1" component="h5" sx={{ mb: 1 }}>
                Client Information
              </Typography>

              <Grid
                container
                sx={{
                  mb: 2,
                  justifyContent: 'space-between',
                  px: 3
                }}
                columnSpacing={2}
              >
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    {...register('name', { required: '*required' })}
                    id="name"
                    label="Name"
                    helperText={errors.name?.message}
                    error={!!errors.name}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    {...register('phone', {
                      required: '*required',
                      pattern: {
                        value: /^01[0125][0-9]{8}$/,
                        message: 'enter a valid phone number'
                      }
                    })}
                    sx={{ mb: 2 }}
                    id="phone"
                    label="Phone"
                    helperText={errors.phone?.message}
                    error={!!errors.phone}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    sx={{ mb: 2 }}
                    fullWidth
                    {...register('directly')}
                    control={<Checkbox />}
                    label="directly"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="subtitle1" component="h5" sx={{ mb: 1 }}>
                Project
              </Typography>

              <Grid
                container
                sx={{
                  mb: 2,
                  justifyContent: 'space-between',
                  px: 3
                }}
                columnSpacing={2}
              >
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name="project"
                    rules={{ required: '*required' }}
                    render={({ field: { onChange } }) => (
                      <ProjectField
                        errors={errors}
                        setSelectedProject={setSelectedProject}
                        onChange={onChange}
                        setError={setError}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    {...register('type', { required: '*required' })}
                    id="type"
                    select
                    label="Type"
                    // onChange={handleChange}
                    SelectProps={{
                      native: true
                    }}
                    fullWidth
                    helperText={errors.type?.message}
                    error={!!errors.type}
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="">select an option ...</option>
                    {types.map((option, id) => (
                      <option key={id} value={id}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    {...register('finishingType', { required: '*required' })}
                    id="finishingType"
                    select
                    label="finishingType"
                    // onChange={handleChange}
                    SelectProps={{
                      native: true
                    }}
                    fullWidth
                    helperText={errors.finishingType?.message}
                    error={!!errors.finishingType}
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="">select an option ...</option>
                    {finishingTypes.map((option, id) => (
                      <option key={id} value={id}>
                        {option}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
            <Alert
              sx={{ justifyContent: 'center', fontWeight: 'bold' }}
              icon={false}
              severity="success"
            >
              Average Price is 200000
            </Alert>
            <Box>
              <Typography variant="subtitle1" component="h5" sx={{ mb: 1 }}>
                Budget
              </Typography>

              <Box>
                <Grid
                  container
                  sx={{
                    mb: 2,
                    justifyContent: 'space-between',
                    px: 3
                  }}
                  columnSpacing={2}
                >
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...register('total', {
                        // required: '*required',
                        // min: {
                        //   value: data?.pricing.total,
                        //   message: `minimum is ${data?.pricing.total}`
                        // }
                      })}
                      type="number"
                      id="total"
                      label="Total"
                      sx={{ mb: 2 }}
                      // helperText={errors.total?.message}
                      // error={!!errors.total}
                      fullWidth
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       {data?.pricing.total ? '>=' + data.pricing.total : ''}
                      //     </InputAdornment>
                      //   )
                      // }}
                      // disabled={!data?.pricing.total}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...register('downPayment', {
                        // required: '*required',
                        // min: {
                        //   value: data?.pricing.downPayment,
                        //   message: `minimum is ${data?.pricing.downPayment}`
                        // }
                      })}
                      type="number"
                      id="downPayment"
                      label="Down Payment"
                      fullWidth
                      sx={{ mb: 2 }}

                      // helperText={errors.downPayment?.message}
                      // error={!!errors.downPayment}
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       {data?.pricing.downPayment
                      //         ? '>=' + data.pricing.downPayment
                      //         : ''}
                      //     </InputAdornment>
                      //   )
                      // }}
                      // disabled={!data?.pricing.downPayment}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...register('monthly', {
                        // required: '*required',
                        // min: {
                        //   value: data?.pricing.monthly,
                        //   message: `minimum is ${data?.pricing.monthly}`
                        // }
                      })}
                      type="number"
                      id="monthly"
                      label="Monthly"
                      fullWidth
                      sx={{ mb: 2 }}

                      // helperText={errors.monthly?.message}
                      // error={!!errors.monthly}
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       {data?.pricing.monthly
                      //         ? '>=' + data.pricing.monthly
                      //         : ''}
                      //     </InputAdornment>
                      //   )
                      // }}
                      // disabled={!data?.pricing.monthly}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      {...register('maxDelivery', {
                        // required: '*required',
                        // min: {
                        //   value: data?.maxDelivery,
                        //   message: `minimum is ${data?.maxDelivery}`
                        // }
                      })}
                      sx={{ mb: 2 }}
                      type="number"
                      id="maxDelivery"
                      label="Max Delivery"
                      fullWidth
                      // helperText={errors.maxDelivery?.message}
                      // error={!!errors.maxDelivery}
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       {data?.maxDelivery ? '>=' + data.maxDelivery : ''}
                      //     </InputAdornment>
                      //   )
                      // }}
                      // disabled={!data?.maxDelivery}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              type="submit"
              variant="outlined"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </DialogWrapper>
    </>
  );
}
