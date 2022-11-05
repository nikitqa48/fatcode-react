import i18next from 'i18next';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AcademyApp from './AcademyApp';
import en from './i18n/en';
import ru from './i18n/ru';

const Course = lazy(() => import('./course/Course'));
const Courses = lazy(() => import('./courses/Courses'));

i18next.addResourceBundle('en', 'academyApp', en);
i18next.addResourceBundle('ru', 'academyApp', ru);

const AcademyAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/academy',
      element: <AcademyApp />,
      children: [
        {
          path: '',
          element: <Navigate to="/apps/academy/courses" />,
        },
        {
          path: 'courses/:courseId/*',
          element: <Course />,
        },
        {
          path: 'courses',
          element: <Courses />,
        },
      ],
    },
  ],
};

export default AcademyAppConfig;
