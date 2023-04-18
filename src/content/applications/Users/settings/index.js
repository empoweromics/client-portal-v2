import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid, styled, Snackbar } from '@mui/material';
import Footer from 'src/components/Footer';

import { EditProfileTab } from './EditProfileTab';
import NotificationsTab from './NotificationsTab';
import { useEffect } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings() {
  // ----------------------------------------------------------------------------------------------
  const [currentTab, setCurrentTab] = useState('edit_profile');
  const [currentUser, setCurrentUser] = useState();
  const [snackBarMsg, setSnackBarMsg] = useState();

  const tabs = [
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'notifications', label: 'Notifications' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  // ----------------------------------------------------------------------------------------------
  const getCurrentUser = async () => {
    try {
      const res = await axiosClient.put('/client/account');
      setCurrentUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // ----------------------------------------------------------------------------------------------
  useEffect(() => {
    getCurrentUser();
  }, []);
  // ----------------------------------------------------------------------------------------------

  return (
    <>
      <Helmet>
        <title>User Settings - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              open={!!snackBarMsg}
              autoHideDuration={6000}
              //   onClose={handleClose}
              message={snackBarMsg}
              //   action={action}
            />
            {currentTab === 'edit_profile' && (
              <EditProfileTab
                setSnackBarMsg={setSnackBarMsg}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            )}
            {currentTab === 'notifications' && (
              <NotificationsTab
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            )}
            {/* {currentTab === 'security' && <SecurityTab />} */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserSettings;
