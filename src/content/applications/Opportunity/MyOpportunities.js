import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function MyOpportunities() {
  const opportunitiesList = [
    {
      id: '1',
      projectName: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'completed',
      opportunityID: 'VUVX709ET7BY',
      clientName: 'Ali sad',
      phone: '+2015588482',
      installment: 34.4565,
      downPayment: 56787,

      currency: 'EGP'
    },
    {
      id: '2',
      projectName: 'Fiat Deposit',
      orderDate: subDays(new Date(), 1).getTime(),
      status: 'completed',
      opportunityID: '23M3UOG65G8K',
      clientName: 'Ahmed khaled',
      phone: '+2010525188',
      installment: 6.58454334,
      downPayment: 8734587,

      currency: 'EGP'
    },
    {
      id: '3',
      projectName: 'Fiat Deposit',
      orderDate: subDays(new Date(), 5).getTime(),
      status: 'failed',
      opportunityID: 'F6JHK65MS818',
      clientName: 'Bank Account',
      phone: '+20126925988',
      installment: 6.58454334,
      downPayment: 8734587,

      currency: 'EGP'
    },
    {
      id: '4',
      projectName: 'Fiat Deposit',
      orderDate: subDays(new Date(), 55).getTime(),
      status: 'completed',
      opportunityID: 'QJFAI7N84LGM',
      clientName: 'Mariam sayed',
      phone: '+20106251111',
      installment: 6.58454334,
      downPayment: 8734587,

      currency: 'EGP'
    },
    {
      id: '5',
      projectName: 'Fiat Deposit',
      orderDate: subDays(new Date(), 56).getTime(),
      status: 'pending',
      opportunityID: 'BO5KFSYGC0YW',
      clientName: 'sam Account',
      phone: '+20126925988',
      installment: 6.58454334,
      downPayment: 8734587,

      currency: 'EGP'
    },
    {
      id: '6',
      projectName: 'Fiat Deposit',
      orderDate: subDays(new Date(), 33).getTime(),
      status: 'completed',
      opportunityID: '6RS606CBMKVQ',
      clientName: 'Bank Account',
      phone: '*** 1111',
      installment: 6.58454334,
      downPayment: 8734587,

      currency: 'EGP'
    },
    {
      id: '7',
      projectName: 'Fiat Deposit',
      orderDate: new Date().getTime(),
      status: 'pending',
      opportunityID: '479KUYHOBMJS',
      clientName: 'Bank Account',
      phone: '+20126925988',
      installment: 2.346546,
      downPayment: 234234,

      currency: 'EGP'
    },
    {
      id: '8',
      projectName: 'Paypal Withdraw',
      orderDate: subDays(new Date(), 22).getTime(),
      status: 'completed',
      opportunityID: 'W67CFZNT71KR',
      clientName: 'Paypal Account',
      phone: '+20126925988',
      installment: 3.345456,
      downPayment: 34544,

      currency: 'EGP'
    },
    {
      id: '9',
      projectName: 'Fiat Deposit',
      orderDate: subDays(new Date(), 11).getTime(),
      status: 'completed',
      opportunityID: '63GJ5DJFKS4H',
      clientName: 'Bank Account',
      phone: '+20126925988',
      installment: 1.4389567945,
      downPayment: 123843,

      currency: 'EGP'
    },
    {
      id: '10',
      projectName: 'Wallet Transfer',
      orderDate: subDays(new Date(), 123).getTime(),
      status: 'failed',
      opportunityID: '17KRZHY8T05M',
      clientName: 'Wallet Transfer',
      phone: '+20126925988',
      installment: 765.5695,
      downPayment: 7567,

      currency: 'EGP'
    }
  ];

  return (
    <Card>
      <RecentOrdersTable Opportunities={opportunitiesList} />
    </Card>
  );
}

export default MyOpportunities;
