import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid
} from '@mui/material';
import { useEffect, useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import emLogo from 'src/assets/images/dark_emp_logo.png';

function TopDeveloper() {
  const [topDevelopers, setTopDevelopers] = useState([]);
  // ------------------------------------------------------------------------------------------------
  const getTopDevelopers = async (lat, lang, city = 'cairo') => {
    try {
      const res = await axiosClient(
        `/account/top-developers?city=${city}&lat=${lat}&lang=${lang}`
      );
      setTopDevelopers(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPosition = async () => {
    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log(position.coords);
        return position.coords;
      },
      (err) => console.log(err)
    );
  };
  // ------------------------------------------------------------------------------------------------
  useEffect(async () => {
    await fetchPosition();
    await getTopDevelopers();
  }, []);

  // ------------------------------------------------------------------------------------------------
  return (
    <Card>
      <CardHeader title={`Recent Active Developer`} />
      <Divider />
      <Box p={3}>
        <Grid container columnSpacing={6}>
          {topDevelopers.map((topDeveloper) => (
            <Grid key={topDeveloper._id} item>
              <Box p={1} display="flex" alignItems="flex-start">
                <Avatar
                  variant="square"
                  sx={{ width: 56, height: 56 }}
                  src={
                    topDeveloper.logo
                      ? `${process.env.REACT_APP_OLD_DOMAIN_URL}/app/dl/${topDeveloper.logo}`
                      : emLogo
                  }
                />
                <Box pl={2}>
                  <Typography gutterBottom variant="subtitle2">
                    {Number(topDeveloper?.rating).toFixed(2)}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {topDeveloper.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default TopDeveloper;
