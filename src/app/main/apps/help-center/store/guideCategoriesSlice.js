import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import api from 'src/app/api/fatcode'
import _ from '@lodash';

export const getGuideCategories = createAsyncThunk(
  'helpCenterApp/guideCategories/get',
  async () => {
    const response = await api.get('api/v1/knowledge/category/');
    const data = await response.data;
    return data.results;
  }
);

const guideCategoriesAdapter = createEntityAdapter({});

export const { selectAll: selectGuideCategories, selectById: selectGuideCategorieseById } =
  guideCategoriesAdapter.getSelectors((state) => state.helpCenterApp.guideCategories);

const guideCategoriesSlice = createSlice({
  name: 'helpCenterApp/guideCategories',
  initialState: guideCategoriesAdapter.getInitialState(),
  extraReducers: {
    [getGuideCategories.fulfilled]: guideCategoriesAdapter.setAll,
  },
});

export const selectGuideCategorieseBySlug = (slug) =>
  createSelector([selectGuideCategories], (categories) => {
    return _.find(categories, { slug });
  });

export default guideCategoriesSlice.reducer;
