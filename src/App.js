import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import './App.css';
import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  const content = useRoutes(
    router(localStorage.getItem('user'), localStorage.getItem('admin'))
  );
  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
