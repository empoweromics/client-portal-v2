import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import './App.css';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  const content = useRoutes(
    router(localStorage.getItem('user'), localStorage.getItem('admin'))
  );
  return (
    <ThemeProvider>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
}
export default App;
