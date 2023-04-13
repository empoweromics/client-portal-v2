import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1wb3dlcm9taWNzIiwiYSI6ImNreG41OWVleDFrbTEyeHFrd3lsejYwMWgifQ.koay6wvivl_leExwjgOfMA';

const MapBox = () => {
  const mapContainerRef = React.useRef(null);
  const [lng, setLng] = React.useState(-74.5);
  const [lat, setLat] = React.useState(40);
  const [zoom, setZoom] = React.useState(9);

  // Initialize map when component mounts
  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default MapBox;
