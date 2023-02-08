import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  countries: [],
  status: 'idle',
  error: null,
};
const FETCH_URL = 'https://restcountries.com/v3.1/';
let filterContinent;
export const getCountries = createAsyncThunk('weather/country/FETCH_DATA', async (region, continent) => {
  const response = await axios.get(`${FETCH_URL}region/${region}`);
  filterContinent = continent;
  console.log(`${FETCH_URL}region/${region}`);
  return response.data;
});

const matchCountries = (data) => {
  const newContries = data.map((country) => ({
    id: country.fifa,
    path: `/${country.name.common}`,
    text: country.name.common,
    area: country.area,
    capital: country.capital,
    population: country.population,
    flag: country.flags,
    map: country.maps,
    region: country.region,
    continent: country.continents[0],
  }));

  return newContries.filter((country) => country.continent === filterContinent);
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = matchCountries(action.payload);
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
