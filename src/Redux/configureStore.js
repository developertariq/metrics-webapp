import { combineReducers, configureStore } from '@reduxjs/toolkit';
import continentsSlice from './Continent/continentsSlice';
import countriesSlice from './Country/countriesSlice';

const reducer = combineReducers({
  continents: continentsSlice,
  countries: countriesSlice,
});

const store = configureStore({
  reducer,
});

export default store;
