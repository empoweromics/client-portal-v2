import { Helmet } from 'react-helmet-async';
import { Card } from '@mui/material';
import GoogleMaps from './GoogelMap';

function EMapPage() {
  return (
    <>
      <Helmet>
        <title>E-map</title>
      </Helmet>

      <Card sx={{ height: '90vh' }}>
        <GoogleMaps />
      </Card>
    </>
  );
}

export default EMapPage;
