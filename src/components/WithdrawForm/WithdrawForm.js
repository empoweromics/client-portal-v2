import {
  DialogContent,
  styled,
  Dialog,
  TextField,
  Grid,
  Button,
  Box,
  DialogTitle
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

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
const method = ['bank_transfer', 'cash', 'VC'];

export default function WithdrawForm({ open, handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      amount: 0,
      method: ''
    }
  });
  const onSubmit = (data) => console.log(data);

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
          Submit Transaction
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
              paddingY={2}
            >
              <Grid
                container
                xs={12}
                sx={{
                  mb: 2,
                  justifyContent: 'space-evenly',
                  px: 3
                }}
              >
                <Grid item xs={12} md={5}>
                  <TextField
                    {...register('amount', {
                      required: '*required',
                      min: {
                        value: 1,
                        message: '*required'
                      }
                    })}
                    type="number"
                    id="amount"
                    label="Amount"
                    fullWidth
                    sx={{ mb: 2 }}
                    helperText={errors.amount?.message}
                    error={!!errors.amount}
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment position="end">
                    //       {data?.maxDelivery ? '>=' + data.maxDelivery : ''}
                    //     </InputAdornment>
                    //   )
                    // }}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    {...register('method', { required: '*required' })}
                    id="method"
                    select
                    fullWidth
                    label="Method"
                    SelectProps={{
                      native: true
                    }}
                    helperText={errors.method?.message}
                    error={!!errors.method}
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="">select an option ...</option>
                    {method?.map((option, id) => (
                      <option key={id} value={option.id}>
                        {id === 0 ? option.replace('_', ' ') : option}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                type="submit"
                variant="outlined"
              >
                Submit
              </Button>
            </Box>
          </form>
        </DialogContent>
      </DialogWrapper>
    </>
  );
}
