import { Navigate } from 'react-router-dom';
import HelpCenterHome from './home/HelpCenterHome';
import HelpCenterFaqs from './faqs/HelpCenterFaqs';
import HelpCenterGuides from './guides/HelpCenterGuides';
import HelpCenterSupport from './support/HelpCenterSupport';
import HelpCenterApp from './HelpCenterApp';
import GuideCategory from './guides/GuideCategory';
import GuideCategories from './guides/GuideCategories';
import HelpCenterGuide from './guide/HelpCenterGuide';
import Articles from './blog/Articles';
import Article from './blog/Article';

const HelpCenterAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/help-center',
      element: <HelpCenterApp />,
      children: [
        {
          path: '',
          element: <HelpCenterHome />,
        },
        {
          path: 'faqs',
          element: <HelpCenterFaqs />,
        },
        {
          path: 'guides',
          element: <HelpCenterGuides />,
          children: [
            {
              path: '',
              element: <GuideCategories />,
            },
            {
              path: ':categorySlug',
              element: <GuideCategory />,
            },
            {
              path: ':categorySlug/:guideSlug',
              element: <HelpCenterGuide />,
            },
          ],
        },
        {
          path: 'articles',
          element: <Articles />,
          children: [
            {
              path: '',
              element: <Navigate to="/apps/help-center/articles" />,
            },
            // {
            //   path: ':articleId',
            //   element: <Article />,
            // },
            {
              path: 'category/:categoryId',
              element: <Articles />,
            },
            {
              path: 'tag/:tagId',
              element: <Articles />,
            },
            {
              path: 'articles',
              element: <Articles />,
            },
          ],
        },
        {
          path: 'article/:articleId',
          element: <Article />,
        },
        {
          path: 'support',
          element: <HelpCenterSupport />,
        },
      ],
    },
  ],
};

export default HelpCenterAppConfig;
