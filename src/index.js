import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { UserContextProvider } from './contexts/UserContext';
import './utilities/firebase/firebaseConfig';

ReactDOM.render(
  <HelmetProvider>
    <UserContextProvider>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </UserContextProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
