import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  continents: [],
  status: 'idle',
  error: null,
};

const FETCH_URL = 'https://restcountries.com/v3/all';

export const getContinents = createAsyncThunk('weather/continent/FETCH_DATA', async () => {
  const response = await axios.get(FETCH_URL);
  return response.data;
});

const distinctRegions = (data) => {
  const distinctRegions = data.reduce((regions, country) => {
    if (!regions.some((r) => r.text === country.continents[0])) {
      regions.push({
        id: country.continents,
        path: `/${country.continents[0]}`,
        text: country.continents[0],
        region: country.region,
      });
    }
    return regions;
  }, []);
  return distinctRegions;
};

const continentsSlice = createSlice({
  name: 'continents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContinents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getContinents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.continents = distinctRegions(action.payload);
      })
      .addCase(getContinents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default continentsSlice.reducer;
