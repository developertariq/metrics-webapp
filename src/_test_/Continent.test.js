import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/configureStore';
import '@testing-library/jest-dom';
import Continent from '../components/Continent';

describe('Continent component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Continent />
        </BrowserRouter>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders the Continent component with default props', () => {
    const { getByAltText, getByText } = render(<Continent />);
    const countryMap = getByAltText('bound checkType');
    const countryName = getByText('bound checkType');
    expect(countryMap).toBeInTheDocument();
    expect(countryName).toBeInTheDocument();
  });

  test('renders the Continent component with non-default props', () => {
    const { getByAltText, getByText } = render(
      <Continent continent={{ name: 'Test Continent', population: '11,000,000', map: 'test-map.png' }} />
    );
    const continentMap = getByAltText('Test Continent');
    const continentName = getByText('Test Continent');
    expect(continentMap).toBeInTheDocument();
    expect(continentName).toBeInTheDocument();
  });
});
