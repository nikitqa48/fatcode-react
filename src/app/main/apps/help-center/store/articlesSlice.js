import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../api';

export const getArticles = createAsyncThunk('articles/getArticles', async (categoryId) => {
  const url = categoryId ? `knowledge/article/?category=${categoryId}` : 'knowledge/article/';
  const response = await axios.get(`${BASE_URL}/${url}`);
  const data = await response.data;
  return data.results;
});

// const articlesAdapter = createEntityAdapter({});

// export const { selectAll: selectArticles } = articlesAdapter.getSelectors(
//   (state) => state.helpCenterApp.articles
// );

const initialState = [];

const articlesSlice = createSlice({
  name: 'articles',
  // initialState: articlesAdapter.getInitialState({}),
  initialState,
  reducers: {},
  extraReducers: {
    // [getArticles.fulfilled]: articlesAdapter.setAll,
    [getArticles.fulfilled]: (state, action) => action.payload,
  },
});

export const selectArticles = ({ helpCenterApp }) => helpCenterApp.articles;

export default articlesSlice.reducer;
