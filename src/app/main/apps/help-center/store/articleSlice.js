import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../api';

const initialState = {};

export const getArticle = createAsyncThunk('article/gatArticle', async (articleId) => {
  const response = await axios.get(`${BASE_URL}/knowledge/article/${articleId}`);
  const data = await response.data;
  return data;
});

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: {
    [getArticle.fulfilled]: (state, action) => action.payload,
  },
});

export const selectArticle = ({ helpCenterApp }) => helpCenterApp.article;

export default articleSlice.reducer;
