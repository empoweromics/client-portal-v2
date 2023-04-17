import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
// import { unitData } from './data';

export default function Unit({empData}) {
  const unitData = Object.values(empData?.outputs || {})
  return (
    <Grid
      container
      justifyContent="space-evenly"
      // columnSpacing={5}
      rowGap={5}
    >
      {unitData?.map((item, index) => {
let installments=item?.unit?.priceBase ? (item.unit.priceBase-item.unit.priceBase*.1)/(item.unit.paymentYears*12||1):0
        return (
          <>
            <Grid
              item
              md={3}
              justifyContent="center"
              sx={{ textAlign: 'center' }}
            >
              <Box>
                <img alt={item?.name} height={100} src={`https://empoweromics.com/app/pl/${item?.project?.logo}`} />

                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Type :</span> {item?.unit?.type}
                </Typography>
                <Box paddingY={1}>
                  <Typography component="p" variant="body1">
                    <span style={{ fontWeight: 'bold' }}>Builtup Area : </span>
                    {item?.unit?.spaceBuildUp} m2
                  </Typography>
                  <Typography component="p" variant="body1">
                    {/* {item.builtupArea.garden} */}
                  </Typography>
                </Box>

                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Bedrooms : </span>

                  {/* {item.bedrooms} */}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Bathrooms : </span>

                  {/* {item.bathrooms} */}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Delivery Date : </span>

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
                  <span style={{ fontWeight: 'bold' }}>Price Per M2 : </span>
                  {/* {item.pricePerM2} EGP */}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Maintenance : </span>

                  {/* {item.maintenance} */}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Club Membership : </span>

                  {/* {item.clubMembership} */}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Parking : </span>

                  {/* {item.parking} */}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Down Payment : </span>

                (10%)  EGP {((item?.unit?.priceBase||0)/10)?.toLocaleString()}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Cash Discount : </span>
{/* 22.50 */}
                  {/* {item.cashDiscount} */}
                </Typography>
                <Box paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Installments : </span>
                  <Typography component="p" variant="body1">
                  installments  over {item?.unit?.paymentYears} yaers  
                  </Typography>
                  <Typography component="p" variant="body1">
                  EGP    {installments?.toLocaleString()} 
                  </Typography>
                  <Typography component="p" variant="body1">
                    {/* {item.installments.amount} */}
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
  );
}
