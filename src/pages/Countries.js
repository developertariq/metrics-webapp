import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { getCountries } from '../Redux/Country/countriesSlice';
import Country from '../components/Country';
import PageHeader from '../components/PageHeader';

const Countries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const continent = JSON.parse(searchParams.get('continent') || '{}');

  const {
    region, map, population, name, noOfCountries,
  } = continent;
  const { countries, status, error } = useSelector((state) => state.countries);

  useEffect(() => {
    if (
      countries.length === 0
      || region !== countries[0].region
      || name !== countries[0].continent
    ) {
      dispatch(getCountries({ region, name }));
    }
  }, [countries, dispatch]);

  const handleCountryClick = (country) => {
    navigate(`/country?country=${JSON.stringify(country)}`);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <div className="main-container">
      <PageHeader
        map={map}
        name={name}
        population={population}
      />
      <div className="section-title">
        <h4>
          { noOfCountries }
          {' '}
          Countries in
          {' '}
          { name }
        </h4>
      </div>
      <Navbar>
        <Nav className="navbar">
          {countries.map((country) => (
            <Nav.Link
              className="nav-item"
              key={country.id}
              to={country.path}
              onClick={() => { handleCountryClick(country); }}
            >
              <Country country={country} />
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
};
export default Countries;
