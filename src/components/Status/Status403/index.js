import { Box, Typography, Container, styled } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

export default function Status403() {
  return (
    <>
      <Helmet>
        <title>Access Denied</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/403.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
              403 Forbidden
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              your server is working, but you no longer have permission to view
              all or some of your site for some reason
            </Typography>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}
