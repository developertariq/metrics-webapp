import React from 'react';
import PropTypes from 'prop-types';
import './PageHeader.css';

const PageHeader = (props) => {
  const { map, name, population } = props;
  return (
    <div className="page-header">
      <img src={map} alt={name} className="page-image" />
      <div className="page-title">
        <h2 style={{ marginBottom: '0' }}>
          {name}
        </h2>
        {population}
      </div>
    </div>
  );
};
PageHeader.propTypes = {
  name: PropTypes.string,
  population: PropTypes.number,
  map: PropTypes.string,
};

PageHeader.defaultProps = {
  name: '',
  population: 0,
  map: '',
};

export default PageHeader;
