import { useTheme } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple';
import { useState } from 'react';
import useThemeMediaQuery from '../../../../../@fuse/hooks/useThemeMediaQuery';
import ArticleCard from './ArticleCard';
import ArticleSidebarContent from './ArticleSidebarContent';

function Articles() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const theme = useTheme();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);

  return (
    <FusePageSimple
      content={
        <div className="flex flex-col items-center px-24 sm:px-40">
          <div className="grid grid-cols md:grid-cols-4 gap-y-32 md:gap-y-0 md:gap-x-24 w-full max-w-sm md:max-w-4xl mt-64 sm:mt-96">
            <ArticleCard />
          </div>
        </div>
      }
      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => {
        setLeftSidebarOpen(false);
      }}
      leftSidebarWidth={300}
      leftSidebarContent={<ArticleSidebarContent />}
    />
  );
}

export default Articles;
