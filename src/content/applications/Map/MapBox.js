// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS;
function MapBox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  // const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      // style: 'mapbox://styles/mapbox/light-v11', // style URL
      center: [31.51263, 30.010317],
      zoom: 13
    });
    if (map.current) {
      map.current.on('load', () => {
        map.current.addSource('eastown', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              // These coordinates outline Maine.
              coordinates: [
                [
                  [31.51263, 30.010317],
                  [31.514304, 30.008361],
                  [31.515715, 30.006633],
                  [31.516036, 30.006521],
                  [31.516219, 30.006531],
                  [31.51639, 30.006591],
                  [31.517158, 30.007074],
                  [31.517913, 30.007586],
                  [31.517061, 30.008556],
                  [31.516836, 30.011362],
                  [31.514105, 30.011222],
                  [31.51263, 30.010317]
                ],
                [
                  [31.48200603546475, 30.02056168141381],
                  [31.48198986578964, 30.02044034413118],
                  [31.481973696114522, 30.01924096377336],
                  [31.48198447589793, 30.018988952048442],
                  [31.482016815248162, 30.018872279736623],
                  [31.482167732215895, 30.018783608687876],
                  [31.482555804418627, 30.020734353444603],
                  [31.48214617264907, 30.020678351737846],
                  [31.48200603546475, 30.02056168141381]
                ]
              ]
            }
          }
        });

        // Add a new layer to visualize the polygon.
        map.current.addLayer({
          id: 'eastown',
          type: 'fill',
          source: 'eastown', // reference the data source
          layout: {},
          paint: {
            'fill-color': '#F3AA40', // blue color fill
            'fill-opacity': 0.7
          }
        });
        // Add a black outline around the polygon.
        map.current.addLayer({
          id: 'outline',
          type: 'line',
          source: 'eastown',
          layout: {},
          paint: {
            'line-color': '#000',
            'line-width': 2
          }
        });

        // HTML from the click event's properties.
        map.current.on('click', 'eastown', (e) => {
          console.log(e);
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('eastown parks - constructed (partial)')
            .addTo(map.current);
        });

        // Change the cursor to a pointer when
        // the mouse is over the states layer.
        map.current.on('mouseenter', 'eastown', () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });

        // Change the cursor back to a pointer
        // when it leaves the states layer.
        map.current.on('mouseleave', 'maine', () => {
          map.current.getCanvas().style.cursor = '';
        });
      });
    }
  }, []);
  return (
    <div
      style={{ height: '700px' }}
      ref={mapContainer}
      className="map-container"
    />
  );
}

export default MapBox;
