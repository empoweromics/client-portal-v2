import { Suspense, lazy } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import AdminLayout from './layouts/AdminLayout';
import ClientLayout from 'src/layouts/ClientLayout';
import AdminAuthLogin from './pages/admin/login/AdminAuthLogin';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Public Pages
const Home = Loader(lazy(() => import('src/pages/client/home')));
const EmpHome = Loader(lazy(() => import('src/pages/client/EmpHome')));
// Admin Dashboards Pages
const AdminDashboard = Loader(lazy(() => import('src/pages/admin/dashboard')));
const AdminOpportunity = Loader(
  lazy(() => import('src/pages/admin/opportunities/index'))
);

// Client Applications Pages
const Overview = Loader(
  lazy(() => import('src/pages/client/applications/Overview'))
);
const Messenger = Loader(
  lazy(() => import('src/pages/client/applications/Messenger'))
);
const Opportunity = Loader(
  lazy(() => import('src/pages/client/applications/Opportunity'))
);
const Transaction = Loader(
  lazy(() => import('src/pages/client/applications/Transaction'))
);
const Academy = Loader(
  lazy(() => import('src/pages/client/applications/Academy'))
);
const Emp = Loader(lazy(() => import('src/pages/client/applications/Emp')));

const MapBox = Loader(lazy(() => import('src/pages/client/applications/Map')));

const UserSettings = Loader(
  lazy(() => import('src/pages/client/applications/Users/settings'))
);

// Status

const Status404 = Loader(lazy(() => import('src/components/Status/Status404')));
const Status403 = Loader(lazy(() => import('src/components/Status/Status403')));
const Status500 = Loader(lazy(() => import('src/components/Status/Status500')));

const routes = (client, admin) => {
  const location = useLocation();

  return [
    {
      path: '',
      element: <BaseLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <AdminAuthLogin />
        },
        {
          path: 'emp/:id',
          element: <EmpHome />
        },
        {
          path: 'status',
          children: [
            {
              path: '',
              element: <Navigate to="404" replace />
            },
            {
              path: '404',
              element: <Status404 />
            },
            {
              path: '500',
              element: <Status500 />
            },
            {
              path: '403',
              element: <Status403 />
            }
          ]
        },
        {
          path: '*',
          element: <Status404 />
        }
      ]
    },

    {
      path: 'go',
      element: client ? (
        <ClientLayout />
      ) : (
        <Navigate to="/" state={{ from: location }} />
      ),
      children: [
        {
          path: '',
          element: <Overview />
        },
        {
          path: 'academy',
          element: <Academy />
        },
        {
          path: 'eMP',
          element: <Emp />
        },
        {
          path: 'opportunity',
          element: <Opportunity />
        },
        {
          path: 'transaction',
          element: <Transaction />
        },
        {
          path: 'map',
          element: <MapBox />
        },

        {
          path: 'profile',
          children: [
            {
              path: '',
              element: <Navigate to="details" replace />
            },

            {
              path: 'settings',
              element: <UserSettings />
            },
            {
              path: 'messenger',
              element: <Messenger />
            }
          ]
        }
      ]
    },

    {
      path: 'admin',
      element: admin ? (
        <AdminLayout />
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      ),
      children: [
        {
          path: '',
          element: <AdminDashboard />
        },
        {
          path: '/admin/opportunities',
          element: <AdminOpportunity />
        }
      ]
    }
  ];
};

export default routes;
