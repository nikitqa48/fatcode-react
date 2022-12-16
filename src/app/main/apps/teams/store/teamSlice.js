import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../../../../../api";

export const getTeam = createAsyncThunk('teamsApp/teams/getTeam', async () => {
  const response = await axios.get(`${BASE_URL}/team/`);
  const data = await response.data;

  return data;
});

const teamSlice = createSlice({
  name: 'teamsApp/teams',
  initialState: null,
  reducers: {},
  extraReducers: {
    [getTeam.fulfilled]: (state, action) => action.payload,
  },
});

export const selectTeam = ({ teamsApp }) => teamsApp.team;

export default teamSlice.reducer;
