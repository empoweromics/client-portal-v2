import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import styles from './projectDrawer.module.css';

import { CircularProgress, Snackbar } from '@mui/material';
import { ImgsSection } from './imgsSection';
import MenuIcon from '@mui/icons-material/Menu';
import { PricingCard } from './pricingCard';
import { SeeMoreComponent } from 'src/components/SeeMore/seeMoreComponent';
import { OtherProjects } from './otherProjects';

export function ProjectDetailsDrawer({
  open,
  setOpen,
  getProject,
  loading,
  projectDetails,
  setProjectDetails,
  errorMsg
}) {
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={!!errorMsg}
        autoHideDuration={6000}
        message={errorMsg}
      />
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            sx={{ maxWidth: '450px !important', position: 'relative' }}
            anchor={anchor}
            open={open}
            onClose={(e) => {
              if (e.key === 'Escape') {
                return;
              }
              toggleDrawer(false);
              setProjectDetails();
            }}
            BackdropProps={{ open: false }}
          >
            {loading && (
              <CircularProgress className={styles.absolute_centerd_element} />
            )}
            <div className={styles.drawer_content_wrapper}>
              <div className={styles.search_burger_wrapper}>
                {/* <MapSearch /> */}
                <MenuIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setOpen();
                  }}
                />
              </div>
              {/*  */}
              <ImgsSection projectDetails={projectDetails} />
              {projectDetails?.project?.units?.start?.priceBase && (
                <PricingCard projectDetails={projectDetails} />
              )}
              {projectDetails?.project?.i18n?.en?.description && (
                <SeeMoreComponent
                  text={projectDetails?.project?.i18n?.en?.description}
                />
              )}
              {/*  */}
              {projectDetails?.developer_projects?.length && (
                <OtherProjects
                  getProject={getProject}
                  projectDetails={projectDetails}
                />
              )}{' '}
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
