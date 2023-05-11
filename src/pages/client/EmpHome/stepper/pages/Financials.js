import React, { useState } from 'react';
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Card,
  CardContent,
  Button
} from '@mui/material';
import axiosClient from 'src/utilities/axios/axiosIntercept';
import { SuccessMsgPopup } from 'src/components/Messages/SuccessMsgPopup';
import { nFormatter } from 'src/utilities/numbers/nFormatter';

const formatDate = (date, addedMonthes) => {
  const dateObj = new Date(date);
  dateObj.setUTCMonth(dateObj.getUTCMonth() + addedMonthes);
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export default function EMPFinancialsSection({ empData }) {
  const outputs = Object.values(empData?.outputs || {});
  const inputs = empData?.inputs || {};
  const user = empData?.user || {};
  const _id = empData?._id || '';

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [generatedEmpId, setGeneratedEmpId] = useState('');

  const SubmitOpportunity = async (item, index) => {
    let paymentYears = item.unit.paymentYears || 8;
    const body = {
      client: {
        name: inputs.clientname,
        phone: inputs.clientphone,
        directly: false
      },
      project: {
        _id: item.project?._id,
        name: item.project?.name,
        developer: item.developer?.name
      },
      budget: {
        downpayment: Number(item.unit.priceBase * 0.1),
        installmentAmountDue: Number(
          ((100 - 10) / (paymentYears * 4) / 100) * item.unit.priceBase
        ),
        totalNumberOfInstallments: paymentYears * 4
      },
      emp: { _id, selected: index + 1 }
    };
    const res = await axiosClient.post('/opportunity/submit', body, {
      headers: {
        user: user._id
      }
    });
    setGeneratedEmpId(res.data.data._id);
    setOpenSuccessModal(true);
  };
  return (
    <Box padding={{ sm: '2em 1em', md: '2em 5em' }}>
      <Card
        width={{ sm: '100%', md: '90%' }}
        sx={{ m: 'auto', padding: '2em 1em' }}
      >
        <CardContent>
          <Grid
            container
            columnSpacing={5}
            justifyContent="space-evenly"
            rowGap={5}
          >
            {outputs.map((item, index) => {
              let paymentYears = 8;
              let paymentYearsAssumtion = 'assume that avg payment years = 8';
              if (item?.unit?.paymentYears) {
                paymentYears = item?.unit?.paymentYears;
                paymentYearsAssumtion = undefined;
              }
              return (
                <>
                  <Grid item md={12} lg={4}>
                    <Box display="flex" justifyContent="space-evenly">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        No. of installment: {paymentYears * 4}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        Years: {paymentYears}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.error"
                      >
                        {paymentYearsAssumtion}
                      </Typography>
                    </Box>
                    <TableContainer sx={{ marginY: '0.4em' }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>D.P.</TableCell>
                            <TableCell>10%</TableCell>
                            <TableCell>
                              {(item.unit.priceBase * 0.1).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {formatDate(empData?.createdAt, 0)}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Array.from({
                            length: paymentYears * 4
                          }).map((el, i) => {
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
                                    {/* {row.percent} */}
                                    {Number(
                                      (100 - 10) / (paymentYears * 4)
                                    ).toFixed(1)}
                                    %
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
                                    {/* {row.cash} */}
                                    {Number(
                                      (
                                        ((100 - 10) /
                                          (paymentYears * 4) /
                                          100) *
                                        item.unit.priceBase
                                      ).toFixed(2)
                                    ).toLocaleString()}{' '}
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
                                    {/* {row.date} */}
                                    {formatDate(empData.createdAt, (i + 1) * 3)}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Button
                      disabled={item.submited}
                      size="large"
                      variant="contained"
                      onClick={() => SubmitOpportunity(item, index)}
                    >
                      Book Your Unit Now Total:{' '}
                      {nFormatter(item?.unit?.priceBase)} EGP
                    </Button>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
      <SuccessMsgPopup
        setOpen={setOpenSuccessModal}
        open={openSuccessModal}
        id={generatedEmpId}
        message={'Opportunity submited successfully!'}
      />
    </Box>
  );
}
