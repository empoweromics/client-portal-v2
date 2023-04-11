import {
  Card,
  Box,
  CardContent,
  Typography,
  Grid,
  Divider
} from '@mui/material';
import styles from './style/empHome.module.css';
import React from 'react';

const data = [
  {
    desc: 'Apartment 193m2 + 137m2 (Garden)',
    number: '5.6M',
    avatars: [
      '/static/images/developers/77961aac.jpeg',
      '/static/images/developers/5ced0591.jpeg'
    ]
  },
  {
    desc: 'Apartment 193m2 + 137m2 (Garden)',
    number: '5.6M',
    avatars: [
      '/static/images/developers/a581bc53.jpeg',
      '/static/images/developers/5b856fc7.jpeg'
    ]
  },
  {
    desc: 'Apartment 193m2 + 137m2 (Garden)',
    number: '5.6M',
    avatars: [
      '/static/images/developers/deaf0266.jpeg',
      '/static/images/developers/3ac2bdf5.jpeg'
    ]
  }
];
export default function IntroCard() {
  return (
    <Box padding={{ sm: '2em 1em', md: '2em 5em' }}>
      <Card
        width={{ sm: '100%', md: '90%' }}
        sx={{ m: 'auto', padding: '2em 1em' }}
      >
        <CardContent>
          <Box>
            <Grid container justifyContent="space-evenly" spacing={3}>
              <Grid item>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box textAlign="center" paddingY={3}>
                    <Typography
                      component="p"
                      variant="h3"
                      // sx={{ fontWeight: 'light' }}
                    >
                      by Salma Fikry
                    </Typography>
                    <Typography component="p" variant="body1">
                      Property Consultant
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      textAlign="center"
                    >
                      Automatically Generated
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box>
                        <Typography component="p" variant="h2">
                          13
                        </Typography>
                        <Typography component="p" variant="h2">
                          12
                        </Typography>
                      </Box>
                      <Box paddingLeft={1} textAlign="center">
                        <Typography component="p" variant="h1">
                          2021
                        </Typography>
                        <Typography
                          component="span"
                          variant="subtitle2"
                          fontSize="small"
                        >
                          @4:26PM UTC+2
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Typography component="p" variant="h3" fontWeight="light">
                  Comparative Market Analysis
                </Typography>
                <Typography component="p" variant="h3" fontWeight="light">
                  دراسة السوق حسب طلبكم
                </Typography>
                <Box className={styles.customerTitle}>
                  {/* <span className={styles.customerSubTitle}>
                Developed For صممت لـ
              </span> */}
                  <Typography component="h2" variant="h2">
                    Dr. Mahmoud Sami Gad
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <img
              style={{ margin: 'auto', display: 'block' }}
              alt="logo"
              height={100}
              src="/static/images/logo/logo.png"
            />
          </Box>

          <Divider sx={{ marginY: '2em' }} variant="middle" flexItem />
          <Box padding={{ sm: '0.5em', md: '1em' }}>
            <Typography component="p" variant="body1">
              Dear Dr.Gad
            </Typography>
            <p>
              Based on your request for a residential property in 6th October
              with a budget of EGP 5.4 Million for a ground floor apartment and
              an average area of 200 SQM. I am pleased to present to you the
              following 3 best fit options specifically developed to your
              requirements: After analyzing 67,000+ available units from 749+
              developers, in 1,944+ projects, valued at over EGP 521 Billion.
            </p>
            <p style={{ textAlign: 'right' }}>
              بناءاً على طلبك لوحدة سكنية في مدينة السادس من أكتوبر بميزانية 4.5
              مليون لشقة دور أرضي ومساحة تقريبية 200 متر. اقدم لك انسب 3 خيارات
              مصممة خصيصا لتلبية متطلباتك بعد تحليل 67,000 وحدة متاحة من أكثر من
              749 مطور عقاري بأكثر من 944,1 مشروع مقدرة بأكثر من 521 مليار
            </p>
            <Grid padding={5} container spacing={3} justifyContent="center">
              {data.map((ele) => {
                return (
                  <Grid
                    item
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    xs={12}
                    md={4}
                  >
                    <img
                      style={{ display: 'block', margin: '0.5em 0' }}
                      src={ele.avatars[0]}
                      alt="project"
                      height={100}
                    />
                    <img
                      style={{ display: 'block', margin: '0.5em 0' }}
                      src={ele.avatars[1]}
                      alt="project"
                      height={100}
                    />
                    <Typography component="p" variant="subtitle2">
                      {ele.desc}
                    </Typography>
                    <Typography component="p" variant="h4">
                      {ele.number}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
            <Box>
              <Box>
                <p>
                  Please find attached the full comparative details; feel free
                  to call or WhatsApp me to discuss and/or to schedule a site
                  visit/meeting directly with our representative at the
                  developer’s office. Thank you,
                </p>
                <p style={{ textAlign: 'right' }}>
                  نقدم لك مقارنة كاملة، لا تتردد في الاتصال او التواصل عبر
                  الواتساب لأي استفسارات اخرى او لتحديد موعد زيارة مع ممثلنا من
                  المطور العقارى. شكرا
                </p>
              </Box>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography component="p" variant="body1">
                    Salma Fikry
                  </Typography>
                  <Typography component="p" variant="body1">
                    Property Consultant
                  </Typography>
                  <Typography component="p" variant="body1">
                    +201009800884
                  </Typography>
                </Grid>
                <Grid item sx={{ textAlign: 'right' }}>
                  <Typography component="p" variant="body1">
                    سلمى فكري
                  </Typography>
                  <Typography component="p" variant="body1">
                    مستشار عقارات
                  </Typography>
                  <Typography component="p" variant="body1">
                    +٢٠١٠٠٩٨٠٠٨٨٤
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
