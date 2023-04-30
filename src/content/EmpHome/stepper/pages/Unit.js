import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import React from 'react';

export default function EMPUnitSection({ empData }) {
  const unitData = Object.values(empData?.outputs || {});
  return (
    <Box padding={{ sm: '2em 1em', md: '2em 5em' }}>
      <Card
        width={{ sm: '100%', md: '90%' }}
        sx={{ m: 'auto', padding: '2em 1em' }}
      >
        <CardContent>
          <Grid container justifyContent="space-evenly" rowGap={5}>
            {unitData?.map((item, index) => {
              let installments = item?.unit?.priceBase
                ? (item.unit.priceBase - item.unit.priceBase * 0.1) /
                  (item.unit.paymentYears * 12 || 1)
                : 0;
              return (
                <>
                  <Grid
                    item
                    md={3}
                    justifyContent="center"
                    sx={{ textAlign: 'center' }}
                  >
                    <Box>
                      <img
                        alt={item?.name}
                        height={100}
                        src={`${process.env.REACT_APP_OLD_DOMAIN_URL}/app/pl/${item?.project?.logo}`}
                      />

                      <Typography component="p" variant="body1" paddingY={1}>
                        <span style={{ fontWeight: 'bold' }}>Type :</span>{' '}
                        {item?.unit?.type}
                      </Typography>
                      <Box paddingY={1}>
                        <Typography component="p" variant="body1">
                          <span style={{ fontWeight: 'bold' }}>
                            Builtup Area :{' '}
                          </span>
                          {item?.unit?.spaceBuildUp} m2
                        </Typography>
                        <Typography component="p" variant="body1">
                          {/* {item.builtupArea.garden} */}
                        </Typography>
                      </Box>

                      <Typography component="p" variant="body1" paddingY={1}>
                        <span style={{ fontWeight: 'bold' }}>
                          Delivery Date :{' '}
                        </span>
                        {item?.unit?.estDelivery[0]} Years
                      </Typography>
                      <Typography component="p" variant="body1" paddingY={1}>
                        <span style={{ fontWeight: 'bold' }}>Finishing : </span>

                        {item?.unit?.finishingType}
                      </Typography>
                      <Typography component="p" variant="body1" paddingY={1}>
                        <span style={{ fontWeight: 'bold' }}>Price : </span>
                        {item?.unit?.priceBase?.toLocaleString()} EGP
                      </Typography>
                      <Typography component="p" variant="body1" paddingY={1}>
                        <span style={{ fontWeight: 'bold' }}>
                          Price Per M2 :{' '}
                        </span>
                        {item?.unit?.spaceBuildUp &&
                          Number(
                            (
                              item.unit.priceBase / item.unit.spaceBuildUp
                            ).toFixed(2)
                          ).toLocaleString()}{' '}
                        EGP
                      </Typography>

                      <Typography component="p" variant="body1" paddingY={1}>
                        <span style={{ fontWeight: 'bold' }}>
                          Down Payment :{' '}
                        </span>
                        (10%) EGP{' '}
                        {((item?.unit?.priceBase || 0) / 10)?.toLocaleString()}
                      </Typography>

                      <Box paddingY={1}>
                        <span style={{ fontWeight: 'bold' }}>
                          Installments :{' '}
                        </span>
                        <Typography component="p" variant="body1">
                          installments over {item?.unit?.paymentYears} yaers
                        </Typography>
                        <Typography component="p" variant="body1">
                          EGP {installments?.toLocaleString()}
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
