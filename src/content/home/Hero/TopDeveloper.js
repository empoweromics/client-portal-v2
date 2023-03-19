import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  AvatarGroup
} from '@mui/material';

function TopDeveloper() {
  const feed = [
    {
      name: 'Developer A',
      website: 'www.developersite.com',
      projects: '10',
      avatar: '/static/images/developers/3ac2bdf5.jpeg'
    },
    {
      name: 'Developer B',
      website: 'www.developersite.com',
      projects: '86',
      avatar: '/static/images/developers/5b856fc7.jpeg'
    },
    {
      name: 'Developer C',
      website: 'www.developersite.com',
      projects: '30',
      avatar: '/static/images/developers/5ced0591.jpeg'
    },
    {
      name: 'Developer D',
      website: 'www.developersite.com',
      projects: '78',
      avatar: '/static/images/developers/77961aac.jpeg'
    },
    {
      name: 'Developer E',
      website: 'www.developersite.com',
      projects: '30',
      avatar: '/static/images/developers/86764b4d.jpeg'
    },
    {
      name: 'Developer p',
      website: 'www.developersite.com',
      projects: '55',
      avatar: '/static/images/developers/a581bc53.jpeg'
    },

    {
      name: 'Developer t',
      website: 'www.developersite.com',
      projects: '74',
      avatar: '/static/images/developers/deaf0266.jpeg'
    }
  ];

  return (
    <Card>
      <CardHeader title="Top Developers" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {feed.map((_feed) => (
            <Grid key={_feed.name} item xs={6} sm={4} lg={3}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar sx={{ width: 56, height: 56 }} src={_feed.avatar} />
                <Box pl={2}>
                  <Typography gutterBottom variant="subtitle2">
                    {_feed.projects} project
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {_feed.name}
                  </Typography>
                  <Typography color="text.primary" sx={{ pb: 2 }}>
                    {_feed.website}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}

          <Grid key="dd" item xs={6} sm={4} lg={3}>
            <Box p={3} display="flex" alignItems="flex-start">
              <AvatarGroup max={4}>
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
              </AvatarGroup>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default TopDeveloper;
