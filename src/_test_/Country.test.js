import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/configureStore';
import '@testing-library/jest-dom';
import Country from '../components/Country';

describe('Country component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Country />
        </BrowserRouter>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders the Country component with default props', () => {
    const { getByAltText, getByText } = render(<Country />);
    const countryMap = getByAltText('bound checkType');
    const countryName = getByText('bound checkType');
    expect(countryMap).toBeInTheDocument();
    expect(countryName).toBeInTheDocument();
  });

  test('renders the Country component with non-default props', () => {
    const { getByAltText, getByText } = render(
      <Country country={{ name: 'Test Country', population: '1,000,000', map: 'test-map.png' }} />,
    );
    const countryMap = getByAltText('Test Country');
    const countryName = getByText('Test Country');
    expect(countryMap).toBeInTheDocument();
    expect(countryName).toBeInTheDocument();
  });
});
