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
import { SeeMoreComponent } from '../../components/SeeMore/seeMoreComponent';

export default function IntroCard({ empData }) {
  const outputs = Object.values(empData?.outputs || {});
  const createdAtDate = new Date(empData?.createdAt);
  const createdAttimeString = createdAtDate.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  const offsetHours = createdAtDate.getTimezoneOffset() / -60;
  const finalString = `@${createdAttimeString} UTC${
    offsetHours > 0 ? '+' : '-'
  }${Math.abs(offsetHours)}`;

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
                      by {empData?.user?.displayName}
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
                          {empData?.createdAt &&
                            new Date(empData?.createdAt).getDate()}
                        </Typography>
                        <Typography component="p" variant="h2">
                          {empData?.createdAt &&
                            new Date(empData?.createdAt).getMonth()}
                        </Typography>
                      </Box>
                      <Box paddingLeft={1} textAlign="center">
                        <Typography component="p" variant="h1">
                          {empData?.createdAt &&
                            new Date(empData?.createdAt).getFullYear()}
                        </Typography>
                        <Typography
                          component="span"
                          variant="subtitle2"
                          fontSize="small"
                        >
                          {finalString}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Grid container justifyContent="space-evenly" spacing={3}>
                  <Grid item>
                    <Typography component="p" variant="h3" fontWeight="light">
                      Comparative Market Analysis
                    </Typography>
                    <Typography component="p" variant="h3" fontWeight="light">
                      دراسة السوق حسب طلبكم
                    </Typography>
                    <Box className={styles.customerTitle}>
                      <Typography component="h2" variant="h2">
                        <b>{empData?.inputs?.clientname}</b>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <img
                      style={{ margin: 'auto', display: 'block' }}
                      alt="logo"
                      height={200}
                      src="/static/images/logo/logo.png"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ marginY: '2em' }} variant="middle" flexItem />
          <Box padding={{ sm: '0.5em', md: '1em' }}>
            <Typography component="p" variant="body1">
              Dear{' '}
              <b>
                {' '}
                <u>{empData?.inputs?.clientname}</u>
              </b>
            </Typography>
            <p>
              Based on your request for a{' '}
              <b>
                <u>{empData?.inputs?.category}</u>
              </b>{' '}
              property in{' '}
              <b>
                <u>{empData?.inputs?.area}</u>
              </b>{' '}
              with a budget of EGP{' '}
              <b>
                <u>
                  {((empData?.inputs?.budget || 0) / 1000000).toFixed(1)}{' '}
                  Million
                </u>
              </b>
              for a{' '}
              <b>
                <u>{empData?.inputs?.type}</u>
              </b>{' '}
              and an average area of {empData?.inputs?.sqm} SQM. I am pleased to
              present to you the following 3 best fit options specifically
              developed to your requirements: After analyzing 67,000+ available
              units from 749+ developers, in 1,944+ projects, valued at over EGP
              521 Billion.
            </p>
            <p style={{ textAlign: 'right' }}>
              بناءاً على طلبك لوحدة سكنية في مدينة السادس من أكتوبر بميزانية 4.5
              مليون لشقة دور أرضي ومساحة تقريبية 200 متر. اقدم لك انسب 3 خيارات
              مصممة خصيصا لتلبية متطلباتك بعد تحليل 67,000 وحدة متاحة من أكثر من
              749 مطور عقاري بأكثر من 944,1 مشروع مقدرة بأكثر من 521 مليار
            </p>
            <Grid padding={5} container spacing={3} justifyContent="center">
              {outputs?.map((el) => {
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
                      src={`${process.env.REACT_APP_OLD_DOMAIN_URL}/app/dl/${el?.developer?.logo}`}
                      alt="developer"
                      height={100}
                    />
                    <img
                      style={{ display: 'block', margin: '0.5em 0' }}
                      src={`${process.env.REACT_APP_OLD_DOMAIN_URL}/app/pl/${el?.project?.logo}`}
                      alt="project"
                      height={100}
                    />
                    <SeeMoreComponent
                      text={el?.project?.i18n?.en?.description}
                    />
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
                    {empData?.user?.displayName}
                  </Typography>
                  <Typography component="p" variant="body1">
                    Property Consultant
                  </Typography>
                  <Typography component="p" variant="body1">
                    {empData?.user?.phone}
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
