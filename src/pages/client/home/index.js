import { Box, Container, styled } from '@mui/material';

import Hero from './Hero';
import Copyright from './copyright';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Container maxWidth="lg">
        <Hero />
        <Copyright />
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
