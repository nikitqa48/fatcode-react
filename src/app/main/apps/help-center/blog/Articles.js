import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple';
import {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useThemeMediaQuery from '../../../../../@fuse/hooks/useThemeMediaQuery';
import ArticleCard from './ArticleCard';
import ArticleSidebarContent from './ArticleSidebarContent';
import { getArticles, selectArticles } from '../store/articlesSlice';

function Articles() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const routeParams = useParams();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const pageLayout = useRef(null);

  useEffect(() => {
    dispatch(getArticles(routeParams.categoryId));
  }, [dispatch, routeParams.categoryId]);

  return (
    <FusePageSimple
      content={
        <div className="flex flex-col items-center px-24 sm:px-40">
          {/*<div className="grid grid-cols md:grid-cols-2 gap-y-32 md:gap-y-0 md:gap-x-24 w-full max-w-sm md:max-w-4xl mt-64 sm:mt-96">*/}
          <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </div>
      }
      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => {
        setLeftSidebarOpen(true);
      }}
      leftSidebarWidth={200}
      leftSidebarContent={<ArticleSidebarContent />}
      scroll="content"
      ref={pageLayout}
    />
  );
}

export default Articles;
