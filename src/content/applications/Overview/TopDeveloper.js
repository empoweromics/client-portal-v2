import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Rating
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import emLogo from '../../../assets/images/dark_emp_logo.png';

function TopDeveloper() {
  const [topDevelopers, setTopDevelopers] = useState([]);
  const currentCity = useRef('cairo');
  // ------------------------------------------------------------------------------------------------
  const getTopDevelopers = async () => {
    try {
      const res = await axiosClient(
        `/account/top-developers?city=${currentCity.current}`
      );
      setTopDevelopers(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  // ------------------------------------------------------------------------------------------------
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     // Call a reverse geocoding API to get the city name from the coordinates
  //     fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Extract the city name from the API response
  //         const city = data.results[0].components.city;
  //         setCurrentCity(city);
  //       })
  //       .catch((error) => console.error(error));
  //   });
  // }, []);
  // ------------------------------------------------------------------------------------------------
  useEffect(() => {
    getTopDevelopers();
  }, []);
  // ------------------------------------------------------------------------------------------------
  return (
    <Card>
      <CardHeader title="Top Developers" />
      <Divider />
      <Box p={2}>
        <Grid container columnSpacing={5}>
          {topDevelopers.map((topDeveloper) => (
            <Grid key={topDeveloper._id} item>
              <Box p={3} display="flex" alignItems="flex-start">
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
                    <Rating
                      name="read-only"
                      value={Number(topDeveloper?.rating) || 0}
                      precision={0.1}
                      readOnly
                    />
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {topDeveloper.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}

          <Grid key="dd" item xs={12} sm={6} md={4}>
            <Box p={3} display="flex" alignItems="flex-start">
              {/* <AvatarGroup max={4}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/developers/deaf0266.jpeg"
                />
                <Avatar
                  alt="Travis Howard"
                  src="/static/images/developers/a581bc53.jpeg"
                />

                <Avatar
                  alt="Agnes Walker"
                  src="/static/images/developers/5b856fc7.jpeg"
                />
                <Avatar
                  alt="Trevor Henderson"
                  src="/static/images/developers/77961aac.jpeg"
                />
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/developers/deaf0266.jpeg"
                />
                <Avatar
                  alt="Travis Howard"
                  src="/static/images/developers/a581bc53.jpeg"
                />

                <Avatar
                  alt="Agnes Walker"
                  src="/static/images/developers/5b856fc7.jpeg"
                />
                <Avatar
                  alt="Trevor Henderson"
                  src="/static/images/developers/77961aac.jpeg"
                />
              </AvatarGroup> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default TopDeveloper;
