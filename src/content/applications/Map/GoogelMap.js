import { GoogleMap, InfoWindow, Polygon } from '@react-google-maps/api';
import React, { useState } from 'react';
import style from './style/googleMaps.module.css';
import { MapSearch } from './Search/index';
import { InfoWindowContent } from './InfoWindowContent';
import projects from './data/projects.json';
import { OppDialog } from './oppdialog/opp-dialog';
import {
  getCentroid,
  mapOptions,
  setStyle
} from 'src/utilities/map/map.config';
import { Snackbar } from '@mui/material';

function GoogleMaps() {
  const [dialogProjectId, setDialogProjectId] = useState();
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [selectedProject, setSelectedProject] = useState();
  const [center, setCenter] = useState({ lat: 30.010317, lng: 31.51263 });

  // sort project by acres from samller to larger --> to make zIndex of smaller polygon higher than larger one
  projects.features.sort((a, b) => {
    return parseFloat(a.properties.acres) - parseFloat(b.properties.acres);
  });

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
    mapInstance.data.setStyle(setStyle);

    let infowindow = new window.google.maps.InfoWindow();
    mapInstance.data.addListener('click', function ({ feature, latLng }) {
      if (
        feature.j.category === 'residential' ||
        feature.j.category === 'administrative' ||
        feature.j.category === 'commercial'
      ) {
        setDialogProjectId(feature?.j?.id);
        return;
      }
      let content = `<table class=${style.infoWindowTable}>
   <tr>
    <th>Name</th>
    <td>${feature.getProperty('name')}</td>
  </tr> 
   <tr>
    <th>Area</th>
    <td> ${feature.getProperty('acres')} (acres)</td>
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
      <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
        open={!!snackbarMsg}
        autoHideDuration={6000}
        //   onClose={handleClose}
        message={snackbarMsg}
      //   action={action}
      />
      <MapSearch selectProject={selectProject} projects={projects} />
      {
        <OppDialog
          setSnackbarMsg={setSnackbarMsg}
          projectId={dialogProjectId}
          open={!!dialogProjectId}
          setDialogProjectId={setDialogProjectId}
        />
      }
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
