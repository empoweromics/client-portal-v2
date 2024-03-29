import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  styled,
  Avatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { useContext, useState } from 'react';
import { OverviewContext } from 'src/contexts/OverviewContext';
import { NavLink as RouterLink } from 'react-router-dom';
import WithdrawForm from 'src/components/WithdrawForm/WithdrawForm';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

function AccountBalance() {
  const account = useContext(OverviewContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card>
      <Grid item xs={12}>
        <Box p={4}>
          <Typography
            sx={{
              pb: 3
            }}
            variant="h4"
          >
            Account Balance
          </Typography>
          <Box>
            <Typography variant="h1" gutterBottom>
              {account?.balance} {account?.currency}
            </Typography>
            <Typography variant="h4" fontWeight="normal" color="text.secondary">
              Earn the highest net commission starting at 16,000 per million
              and, for the first time, collect your commission quicker through
              bank transfers.
            </Typography>
            <Box
              display="flex"
              sx={{
                py: 4
              }}
              alignItems="center"
            >
              <AvatarSuccess
                sx={{
                  mr: 2
                }}
                variant="rounded"
              >
                <TrendingUp fontSize="large" />
              </AvatarSuccess>
              <Box>
                <Typography variant="h4">
                  + {account?.balance} {account?.currency}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  this month
                </Typography>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid sm item>
              <Button
                component={RouterLink}
                to="/go/transaction"
                fullWidth
                variant="outlined"
              >
                Transactions
              </Button>
            </Grid>
            <Grid sm item>
              <Button onClick={handleClickOpen} fullWidth variant="contained">
                Withdraw
              </Button>
              {open && <WithdrawForm open={open} handleClose={handleClose} />}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
