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

export default function Financials() {
  return (
    <>
      <Grid
        container
        columnSpacing={5}
        justifyContent="space-evenly"
        rowGap={5}
      >
        {finData.map((item) => {
          return (
            <>
              <Grid item md={5} lg={4}>
                <Box display="flex" justifyContent="space-evenly">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    No. of installment: {item.InstallmentNo}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    Years: {item.years}
                  </Typography>
                </Box>
                <TableContainer sx={{ marginY: '0.4em' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>D.P.</TableCell>
                        <TableCell>{item.percent}</TableCell>
                        <TableCell>{item.cash}</TableCell>
                        <TableCell>{item.date}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.data.map((row, i) => {
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
                      })}
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
                  Total: {item.total}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  textAlign="center"
                >
                  Mentainance: {item.mentainance}
                </Typography>
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
