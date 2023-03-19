import { Helmet } from 'react-helmet-async';
// import MapBox from './MapBox';
import { Card } from '@mui/material';
import GoogleMaps from './GoogelMap';

function EMapPage() {
  return (
    <>
      <Helmet>
        <title>E-map</title>
      </Helmet>
      <Card sx={{ height: '85vh' }}>
        {/* <CardHeader title="Recent Activity" /> */}
        {/* <MapBox /> */}
        <GoogleMaps />
      </Card>
    </>
  );
}

export default EMapPage;
