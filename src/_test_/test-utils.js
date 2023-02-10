import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit'; 
import { Provider } from 'react-redux';
import countriesSlice from '../Redux/Country/countriesSlice';
import continentsSlice from '../Redux/Continent/continentsSlice';
import titleReducer from '../Redux/Title/titleReducer';
import { Router } from 'react-router';

function reducer(ui, {
  preloadedState,
  store = configureStore({ reducer: { continents: continentsSlice,
    countries: countriesSlice,
    title: titleReducer, },
  preloadedState }),
  ...renderOptions
}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { reducer }
