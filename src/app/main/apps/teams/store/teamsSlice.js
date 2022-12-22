import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../../../api';

const initialState = [];

export const getTeams = createAsyncThunk('teams/getTeams', async () => {
  const response = await axios.get(`${BASE_URL}/team/`);
  const data = await response.data;
  return data.results;
});

export const getMyTeams = createAsyncThunk('teams/getMyTeams', async () => {
  const response = await axios.get(`${BASE_URL}/team/my_team/`);
  const data = await response.data;
  return data.results;
});

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: {
    [getTeams.fulfilled]: (state, action) => action.payload,
    [getMyTeams.fulfilled]: (state, action) => action.payload,
  },
});

export const selectTeams = ({ teamsApp }) => teamsApp.teams;
export const selectMyTeams = ({ teamsApp }) => teamsApp.teams;
export default teamsSlice.reducer;
