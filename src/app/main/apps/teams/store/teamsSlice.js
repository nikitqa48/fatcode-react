import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from "../../../../../api";

export const getTeams = createAsyncThunk('teamsApp/teams/getTeams', async () => {
  const response = await axios.get(`${BASE_URL}/team/`);
  const data = await response.data;

  return data;
});

const teamsSlice = createSlice({
  name: 'teamsApp/teams',
  initialState: null,
  reducers: {},
  extraReducers: {
    [getTeams.fulfilled]: (state, action) => action.payload,
  },
});

export const selectTeams = ({ teamsApp }) => teamsApp.teams;

export default teamsSlice.reducer;
