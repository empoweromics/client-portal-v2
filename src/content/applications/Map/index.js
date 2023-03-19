import { Helmet } from 'react-helmet-async';
// import MapBox from './MapBox';
import { Card } from '@mui/material';
import GoogleMaps from './GoogelMap';
// import Search from './Search';

function EMapPage() {
  return (
    <>
      <Helmet>
        <title>E-map</title>
      </Helmet>

      {/* <Card sx={{ margin: '1em' }}>
        <Search />
      </Card> */}
      <Card sx={{ height: '90vh' }}>
        {/* <CardHeader title={} /> */}
        {/* <CardHeader title="Recent Activity" /> */}
        {/* <MapBox /> */}
        <GoogleMaps />
      </Card>
    </>
  );
}

export default EMapPage;
