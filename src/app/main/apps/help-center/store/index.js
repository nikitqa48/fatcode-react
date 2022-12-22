import { combineReducers } from '@reduxjs/toolkit';
import faqs from './faqsSlice';
import faqsMost from './faqsMostSlice';
import guides from './guidesSlice';
import guide from './guideSlice';
import faqCategories from './faqCategoriesSlice';
import guideCategories from './guideCategoriesSlice';
import blog from './blogSlice';
import articles from './articlesSlice';
import article from './articleSlice';

const reducer = combineReducers({
  guide,
  guides,
  guideCategories,
  faqs,
  faqCategories,
  faqsMost,
  blog,
  articles,
  article,
});

export default reducer;
