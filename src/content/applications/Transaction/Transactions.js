import { Card } from '@mui/material';
import RecentTransactionsTable from './RecentTransactionsTable';

function Transactions() {
  const transactionsList = [
    {
      _id: '64218707680e50671a86d549',
      amaount: 7000,
      currency: 'EGP',
      status: 'success',
      createdAt: '23/3/2023',
      method: 'bank_transfer',
      ref: '69gf5hhf5965r69h256969d25hdjd'
    },
    {
      _id: '64218707680e50671a86d548',
      amaount: 5000,
      currency: 'EGP',
      status: 'success',
      createdAt: '23/3/2023',
      method: 'bank_transfer',
      ref: '69gf5hhf5965r69h256969d25hdjd'
    },
    {
      _id: '64218707680e50671a86d547',
      amaount: 40000,
      currency: 'EGP',
      status: 'pending',
      createdAt: '23/3/2023',
      method: 'VC',
      ref: '69gf5hhf5965r69h256969d25hdjd'
    },
    {
      _id: '64218707680e50671a86d546',
      amaount: 30000,
      currency: 'EGP',
      status: 'failed',
      createdAt: '23/3/2023',
      method: 'cash',
      ref: '69gf5hhf5965r69h256969d25hdjd'
    }
  ];

  return (
    <Card>
      <RecentTransactionsTable Transactions={transactionsList} />
    </Card>
  );
}

export default Transactions;
