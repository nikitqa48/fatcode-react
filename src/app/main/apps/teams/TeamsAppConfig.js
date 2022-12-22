import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import TeamsTab from './tabs/teams/TeamsTab';

const TeamsApp = lazy(() => import('./TeamsApp'));
const TeamTab = lazy(() => import('./tabs/team/TeamTab'));
const MyTeam = lazy(() => import('./tabs/team/myTeam'));

const TeamsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'teams',
      element: <TeamsApp />,
      children: [
        {
          path: '',
          element: <Navigate to="/teams/all" />,
        },

        {
          path: 'my',
          element: <MyTeam />,
        },

        {
          path: ':teamId/*',
          element: <TeamTab />,
        },
        {
          path: 'all',
          element: <TeamsTab />,
        },
      ],
    },
  ],
};

export default TeamsAppConfig;
