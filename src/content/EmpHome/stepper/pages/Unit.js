import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { unitData } from './data';

export default function Unit() {
  return (
    <Grid
      container
      justifyContent="space-evenly"
      // columnSpacing={5}
      rowGap={5}
    >
      {unitData?.map((item, index) => {
        return (
          <>
            <Grid
              item
              md={3}
              justifyContent="center"
              sx={{ textAlign: 'center' }}
            >
              <Box>
                <img alt={item.name} height={100} src={item.avatar} />

                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Type :</span> {item.type}
                </Typography>
                <Box paddingY={1}>
                  <Typography component="p" variant="body1">
                    <span style={{ fontWeight: 'bold' }}>Builtup Area : </span>
                    {item.builtupArea.ground}
                  </Typography>
                  <Typography component="p" variant="body1">
                    {item.builtupArea.garden}
                  </Typography>
                </Box>

                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Bedrooms : </span>

                  {item.bedrooms}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Bathrooms : </span>

                  {item.bathrooms}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Delivery Date : </span>

                  {item.deliveryDate}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Finishing : </span>

                  {item.finishing}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Price : </span>
                  {item.price} EGP
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Price Per M2 : </span>
                  {item.pricePerM2} EGP
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Maintenance : </span>

                  {item.maintenance}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Club Membership : </span>

                  {item.clubMembership}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Parking : </span>

                  {item.parking}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Down Payment : </span>

                  {item.downPayment}
                </Typography>
                <Typography component="p" variant="body1" paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Cash Discount : </span>

                  {item.cashDiscount}
                </Typography>
                <Box paddingY={1}>
                  <span style={{ fontWeight: 'bold' }}>Installments : </span>
                  <Typography component="p" variant="body1">
                    {item.installments.time}
                  </Typography>
                  <Typography component="p" variant="body1">
                    {item.installments.price}
                  </Typography>
                  <Typography component="p" variant="body1">
                    {item.installments.amount}
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
