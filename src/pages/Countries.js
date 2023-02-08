import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { getCountries } from '../Redux/Country/countriesSlice';

const Countries = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const continent = params.get('continent');
  const region = params.get('region');
  const { countries, status, error } = useSelector((state) => state.countries);
  console.log(continent, region, countries);
  useEffect(() => {
    if (countries.length === 0 || region !== countries[0].region) {
      dispatch(getCountries(region, continent));
    }
  }, [countries, dispatch]);

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
    <div>
      <Navbar>
        <Nav className="navbar">
          {countries.map((link) => (
            <Nav.Link className="nav-item" key={link.id} to={link.path}>{link.text}</Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
};
export default Countries;
