import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { getContinents } from '../Redux/Continent/continentsSlice';
import Continent from '../components/Continent';
import PageHeader from '../components/PageHeader';
import world from '../images/world.svg';

const Continents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { continents, status, error } = useSelector((state) => state.continents);

  useEffect(() => {
    if (continents.length === 0) {
      dispatch(getContinents());
    }
  }, [continents, dispatch]);

  const handleContinentClick = (continent) => {
    navigate(`/continent?continent=${JSON.stringify(continent)}`);
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
  const sum = continents.reduce((acc, obj) => acc + obj.population, 0);

  return (
    <div className="main-container">
      <PageHeader
        map={world}
        name="World"
        population={sum}
      />
      <div className="section-title"><h4>Continent</h4></div>
      <Navbar>
        <Nav className="navbar">
          {continents.map((continent) => (
            <Nav.Link
              className="nav-item"
              key={continent.id}
              to={continent.path}
              onClick={() => {
                handleContinentClick(continent);
              }}
            >
              <Continent continent={continent} />
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
    </div>
  );
};
export default Continents;
