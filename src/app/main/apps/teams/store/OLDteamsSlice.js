import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../../../../../api";

export const getTeams = createAsyncThunk('teamsApp/teams/getTeams', async () => {
  console.log("LOH!!!")
  const response = await axios.get(`${BASE_URL}/team/`);
  return response.data.results;
});

const teamsAdapter = createEntityAdapter({});

export const {
  selectAll: selectTeams,
  selectEntities: selectTeamsEntities,
  selectById: selectTeamsById,
} = teamsAdapter.getSelectors((state) => state.teams);

const OLDteamsSlice = createSlice({
  name: 'teamsApp/teams',
  initialState: teamsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getTeams.fulfilled]: teamsAdapter.setAll,
  },
});

export default OLDteamsSlice.reducer;
