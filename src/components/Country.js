import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineArrowCircleRight } from 'react-icons/hi';

const Country = (props) => {
  const { country } = props;
  const {
    name, population, map,
  } = country;
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
          <h4 style={
            {
              marginBottom: '0',
            }
          }
          >
            {name}
          </h4>
          {population}
        </div>
      </div>
    </>
  );
};
Country.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string,
    population: PropTypes.string,
    map: PropTypes.string,
  }),
};

Country.defaultProps = {
  country: PropTypes.shape({
    name: '',
    population: '',
    map: '',
  }),
};

export default Country;
