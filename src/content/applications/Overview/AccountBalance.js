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
              0.0 EGP
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
                <Typography variant="h4">+ 0.0 EGP</Typography>
                <Typography variant="subtitle2" noWrap>
                  this month
                </Typography>
              </Box>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid sm item>
              <Button fullWidth variant="outlined">
                Transactions
              </Button>
            </Grid>
            <Grid sm item>
              <Button fullWidth variant="contained">
                Withdraw
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
