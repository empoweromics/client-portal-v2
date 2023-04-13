import { Typography, Grid, Divider, Box } from '@mui/material';
import React from 'react';
import styles from '../../style/empHome.module.css';
import { developerData } from './data';

export default function Developer() {
  return (
    <>
      {/* <TableContainer>
        <Table style={{ tableLayout: 'fixed' }}>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  borderRight: '1px solid lightGrey'
                }}
              >
                <p>
                  Orascom Development Egypt (ODE) is the largest subsidiary of
                  Orascom Development Holding (ODH). ODH is a leading developer
                  of fully integrated destinations with a diverse portfolio of
                  worldwide destinations covering Egypt, the United Arab
                  Emirates (UAE), Oman, Morocco, Montenegro, Switzerland and the
                  United Kingdom. The group operates a total of 33 hotels with
                  7,177 rooms and controls approximately 101 million sqm of
                  land.
                </p>
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: 'none',
                  borderRight: '1px solid lightGrey'
                }}
              >
                <p>
                  Building on a history of almost two decades of successful
                  operations in Egypt, SODIC is one of the countr y's leading
                  real estate development companies. Headquartered in Cairo and
                  listed on the Egyptian stock exchange, SODIC brings to the
                  market award- winning large-scale developments, meeting
                  Egypt’s ever-growing need for high quality housing, commercial
                  and retail spaces. We pride ourselves on our passion for
                  excellence and commitment to fostering long-term relationships
                  with our clients, shareholders, business partners and
                  employees, which has helped us grow to the corporation we are
                  today.
                </p>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none'
                }}
              >
                <p>
                  Inertia is a leading Egyptian real estate company that
                  develops distinctive, valuable, and dynamic projects in
                  different parts of Egypt. From our inception in 2007, Inertia
                  has been thriving; we are renowned for projects that cater to
                  today's cosmopolitan clientele, whether in the energetic
                  Cairo, by the mesmerizing Mediterranean Sea, or on the
                  enchanting Red Sea. Inertia provides more than just
                  properties, we aim to establish a close-knit and active
                  community. As a subsidiary of Inertia Holding Group, we are
                  selective with our properties as we only choose distinguished
                  projects that offer valuable homes and a gratifying lifestyle
                  aligned with contemporaneous needs.
                </p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  borderRight: '1px solid lightGrey',
                  textAlign: 'right'
                }}
              >
                <p>
                  أوراسكوم مصر هي أكبر شركة فرعية لشركة أوراسكوم القابضة وهي
                  شركة ذات وجهات متاكملة ومتنوعة دول العالم وتغطي مصر ، الإمارات
                  العربية المتحدة ، عمان ، المغرب ، مونتنيجرو، سويسراو المملكة
                  المتحدة . المجموعة تملك 33 فندق ب 7177 غرفة و تتحكم بما يقارب
                  101 مليون متر مربع من الأراضي .
                </p>
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: 'none',
                  borderRight: '1px solid lightGrey',
                  textAlign: 'right'
                }}
              >
                <p>
                  سوديك تبني تاريخ لأكثر من عقدين من مشاريع ناجحة في مصر، وهي
                  واحدة من أهم الشركات الرائدة في مجال التطوير العقاري في مصر.
                  مقرها الرئيسي في القاهرة وهي مسجلة في سوق البورصة المصرية ،
                  تقدم سوديك للسوق مشاريع حائزة على جوائز في نطاق واسع لتقابل
                  حاجة مصر المتصاعدة في البيوت والمساحات التجارية عالية الجودة .
                  الهي تفخر بشغفها بالإمتياز و الإلتزام بتقديم علاقات طويلة مدى
                  مع عملائها شركائها المساهمين والموظفين والذين ساهموا في وصول
                  هذا الصرح العظيم في شكله الآن .
                </p>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  textAlign: 'right'
                }}
              >
                <p>
                  انيرشيا هي شركة رائدة في مجال التطوير العقاري. فهي تطور مشاريع
                  فريدة ، قيمة وفعالة في أماكن متنوعة من مصر، من مفهومنا في 2007
                  اليرشيا في ازدهار دائم. فهي معروفة بمشاريعها التي تلبي مفاهيم
                  معايير المجتمع العالمي للعملاء ، سواء في القاهرة المنطلقة او
                  البحر المتوسط الفاتن او البحر الأحمر الساحر انيرشيا تقدم لك
                  أكثر من ماهو مشروعات ، فهدفها تقديم مجتمع مترابط.
                </p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  borderRight: '1px solid lightGrey',
                  textAlign: 'center'
                }}
              >
                <Typography className={styles.test} component="p" variant="h1">
                  9
                </Typography>
                <Typography component="span" variant="h6">
                  projects
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: 'none',
                  borderRight: '1px solid lightGrey',
                  textAlign: 'center'
                }}
              >
                <Typography className={styles.test} component="p" variant="h1">
                  30
                </Typography>
                <Typography component="span" variant="h6">
                  projects
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  textAlign: 'center'
                }}
              >
                <Typography component="p" variant="body1">
                  <Typography
                    className={styles.test}
                    component="p"
                    variant="h1"
                  >
                    9
                  </Typography>
                  <Typography component="span" variant="h6">
                    projects
                  </Typography>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> */}
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
                    <img alt={item.name} height={100} src={item.avatar} />
                    <p style={{ textAlign: 'left' }}>{item.eng}</p>
                    <p style={{ textAlign: 'right' }}>{item.arabic}</p>
                  </Box>
                  <Box>
                    <Typography
                      className={styles.projectNo}
                      component="p"
                      variant="h1"
                    >
                      {item.projects}
                    </Typography>
                    <Typography component="span" variant="h6">
                      projects
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
    </>
  );
}
