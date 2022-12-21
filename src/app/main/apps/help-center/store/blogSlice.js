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

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const selectAllCategories = ({ helpCenterApp }) => helpCenterApp.blog.categories;

export default blogSlice.reducer;
