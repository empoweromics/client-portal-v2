import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  styled,
  Rating
} from '@mui/material';

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SchoolIcon from '@mui/icons-material/School';
import { useEffect, useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
`
);

function RecentActivity() {
  const [account, setAccount] = useState();
  // ----------------------------------------------------------------------------------------------
  const getAccount = async () => {
    try {
      const res = await axiosClient('/account');
      setAccount(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    getAccount();
  }, []);
  return (
    <Card sx={{ paddingBottom: '1em' }}>
      <CardHeader title="Recent Activity" />
      <Divider />
      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <Rating name="read-only" value={3.6} precision={0.1} readOnly />
        <Typography variant="h3">({3.6})</Typography>
      </Box>
      <Divider />
      {account?.opportunity.length > 0 && (
        <Box px={2} py={2} display="flex" alignItems="flex-start">
          <AvatarPrimary>
            <MapsHomeWorkIcon />
          </AvatarPrimary>
          <Box pl={1} flex={1}>
            <Typography variant="h4">Opportunities</Typography>
            <Box pt={2} display="flex">
              {account?.opportunity?.map((el) => {
                return (
                  <Box key={el._id} pr={8}>
                    <Typography gutterBottom variant="caption">
                      {el._id}
                    </Typography>
                    <Typography variant="h3">{el.count}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}

      <Divider />
      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <SchoolIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h4">Academy</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography gutterBottom variant="caption">
                total
              </Typography>
              <Typography variant="h3">{account?.academy?.total}</Typography>
            </Box>
            <Box pr={8}>
              <Typography gutterBottom variant="caption">
                Level
              </Typography>
              <Typography variant="h3">{account?.academy?.level}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default RecentActivity;
