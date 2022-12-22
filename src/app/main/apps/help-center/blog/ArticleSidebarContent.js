import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import FuseNavigation from '@fuse/core/FuseNavigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectAllCategories, selectAllTags, getCategories, getTags } from '../store/blogSlice';

function ArticleSidebarContent(props) {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const tags = useSelector(selectAllTags);
  const filters = [
    {
      id: '7c004a19-4506-48ef-93ab-f16381302e3b',
      title: 'Inbox',
    },
  ];

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTags());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
      className="flex-auto border-l-1"
    >
      <div className="mb-24 mt-40 mx-24">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-4xl font-extrabold tracking-tight leading-none"
        >
          <a href="/apps/help-center/articles">Блог</a>
        </Typography>
      </div>

      <div className="mb-24">
        <Typography className="px-28 py-10 uppercase text-12 font-600" color="secondary.main">
          Категории
        </Typography>

        <FuseNavigation
          navigation={categories.map((item) => ({
            id: String(item.id),
            title: item.name,
            type: 'item',
            url: `category/${item.id}`,
          }))}
        />
      </div>

      <div className="mb-24">
        <Typography className="px-28 py-10 uppercase text-12 font-600" color="secondary.main">
          Фильтр
        </Typography>

        <FuseNavigation
          navigation={filters.map((item) => ({
            ...item,
            type: 'item',
            url: `item.id`,
          }))}
        />
      </div>

      <div className="mb-24">
        <Typography className="px-28 py-10 uppercase text-12 font-600" color="secondary.main">
          Теги
        </Typography>

        <FuseNavigation
          navigation={tags.map((item) => ({
            id: String(item.id),
            title: item.name,
            type: 'item',
            url: `tags/${item.id}`,
          }))}
        />
      </div>
    </motion.div>
  );
}

export default ArticleSidebarContent;
