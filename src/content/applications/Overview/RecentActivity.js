import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  styled
} from '@mui/material';

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import SchoolIcon from '@mui/icons-material/School';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
`
);

function RecentActivity() {
  return (
    <Card>
      <CardHeader title="Recent Activity" />
      <Divider />
      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <MapsHomeWorkIcon />
        </AvatarPrimary>
        <Box pl={1} flex={1}>
          <Typography variant="h4">Opportunities</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography gutterBottom variant="caption">
                Total
              </Typography>
              <Typography variant="h3">0</Typography>
            </Box>
            <Box pr={8}>
              <Typography gutterBottom variant="caption">
                Failed
              </Typography>
              <Typography variant="h3">0</Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant="caption">
                Done
              </Typography>
              <Typography variant="h3">0</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
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
                Totla
              </Typography>
              <Typography variant="h3">10</Typography>
            </Box>
            <Box pr={8}>
              <Typography gutterBottom variant="caption">
                Level
              </Typography>
              <Typography variant="h3">A1</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default RecentActivity;
