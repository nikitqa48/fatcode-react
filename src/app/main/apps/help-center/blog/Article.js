import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { getArticle, selectArticle } from '../store/articleSlice';
import ArticleSidebarContent from './ArticleSidebarContent';

function Article() {
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const theme = useTheme();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
  const routeParams = useParams();
  const pageLayout = useRef(null);

  useEffect(() => {
    dispatch(getArticle(routeParams.articleId));
  }, [dispatch, routeParams]);

  // useEffect(() => {
  //   setLeftSidebarOpen(!isMobile);
  // }, [isMobile]);

  return (
    <FusePageSimple
      content={
        <div className="flex flex-col items-center p-24 sm:p-40 container">
          <div className="flex flex-col w-full max-w-4xl">
            <div className="sm:mt-32">
              <Button
                component={Link}
                to={-1}
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>}
              >
                Вернуться в блог
              </Button>
            </div>

            <Typography className="mt-8 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight">
              {article.title}
            </Typography>

            <div className="flex items-center mt-8 sm:mt-0">
              <div className="font-medium mx-8" color="text.secondary">
                <Avatar alt={article.author?.username} src={article.author?.avatar} />
                {article.author?.username}
              </div>
            </div>

            <div
              className="mt-32 sm:mt-48 max-w-none prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.text }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-40 pt-32 border-t">
              <Typography className="text-sm font-medium" color="text.secondary">
                {article.date_update}
              </Typography>
              <div className="flex items-center mt-8 sm:mt-0">
                <Typography className="font-medium mx-8" color="text.secondary">
                  Просмотров {article.view_count}
                </Typography>
                <Typography className="font-medium mx-8" color="text.secondary">
                  Статья была полезна?
                </Typography>
                <IconButton>
                  <FuseSvgIcon>heroicons-outline:thumb-up</FuseSvgIcon>
                </IconButton>
                <IconButton>
                  <FuseSvgIcon>heroicons-outline:thumb-down</FuseSvgIcon>
                </IconButton>
              </div>
            </div>

            <Card className="mt-32 flex items-center justify-between p-24 sm:px-40 rounded-2xl shadow hover:shadow-lg transition-shadow ease-in-out duration-150">
              <div>
                <Typography color="text.secondary">Next</Typography>
                <Typography className="text-lg font-semibold">
                  Removing a media from a project
                </Typography>
              </div>
              <FuseSvgIcon className="ml-12">heroicons-outline:arrow-right</FuseSvgIcon>
            </Card>
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

export default Article;
