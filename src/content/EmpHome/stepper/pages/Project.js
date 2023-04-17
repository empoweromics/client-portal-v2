import React from 'react';
import { Typography, Grid, Divider, Box } from '@mui/material';
// import { projectsData } from './data';

export default function Project({empData}) {
  const projectsData = Object.values(empData?.outputs || {})

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
                  O West is set to rise as a beacon of integrated living.
                  Envisioned as a complete sensory experience, full of energy,
                  playing diferently to everyone, from shops to restaurants,
                  sports club to common spaces, this place ofers an experience
                  you can taste, touch, smell, hear, see and more importantly;
                  feel. It is constantly evolving and changing, adapting and
                  growing. Like an Ecosystem, everything within O West is
                  intelligently & harmoniously designed to ofer a true wholesome
                  town experience.
                </p>
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: 'none',
                  borderRight: '1px solid lightGrey'
                }}
              >
                <p>
                  Located in strategic location within 6th of October city just
                  15 minutes’ drive from SODIC West. October Plaza combines the
                  contemporary architecture with diversity of activities naming
                  a few a 1.7Km safe walkways, cycling pathways, swimming pools
                  and meeting spots in order to provide a true living community,
                  one where you belong.
                </p>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none'
                }}
              >
                <p>
                  Located in strategic location within 6th of October city just
                  15 minutes’ drive from SODIC West. October Plaza combines the
                  contemporary architecture with diversity of activities naming
                  a few a 1.7Km safe walkways, cycling pathways, swimming pools
                  and meeting spots in order to provide a true living community,
                  one where you belong.
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
                  أو ويست هي كمبوند يقدم معني الحياة المجتمعية الموحدة وصورة
                  كتجربة كاملة الإحساس مليئة بالطاقة ومختلفة لكل شخص ، بداية من
                  المحلات والمطاعم والنوادي الرياضية إلى الأماكن العامة، أو ويست
                  يعطيك تجربة يمكنك أن تشعر بها ، تلمسها ، تسمعها وتراها والأهم
                  أنها دائما متطورة ، متغيرة ،متأقلمة وتنمو بإستمرار. كل الأشياء
                  في أو ويست ذكية وصديقة للبيئة في إنسجام مصممة لتقدم لك تجربة
                  مكتملة.
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
                  يقع أكتوبر بلازا في موقع إستراتيجي يبعد 15 دقيقة فقط من سوديك
                  ويست في مدينة السادس من أكتوبر. ويجمع بين المعمار المعاصر
                  والتنوع في الأنشطة في نطاق 1.7 كيلومتر من طرق آمنة للمشي وركوب
                  العجل وحمامات سباحة وأيضاً نقاط للالتقاء من أجل تقديم مجتمع
                  سكني حقيقي تنتمي له.
                </p>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  textAlign: 'right'
                }}
              >
                <p>
                  تحتوي جولز على أكثر من 1150 وحدة سكنية في أشكال كثيرة كالشقق
                  والمنازل والفيلات والتوين هاوس. كل هذه الوحدات مصممة لتكون
                  مغطاة بإضاءة طبيعية. وليس هذا فقط جولز تقدم لك "الموطن
                  الإجتماعي" أو "السكن " الذي تستحقه . بإتباعها فلسفة صديقة
                  للبيئة .كما أن جولز مصممة خصيصاً لتعطيك أفضل مناح في مصر.
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
                <Typography component="p" variant="body1">
                  Residential and Commercial
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: 'none',
                  borderRight: '1px solid lightGrey',
                  textAlign: 'center'
                }}
              >
                <Typography component="p" variant="body1">
                  Residential and Commercial
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  textAlign: 'center'
                }}
              >
                <Typography component="p" variant="body1">
                  Residential
                </Typography>
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
                <Typography component="p" variant="body1">
                  Under Construction
                </Typography>
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: 'none',
                  borderRight: '1px solid lightGrey',
                  textAlign: 'center'
                }}
              >
                <Typography component="p" variant="body1">
                  Under Construction
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  textAlign: 'center'
                }}
              >
                <Typography component="p" variant="body1">
                  Under Construction
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> */}

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
                    <img alt={item?.project.name} height={100} src={`https://empoweromics.com/app/pl/${item?.project?.logo}`} />
                    <p style={{ textAlign: 'left' }}>{item?.project?.i18n?.en?.description}</p>
                    {/* <p style={{ textAlign: 'right' }}>{item.arabic}</p> */}
                  </Box>
                  <Box>
                    <Typography component="p" variant="h6" marginY={2}>
                      {item?.unit?.category}
                    </Typography>
                    <Typography component="p" variant="h6">
                      {item?.project?.state}
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
