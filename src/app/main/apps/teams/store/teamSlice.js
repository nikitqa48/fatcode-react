import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../api';

export const getTeamMembers = createAsyncThunk('team/getTeamMembers', async (teamId) => {
  const response = await axios.get(`${BASE_URL}/team/${teamId}/member/`);
  const data = await response.data;
  return data.results;
});

const teamSlice = createSlice({
  name: 'team',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getTeamMembers.fulfilled]: (state, action) => action.payload,
  },
});

export const selectTeamMembers = ({ teamsApp }) => teamsApp.team;

export default teamSlice.reducer;
