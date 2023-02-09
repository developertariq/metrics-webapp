import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

const Continent = (props) => {
  const { continent } = props;
  const {
    name, population, map,
  } = continent;
  return (
    <>
      <div className="right-arrow">
        <HiOutlineArrowCircleRight />
      </div>
      <div className="section">
        <div className="map">
          <img src={map} alt={name} />
        </div>
        <div className="content">
          <h3 style={{ marginBottom: '0' }}>{name}</h3>
          {population}
        </div>
      </div>
    </>
  );
};
Continent.propTypes = {
  continent: PropTypes.shape({
    name: PropTypes.string,
    population: PropTypes.number,
    map: PropTypes.string,
  }),
};

Continent.defaultProps = {
  continent: PropTypes.shape({
    name: '',
    population: 0,
    map: '',
  }),
};

export default Continent;
