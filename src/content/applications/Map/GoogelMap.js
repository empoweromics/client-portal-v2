import { GoogleMap } from '@react-google-maps/api';
import { useEffect, useState, useRef } from 'react';
// import { useRef, useEffect } from 'react';
import axios from 'axios';
import { getStorage, setStorage } from 'src/utilities/storage/storage';
import { CardHeader, CircularProgress } from '@mui/material';
import style from './googleMaps.module.css';

function GoogleMaps() {
  const [polygons, setPolygons] = useState(null);
  const [loading, setLoading] = useState(false);

  const map = useRef(null);
  function getData() {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_DEVELOP_URL}/projects/polygons`)
      .then((res) => {
        setPolygons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (polygons) {
      setStorage('EMap', JSON.stringify(polygons), 60 * 60 * 24); // store 1 day
      map.current.data.addGeoJson(polygons);
      setLoading(false);
      // fitBounds(map.current);
      map.current.data.setStyle(function (feature) {
        if (feature.j.state === 'constructed') {
          return {
            fillColor: 'green',
            strokeColor: 'green',
            strokeWeight: 0.3
          };
        }

        if (feature.j.state === 'under construction') {
          return {
            fillColor: 'yellow',
            strokeColor: 'yellow',
            strokeWeight: 0.3
          };
        }
        if (feature.j.state === 'constructed (partial)') {
          return {
            fillColor: 'orange',
            strokeColor: 'orange',
            strokeWeight: 0.3
          };
        }
        return { fillColor: 'black', strokeColor: 'black', strokeWeight: 0.3 };
      });
    }
  }, [polygons]);
  useEffect(() => {
    setLoading(true);
    let data = getStorage('EMap');
    if (data) {
      setPolygons(JSON.parse(data));
    } else {
      getData();
    }
  }, []);

  // function processPoints(geometry, callback, thisArg) {
  //   if (geometry instanceof window.google.maps.LatLng) {
  //     callback.call(thisArg, geometry);
  //   } else if (geometry instanceof window.google.maps.Data.Point) {
  //     callback.call(thisArg, geometry.get());
  //   } else {
  //     geometry.getArray().forEach(function (g) {
  //       processPoints(g, callback, thisArg);
  //     });
  //   }
  // }
  // function fitBounds(mapInstance) {
  //   let bounds = new window.google.maps.LatLngBounds();
  //   mapInstance.data.forEach(function (feature) {
  //     feature.getGeometry().forEachLatLng(function (latlng) {
  //       bounds.extend(latlng);
  //     });
  //   });

  //   mapInstance.fitBounds(bounds);
  // }
  const onLoad = (mapInstance) => {
    map.current = mapInstance;

    // mapInstance.data.addListener('addfeature', function (event) {
    //   console.log('addfeature');
    //   let bounds = new window.google.maps.LatLngBounds();
    //   processPoints(event.feature.getGeometry(), bounds.extend, bounds);
    //   mapInstance.setCenter(bounds.getCenter());
    //   mapInstance.fitBounds(bounds);
    // });
    let infowindow = new window.google.maps.InfoWindow();
    mapInstance.data.addListener('click', function ({ feature, latLng }) {
      let content = `<table class=${style.infoWindowTable}>
   <tr>
    <th>Name</th>
    <td>${feature.j.name}</td>
  </tr>
   <tr>
    <th>Category</th>
    <td>${feature.j.category}</td>
  </tr>
  <tr>
    <th>Area Name</th>
    <td>${feature.j.area}</td>
  </tr>
   <tr>
    <th>Area (acres)</th>
    <td>${feature.j.acres}</td>
  </tr>
 <tr>
    <th>City</th>
    <td>${feature.j.city}</td>
  </tr>
   <tr>
    <th>Country</th>
    <td>${feature.j.country}</td>
  </tr>
  <tr>
    <th>Supplier</th>
    <td>${feature.j.supplier}</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>${feature.j.description}</td>
  </tr>
</table>`;
      infowindow.setContent(content);

      infowindow.setPosition(latLng);
      infowindow.open(mapInstance);
    });

    mapInstance.addListener('click', function () {
      infowindow.close();
    });
  };
  const options = {
    styles: [
      // {
      //   featureType: 'administrative',
      //   stylers: [{ visibility: 'off' }]
      // },
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road.arterial',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road.highway',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road.highway.controlled_access',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road.local',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  return (
    <>
      <CardHeader
        title={
          loading ? <CircularProgress color="secondary" /> : 'Recent Activity'
        }
      />
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        options={options}
        center={{ lat: 30.010317, lng: 31.51263 }}
        zoom={12.5}
        onLoad={onLoad}
      >
        {/* {polygonsData?.map((polygon, i) => {
        console.log(polygon);
        return (
          <Polygon
            key={i}
            onLoad={onLoad}
            paths={polygon.geoJSON.coordinates}
            options={polygonOptions}
          >
            <SingleMarker polygon={polygon} />;
          </Polygon>
        );
      })} */}
        {/* {infoWindow && (
        <InfoWindow position={infoWindow.position}>
          <Box p={2}>{infoWindow.data}</Box>
        </InfoWindow>
      )} */}
      </GoogleMap>
    </>
  );
}

export default GoogleMaps;
