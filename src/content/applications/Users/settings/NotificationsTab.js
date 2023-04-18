import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Switch,
  CircularProgress
} from '@mui/material';
import axiosClient from 'src/utilities/axios/axiosIntercept';

function NotificationsTab({currentUser,setCurrentUser}) {
  const [isloading, setIsloading] = useState(false);
  const [state, setState] = useState({
    widthdraw: false,
    weeklyReport: false,
    failedOpportunity: false,
    opportunityStatusUpdate: false
  });

  const handleChange = async (event) => {
    setIsloading(true)
    const body = {
      notifications: {
        ...state,
        [event.target.name]: event.target.checked
      }
    }
    try {
      const res = await axiosClient.put('/client/account', body)
      setState(res.data.notifications);
      setCurrentUser(res.data)
    } catch (e) {
      console.log(e);
    }
    setIsloading(false)
  };
// ------------------------------------------------------------------------------------------------
useEffect(() => {
  setState(currentUser?.notifications)
}, [currentUser]);
// ------------------------------------------------------------------------------------------------
return (
    <Grid container spacing={3}>
      {isloading&&<CircularProgress sx={{position:'absolute',top:'50%',left:'50%',transform:'transulate(-50%,-50%'}}/>}
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Account</Typography>
          <Typography variant="subtitle2">
            Choose what notifications you want to receive
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Widthdraw Activity"
                secondary="Receive an email when a widthdrawal is made"
              />
              <Switch
              disabled={isloading}
                color="primary"
                checked={state.widthdraw}
                onChange={handleChange}
                name="widthdraw"
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Weekly Report"
                secondary="Receive account status weekly report in your inbox"
              />
              <Switch
              disabled={isloading}
                color="primary"
                checked={state.weeklyReport}
                onChange={handleChange}
                name="weeklyReport"
              />
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Orders</Typography>
          <Typography variant="subtitle2">
            Receive email notifications related to your orders activity
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Failed Payment"
                secondary="Get a message when a payment fails"
              />
              <Switch
              disabled={isloading}
                color="primary"
                checked={state.failedOpportunity}
                onChange={handleChange}
                name="failedOpportunity"
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Order Status Update"
                secondary="Whenever an order is updated, get a notification on your phone"
              />
              <Switch
              disabled={isloading}
                color="primary"
                checked={state.opportunityStatusUpdate}
                onChange={handleChange}
                name="opportunityStatusUpdate"
              />
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default NotificationsTab;
