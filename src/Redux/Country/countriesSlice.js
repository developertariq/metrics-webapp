import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const COUNTRY_URL = 'https://restcountries.com/v3.1/region/';
// const MAP_URL = 'https://raw.githubusercontent.com/djaiss/mapsicon/33ba28808f8d32b5bae0ffada9cadd07073852e1/all/';
const COUNTRY_MAP_URL = 'https://raw.githubusercontent.com/djaiss/mapsicon/master/all/';
const initialState = {
  countries: [],
  status: 'idle',
  error: null,
};

export const getCountries = createAsyncThunk('weather/country/FETCH_DATA', async (obj) => {
  const { region, name } = obj;
  const response = await axios.get(`${COUNTRY_URL}${region}`);

  return response.data.filter((country) => country.continents[0] === name);
});

const countryInformation = (data) => {
  const newContries = data.filter((country) => country.independent)
    .map((country) => ({
      id: country.cca3,
      path: `/${country.name.common}`,
      name: country.name.common,
      official: country.name.official,
      area: country.area,
      capital: country.capital,
      population: country.population,
      flag: country.flags.png,
      map: `${COUNTRY_MAP_URL}${country.cca2.toLowerCase()}/vector.svg`,
      region: country.region,
      subregion: country.subregion,
      continent: country.continents[0],
      currencies: country.currencies,
      latlng: country.latlng,
      languages: country.languages,
    }));

  return newContries.sort((a, b) => a.name.localeCompare(b.name));
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
        state.countries = countryInformation(action.payload);
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default countriesSlice.reducer;
