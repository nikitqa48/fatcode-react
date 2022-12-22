import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../api';

const initialState = {
  categories: [],
  tags: [],
  error: null,
};

export const getCategories = createAsyncThunk('blog/getCategories', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/knowledge/category/`);
    const data = await response.data;
    return data.results;
  } catch (error) {
    return error.data;
  }
});

export const getTags = createAsyncThunk('blog/getTags', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/knowledge/tag/`);
    const data = await response.data;
    return data.results;
  } catch (error) {
    return error.data;
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [getTags.fulfilled]: (state, action) => {
      state.tags = action.payload;
    },
  },
});

export const selectAllCategories = ({ helpCenterApp }) => helpCenterApp.blog.categories;
export const selectAllTags = ({ helpCenterApp }) => helpCenterApp.blog.tags;
export default blogSlice.reducer;
