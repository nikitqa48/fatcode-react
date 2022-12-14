import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../../../../../api";

export const getCourses = createAsyncThunk('academyApp/courses/getCourses', async () => {
  const response = await axios.get(`${BASE_URL}/courses/`);

  const data = await response.data.results;

  return data;
});

const coursesAdapter = createEntityAdapter({});

export const { selectAll: selectCourses, selectById: selectCourseById } =
  coursesAdapter.getSelectors((state) => state.academyApp.courses);

const coursesSlice = createSlice({
  name: 'academyApp/courses',
  initialState: coursesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getCourses.fulfilled]: coursesAdapter.setAll,
  },
});

export default coursesSlice.reducer;
