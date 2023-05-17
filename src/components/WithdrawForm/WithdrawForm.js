import { LoadingButton } from '@mui/lab';
import {
  DialogContent,
  styled,
  Dialog,
  TextField,
  Grid,
  Box,
  DialogTitle,
  Alert
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosClient from 'src/utilities/axios/axiosIntercept';

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
const method = ['bank_account', 'cash', 'vodafone_cash'];

export default function WithdrawForm({ open, handleClose }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
  const onSubmit = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axiosClient.post(`/transactions/withdraw`, {
        amount: Number(payload.amount),
        method: payload.method
      });
      if (res.data) {
        setIsLoading(false);
        setSuccessMessage(
          `Thanks we have recived you request to withdraw ${res.data.amount} EGP from your wallet , through ${res.data.method} and current status is ${res.data.status}`
        );
        setTimeout(() => {
          handleClose(true);
        }, 6000);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
          {successMessage && (
            <>
              <Alert severity="success">{successMessage}</Alert>
            </>
          )}

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
                    <option value="">
                      select your favourate method option ...
                    </option>
                    {method?.map((option, id) => (
                      <option key={id} value={option}>
                        {option.replace('_', ' ')}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <LoadingButton
                sx={{ mt: { xs: 2, md: 0 } }}
                type="submit"
                variant="outlined"
                loading={isLoading}
              >
                Submit
              </LoadingButton>
            </Box>
          </form>
        </DialogContent>
      </DialogWrapper>
    </>
  );
}
