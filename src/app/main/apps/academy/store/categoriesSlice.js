import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from "../../../../../api";

export const getCategories = createAsyncThunk('academyApp/categories/getCategories', async () => {
  const response = await axios.get(`${BASE_URL}/courses/tags/`);
  const data = await response.data;
  return data.results;
});

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  categoriesAdapter.getSelectors((state) => state.academyApp.categories);

const categorySlice = createSlice({
  name: 'academyApp/categories',
  initialState: categoriesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: categoriesAdapter.setAll,
  },
});

export default categorySlice.reducer;
