import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';

import axiosClient from 'src/utilities/axios/axiosIntercept';
import moment from 'moment';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState();

  // ------------------------------------------------------------------------------------------------
  const getEmpData = async () => {
    try {
      const res = await axiosClient.get(`/notification/latest`);
      setNotificationsList(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    getEmpData();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={1}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        TransitionProps={{ timeout: 0 }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {notificationsList &&
            notificationsList.map((notifications, index) => {
              return (
                <ListItem
                  key={index}
                  sx={{
                    p: 2,
                    minWidth: 350,
                    display: { xs: 'block', sm: 'flex' }
                  }}
                >
                  <Box flex="1" key={notifications._id}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {notifications.topic}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ textTransform: 'none' }}
                      >
                        {moment(notifications.createdAt).fromNow()}
                      </Typography>
                    </Box>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {notifications.message.substr(0, 55)}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
        </List>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
