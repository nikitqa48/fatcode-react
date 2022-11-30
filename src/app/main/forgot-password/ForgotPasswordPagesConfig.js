import { lazy } from 'react';
const ClassicForgotPasswordPage = lazy(() => import('./ClassicForgotPasswordPage'));
import authRoles from '../../auth/authRoles';

const ForgotPasswordPagesConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'forgot-password',
      element: <ClassicForgotPasswordPage />,
    },
  ],
};

export default ForgotPasswordPagesConfig;
