import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/configureStore';
import '@testing-library/jest-dom';
import PageHeader from '../components/PageHeader';

describe('PageHeader component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <PageHeader />
        </BrowserRouter>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders the PageHeader component with non-default props', () => {
    const { getByAltText, getByText } = render(
      <PageHeader name="Test City" population={100000} map="test-map.png" />,
    );
    const pageImage = getByAltText('Test City');
    const pageTitle = getByText('Test City');
    expect(pageImage).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('renders the correct population in the PageHeader component', () => {
    const { getByText } = render(
      <PageHeader name="Test City" population={100000} map="test-map.png" />,
    );
    const population = getByText('100000');
    expect(population).toBeInTheDocument();
  });
});
