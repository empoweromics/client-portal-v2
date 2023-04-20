import React from 'react';
import {
  Typography,
  Grid,
  Divider,
  Box,
  Card,
  CardContent
} from '@mui/material';

export default function EMPProjectSection({ empData }) {
  const projectsData = Object.values(empData?.outputs || {});
  return (
    <Box padding={{ sm: '2em 1em', md: '2em 5em' }}>
      <Card
        width={{ sm: '100%', md: '90%' }}
        sx={{ m: 'auto', padding: '2em 1em' }}
      >
        <CardContent>
          <Grid
            container
            justifyContent="space-evenly"
            // columnSpacing={5}
            rowGap={5}
          >
            {projectsData?.map((item, index) => {
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
                          alt={item?.project.name}
                          height={190}
                          src={`${process.env.REACT_APP_OLD_DOMAIN_URL}/app/pp/${item?.project?.logo}`}
                        />
                        <p style={{ textAlign: 'left' }}>
                          {item?.project?.i18n?.en?.description}
                        </p>

                        {/* <p style={{ textAlign: 'right' }}>{item.arabic}</p> */}
                      </Box>
                      <Box>
                        <Typography component="p" variant="h6" marginY={2}>
                          <b>{item?.unit?.category}</b>
                        </Typography>
                        <Typography component="p" variant="h6">
                          <b>{item?.project?.state}</b>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  {index < 2 && (
                    <Divider orientation="vertical" variant="middle" flexItem />
                  )}
                </>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
