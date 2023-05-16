/* eslint-disable jsx-a11y/no-static-element-interactions */
import { GoogleMap, InfoWindow, Polygon } from '@react-google-maps/api';
import React, { useState } from 'react';
import style from './style/googleMaps.module.css';
import { MapSearch } from './Search/index';
import { InfoWindowContent } from './InfoWindowContent';
import projects from 'src/data/projects.json';
import {
  getCentroid,
  mapOptions,
  setStyle
} from 'src/utilities/map/map.config';
import { Snackbar } from '@mui/material';
import MapControl from './controller/map.controller';
import { ProjectDetailsDrawer } from './projectDetailsDrawer/projectDetailsDrawer';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import { OppDialog } from './oppdialog/opp-dialog';

function GoogleMaps() {
  // const [dialogProjectId, setDialogProjectId] = useState();
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [openProjectDetailsDrawer, setOpenProjectDetailsDrawer] = useState();
  const [center, setCenter] = useState({ lat: 30.010317, lng: 31.51263 });
  const [projectDetails, setProjectDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  // ----------------------------------------------------------------------------------------------
  const getProjectDetails = async (projectId) => {
    setLoading(true);
    try {
      setOpenProjectDetailsDrawer(true);
      const res = await axiosClient.get(`/project/${projectId}`);
      setProjectDetails(res.data);
    } catch (e) {
      setErrorMsg(
        'Something went wrong with getting  project details, please try again'
      );
    }
    setLoading(false);
  };

  // ----------------------------------------------------------------------------------------------
  const findProjectById = (projectId) => {
    let projectWithPolygon = projects.features.find(
      (project) => project?.properties?.id === projectId
    );
    getProjectDetails(projectId);
    setCenter({
      lat: getCentroid(projectWithPolygon?.geometry?.coordinates[0])[1],
      lng: getCentroid(projectWithPolygon?.geometry?.coordinates[0])[0]
    });
    console.log(getCentroid(projectWithPolygon?.geometry?.coordinates[0])[1]);
  };
  // ----------------------------------------------------------------------------------------------

  // sort project by acres from samller to larger --> to make zIndex of smaller polygon higher than larger one
  projects.features.sort((a, b) => {
    return parseFloat(a.properties.acres) - parseFloat(b.properties.acres);
  });

  const selectProject = (project) => {
    findProjectById(project._id);
  };
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------

  const onLoad = (mapInstance) => {
    // map.current = mapInstance;
    mapInstance.data.addGeoJson(projects);
    mapInstance.data.setStyle(setStyle);
    mapInstance.data.addListener('click', function ({ feature, latLng }) {
      console.log(feature, latLng);
      // setCenter(latLng);
      mapInstance.panTo(latLng);

      if (
        feature.h.category !== 'residential' &&
        feature.h.category !== 'administrative' &&
        feature.h.category !== 'commercial'
      ) {
        setOpenProjectDetailsDrawer();
        return;
      }
      findProjectById(feature?.h?.id);
    });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={!!snackbarMsg}
        autoHideDuration={6000}
        //   onClose={handleClose}
        message={snackbarMsg}
        //   action={action}
      />

      {
        <OppDialog
          setSnackbarMsg={setSnackbarMsg}
          open={openDialog}
          projectDetails={projectDetails}
          setProjectDetails={setProjectDetails}
          setOpen={setOpenDialog}
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
        <MapControl position="TOP_LEFT" classNameChild={style.combinedMapForm}>
          <ProjectDetailsDrawer
            loading={loading}
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            errorMsg={errorMsg}
            getProject={findProjectById}
            open={openProjectDetailsDrawer}
            setOpen={setOpenProjectDetailsDrawer}
            setSnackbarMsg={setSnackbarMsg}
          />
        </MapControl>
        <MapControl position="TOP_RIGHT" classNameChild={style.combinedMapForm}>
          <MapSearch selectProject={selectProject} projects={projects} />
        </MapControl>
        {openProjectDetailsDrawer && (
          <>
            <Polygon
              paths={openProjectDetailsDrawer?.geometry?.coordinates[0].map(
                (el) => {
                  return { lat: el[0], lng: el[1] };
                }
              )}
              options={{
                strokeColor: 'red',
                fillColor: 'yellow'
              }}
            />
          </>
        )}
        {openProjectDetailsDrawer && (
          <InfoWindow
            position={center}
            open={!!openProjectDetailsDrawer}
            options={{ disableCloseButton: true }}
          >
            <InfoWindowContent
              loading={loading}
              setOpenSubmitForm={setOpenDialog}
              projectDetails={projectDetails}
            />
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

export default GoogleMaps;
