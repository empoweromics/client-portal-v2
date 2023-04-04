import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { useEffect, useState } from 'react';
import axiosClient from 'src/utilities/axios/axiosIntercept';

function MyOpportunities() {
  const [opportunitiesList, setOpportunitiesList] = useState([]);
  useEffect(async () => {
    const axios = await axiosClient.get('/client/opportunity');
    setOpportunitiesList(axios.data.data);
    console.log(axios.data);
  }, []);

  // const opportunitiesList = [
  //   {
  //     id: '1',
  //     projectName: 'Fiat Deposit',
  //     orderDate: new Date().getTime(),
  //     status: 'completed',
  //     opportunityID: 'VUVX709ET7BY',
  //     clientName: 'Ali sad',
  //     phone: '+2015588482',
  //     installment: 34.4565,
  //     downPayment: 56787,
  //     currency: 'EGP'
  //   },
  // ]

  return (
    <Card>
      <RecentOrdersTable Opportunities={opportunitiesList} />
    </Card>
  );
}

export default MyOpportunities;
