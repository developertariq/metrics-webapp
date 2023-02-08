import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { getContinents } from '../Redux/Continent/continentsSlice';
import logo from '../images/weather-icon-png-11063.png';

const Continents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { continents, status, error } = useSelector((state) => state.continents);
  useEffect(() => {
    if (continents.length === 0) {
      dispatch(getContinents());
    }
  }, [continents, dispatch]);

  const handleContinentClick = (region, continent) => {
    document.write(region, continent);
    navigate(`/countries?continent=${continent}&region=${region}`);
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
    <div>
      <div>
        <img src={logo} alt="Earth logo" className="App-logo" />
      </div>
      <Navbar>
        <Nav className="navbar">
          {continents.map((link) => (
            <Nav.Link className="nav-item" key={link.id} to={link.path} onClick={() => handleContinentClick(`${link.region}, ${link.text}`)}>{link.text}</Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
};
export default Continents;
