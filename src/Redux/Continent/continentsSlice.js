import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const CONTINENT_URL = 'https://restcountries.com/v3.1/all';
const continentalMap = {
  Africa: 'https://svgsilh.com/svg/28615.svg',
  'North America': 'https://svgsilh.com/svg/307195.svg',
  'South America': 'https://svgsilh.com/svg/311014.svg',
  Asia: 'https://svgsilh.com/svg/151642.svg',
  Europe: 'https://svgsilh.com/svg/151588.svg',
  Oceania: 'https://svgsilh.com/svg/151644.svg',
};

const initialState = {
  continents: [],
  status: 'idle',
  error: null,
};

export const getContinents = createAsyncThunk('weather/continent/FETCH_DATA', async () => {
  const response = await axios.get(CONTINENT_URL);
  return response.data;
});

const continentalInformation = (data) => {
  const totalPopulationByContinent = {};
  const totalCountriesByContinent = {};

  const distinctRegions = data.reduce((regions, country) => {
    if (!country.independent) {
      return regions;
    }
    const continent = country.continents[0];
    totalPopulationByContinent[continent] = (totalPopulationByContinent[continent] || 0)
      + country.population;
    totalCountriesByContinent[continent] = (totalCountriesByContinent[continent] || 0) + 1;

    if (!regions.some((r) => r.region === country.region)) {
      regions.push({
        id: continent,
        path: `/${continent}`,
        name: continent,
        region: country.region,
      });
    }
    return regions;
  }, []);

  const combined = distinctRegions.map((continent) => ({
    ...continent,
    population: totalPopulationByContinent[continent.name],
    noOfCountries: totalCountriesByContinent[continent.name],
    map: continentalMap[continent.name],
  }));
  return combined.sort((a, b) => a.name.localeCompare(b.name));
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
        state.continents = continentalInformation(action.payload);
      })
      .addCase(getContinents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default continentsSlice.reducer;
