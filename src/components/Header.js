import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { FaChevronLeft } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { BsMicFill } from 'react-icons/bs';
import { updateTitle } from '../Redux/Title/titleReducer';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const title = useSelector((state) => state.title);
  const navigate = useNavigate();

  useEffect(() => {
    let newTitle = '';

    switch (location.pathname) {
      case '/':
        newTitle = 'World Population';
        break;
      case '/continent':
        newTitle = 'Continental View';
        break;
      case '/country':
        newTitle = 'Country/State  Information';
        break;
      default:
        newTitle = 'Page Not Found';
        break;
    }

    dispatch(updateTitle(newTitle));
  }, [location, dispatch]);

  return (
    <header className="header" data-testid="header">
      <div className="header-left">
        <FaChevronLeft className="back-button" onClick={() => navigate(-1)} />
        <h2>2023</h2>
      </div>
      {title.title}
      <div className="header-right">
        <BsMicFill style={{ fontSize: '20px' }} />
        <IoSettingsSharp style={{ fontSize: '20px' }} />
      </div>
    </header>
  );
};

export default Header;
