import { Suspense, lazy } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Home = Loader(lazy(() => import('src/content/home')));

const EmpHome = Loader(lazy(() => import('src/content/EmpHome')));
// Dashboards

const Overview = Loader(
  lazy(() => import('src/content/applications/Overview'))
);

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Opportunity = Loader(
  lazy(() => import('src/content/applications/Opportunity'))
);
const Transaction = Loader(
  lazy(() => import('src/content/applications/Transaction'))
);
const Academy = Loader(lazy(() => import('src/content/applications/Academy')));
const Emp = Loader(lazy(() => import('src/content/applications/Emp')));

const MapBox = Loader(lazy(() => import('src/content/applications/Map')));
const Mapbox = Loader(lazy(() => import('src/content/applications/Map/Mapbox/MapBox')));

const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);

const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);
const routes = (isLoggedIn) => {
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
          path: 'empHome',
          element: <EmpHome />
        },
        // {
        //   path: 'home',
        //   element: <Navigate to="/" replace />
        // },
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
              path: 'maintenance',
              element: <StatusMaintenance />
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
      element: isLoggedIn ? (
        <SidebarLayout />
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
          path: 'mapbox',
          element: <Mapbox />
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
    }
  ];
};

export default routes;
