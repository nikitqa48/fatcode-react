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
      //     path: ':id',
      //     element: <TaskForm />,
      //   },
      //   {
      //     path: ':id/:type',
      //     element: <TaskForm />,
      //   },
      // ],
    },
  ],
};

export default TeamsAppConfig;
