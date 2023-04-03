import { GoogleMap, InfoWindow, Polygon } from '@react-google-maps/api';
import React, { useState } from 'react';
import style from './style/googleMaps.module.css';
import { MapSearch } from './Search/index';
import { InfoWindowContent } from './InfoWindowContent';
import projects from './data/projects.json';
import { OppDialog } from './oppdialog/opp-dialog';

const mapOptions = {
  streetViewControl: false,
  styles: [
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
    }
    // {
    //   featureType: 'road.local',
    //   stylers: [{ visibility: 'off' }]
    // }
  ]
};

function GoogleMaps() {
  const [dialogProjectId, setDialogProjectId] = useState();
  const [OpenProjectDetails, setOpenProjectDetails] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState();
  const [center, setCenter] = useState({ lat: 30.010317, lng: 31.51263 });

  // sort project by acres from samller to larger --> to make zIndex of smaller polygon higher than larger one
  let polygonZIndex = 99999;
  projects.features.sort((a, b) => {
    return parseFloat(a.properties.acres) - parseFloat(b.properties.acres);
  });

  // ----------------------------------------------------------------------------------------------
  const getCentroid = (arr) => {
    return arr.reduce(
      function (x, y) {
        return [x[0] + y[0] / arr.length, x[1] + y[1] / arr.length];
      },
      [0, 0]
    );
  };
  // ----------------------------------------------------------------------------------------------
  const selectProject = (project) => {
    setSelectedProject(project);
    setCenter({
      lat: getCentroid(project?.geometry?.coordinates[0])[1],
      lng: getCentroid(project?.geometry?.coordinates[0])[0]
    });
  };
  // ----------------------------------------------------------------------------------------------

  const onLoad = (mapInstance) => {
    // map.current = mapInstance;
    mapInstance.data.addGeoJson(projects);
    mapInstance.data.setStyle(function (feature) {
      if (feature.getProperty('category') === 'residential') {
        return {
          fillColor: '#009A67',
          strokeColor: 'green',
          strokeWeight: 0.3,
          zIndex: polygonZIndex--,
          fillOpacity: 0.8
        };
      }

      if (feature.getProperty('category') === 'commercial') {
        return {
          fillColor: 'yellow',
          strokeColor: 'yellow',
          strokeWeight: 0.3,
          zIndex: polygonZIndex--,
          fillOpacity: 0.6
        };
      }
      if (feature.getProperty('category') === 'administrative') {
        return {
          fillColor: 'orange',
          strokeColor: 'orange',
          strokeWeight: 0.3,
          zIndex: polygonZIndex--,
          fillOpacity: 0.6
        };
      }
      return {
        fillColor: '#04516A',
        fillOpacity: 0.2,
        strokeColor: 'black',
        strokeWeight: 0.1,
        zIndex: polygonZIndex--
      };
    });

    let infowindow = new window.google.maps.InfoWindow();
    mapInstance.data.addListener('click', function ({ feature, latLng }) {
      setDialogProjectId(feature?.j?.id);
       let content = `<table class=${style.infoWindowTable}>
   <tr>
    <th>Name</th>
    <td>${feature.getProperty('name')}</td>
  </tr>
   <tr>
    <th>Category</th>
    <td> ${feature.getProperty('category')}</td>
  </tr>
  
   <tr>
    <th>Area (acres)</th>
    <td> ${feature.getProperty('acres')}</td>
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

  return (
    <>
      <MapSearch selectProject={selectProject} projects={projects} />
{<OppDialog projectId={dialogProjectId} open={!!dialogProjectId} setDialogProjectId={setDialogProjectId}/>}
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        options={mapOptions}
        center={center}
        zoom={12.5}
        onLoad={onLoad}
      >
        {selectedProject && (
          <>
            <Polygon
              paths={selectedProject?.geometry?.coordinates[0].map((el) => {
                return { lat: el[0], lng: el[1] };
              })}
              options={{
                strokeColor: 'red',
                fillColor: 'yellow'
              }}
            />
            <InfoWindow
              position={center}
              open={!!selectedProject}
              onCloseClick={() => {
                setSelectedProject(null);
              }}
            >
              <InfoWindowContent project={selectedProject} />
            </InfoWindow>
          </>
        )}
      </GoogleMap>
    </>
  );
}

export default GoogleMaps;
