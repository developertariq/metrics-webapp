import React from 'react';
import { useLocation } from 'react-router-dom';
import './CountryDetails.css';
import PageHeader from '../components/PageHeader';

const CountryDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const country = JSON.parse(searchParams.get('country') || '{}');

  const {
    name, population, area, official, capital, lat, lng, flag,
  } = country;

  return (
    <div className="main-container">
      <PageHeader
        map={country.map}
        name={country.name}
        population={country.population}
      />
      <div className="section-title">
        <h4>
          {name}
        </h4>
        <img src={flag} alt="" />
      </div>
      <div className="main-container">
        <div className="item">
          <span>Official Name</span>
          <span>{official}</span>
        </div>
        <div className="item">
          Capital
          <span>{capital}</span>
        </div>
        <div className="item">
          Population
          <span>
            {population}
          </span>
        </div>
        <div className="item">
          Area
          <span>
            {area}
            {' '}
            sq. km
          </span>
        </div>
        <div className="item">
          Latitude
          <span>{lat}</span>
          Longitude
          <span>{lng}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
