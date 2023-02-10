import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Continents from './pages/Continents';
import store from './Redux/configureStore';
import './App.css';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" exact element={<Continents />} />
            <Route index path="/continent" element={<Countries />} />
            <Route index path="/country" element={<CountryDetails />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
