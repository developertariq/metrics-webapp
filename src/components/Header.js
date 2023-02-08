import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

const Header = () => (
  <header className="header" data-testid="header">
    <Button>&lt;</Button>
    <h1 className="title">
      Weather App
    </h1>
    <FontAwesomeIcon icon={faCog} size="lg" />
  </header>
);

export default Header;
