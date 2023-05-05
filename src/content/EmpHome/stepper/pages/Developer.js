import {
  Typography,
  Grid,
  Divider,
  Box,
  Card,
  CardContent
} from '@mui/material';
import React from 'react';
import styles from '../../style/empHome.module.css';
import { SeeMoreComponent } from 'src/components/SeeMore/seeMoreComponent';

import emLogo from 'src/assets/images/dark_emp_logo.png';

function handleError(event) {
  event.target.src = emLogo;
}

export default function EMPDeveloperSection({ empData }) {
  const developerData = Object.values(empData?.outputs || {}).map(
    (el) => el.developer
  );
  return (
    <>
      <Box padding={{ sm: '2em 1em', md: '2em 5em' }}>
        <Card
          width={{ sm: '100%', md: '90%' }}
          sx={{ m: 'auto', padding: '2em 1em' }}
        >
          <CardContent>
            <Grid container justifyContent="space-evenly" rowGap={5}>
              {developerData.map((item, index) => {
                return (
                  <>
                    <Grid
                      item
                      md={3}
                      justifyContent="center"
                      sx={{ textAlign: 'center' }}
                    >
                      <Box
                        display="flex"
                        height="100%"
                        justifyContent="space-between"
                        flexDirection="column"
                      >
                        <Box>
                          <img
                            onError={handleError}
                            alt={item.name}
                            height={100}
                            src={`${process.env.REACT_APP_OLD_DOMAIN_URL}/app/dl/${item?.logo}`}
                          />

                          <p style={{ textAlign: 'left' }}>
                            <SeeMoreComponent
                              text={item?.i18n?.en?.description}
                            />
                          </p>
                          {/* <p style={{ textAlign: 'right' }}>{item.arabic}</p> */}
                        </Box>
                        <Box>
                          <Typography
                            className={styles.projectNo}
                            component="p"
                            variant="h1"
                          >
                            {Math.floor(Math.random() * 10) + 1}
                          </Typography>
                          <Typography component="span" variant="h6">
                            projects
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    {index < 2 && (
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                    )}
                  </>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
