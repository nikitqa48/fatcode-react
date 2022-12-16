import { lazy } from 'react';

const TeamsApp = lazy(() => import('./TeamsApp'));

const TeamsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'app/teams',
      element: <TeamsApp />,
      // children: [
      //   {
      //     path: 'team/:teamId',
      //     element: <Team />,
      //   },
      // ],
    },
  ],
};

export default TeamsAppConfig;
