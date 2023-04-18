import React from 'react';
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box
} from '@mui/material';
import { finData } from './data';
import { format } from 'date-fns';

const formatDate=(date,addedMonthes)=>{
  const dateObj = new Date(date);
  dateObj.setUTCMonth(dateObj.getUTCMonth()+addedMonthes );
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate
}

export default function Financials({empData}) {
  const results = Object.values(empData?.outputs || {})

 
// console.log(unit -unit*.1 / in);
  return (
    <>
      <Grid
        container
        columnSpacing={5}
        justifyContent="space-evenly"
        rowGap={5}
      >
        {results.map((item) => {
          return (
            <>
              <Grid item md={5} lg={4}>
                <Box display="flex" justifyContent="space-evenly">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                  >No. of installment: {(item?.unit?.paymentYears||0)*4}
                    {/* No. of installment: {item.InstallmentNo} */}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    Years: {item.unit?.paymentYears}
                  </Typography>
                </Box>
                <TableContainer sx={{ marginY: '0.4em' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>D.P.</TableCell>
                        <TableCell>10%</TableCell>
                        <TableCell>{(item.unit.priceBase*.1).toLocaleString()}</TableCell>
                        <TableCell>{formatDate(empData?.createdAt,0)}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                     { Array.from({length:item.unit.paymentYears*4}).map((el,i)=>{
                     
                      return(
                        <TableRow hover key={i}>
                          <TableCell>
                            <Typography
                              // variant="body1"
                              // fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {i + 1}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {/* {row.percent} */}{(100-10)/(item.unit.paymentYears*4)}%
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {/* {row.cash} */}{Number(((((100-10)/(item.unit.paymentYears*4))/100)*item.unit.priceBase).toFixed(1)).toLocaleString()}                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              fontWeight="bold"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {/* {row.date} */}{formatDate(empData.createdAt,(i+1)*3)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                      {/* {item.data.map((row, i) => {
                        return (
                          <TableRow hover key={i}>
                            <TableCell>
                              <Typography
                                // variant="body1"
                                // fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {i + 1}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {row.percent}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {row.cash}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {row.date}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })} */}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  my={2}
                  textAlign="center"
                >
                  Total: {item?.unit?.priceBase?.toLocaleString()}
                </Typography>
                {/* <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  textAlign="center"
                >
                  Mentainance= {item.mentainance}
                </Typography> */}
              </Grid>
              {/* {index !== 2 && (
                <Divider orientation="vertical" variant="middle" flexItem />
              )} */}
            </>
          );
        })}
      </Grid>
    </>
  );
}
