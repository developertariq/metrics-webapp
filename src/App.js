import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Continents from './pages/Continents';
// import 'bootstrap/dist/css/bootstrap.min.css';
import store from './Redux/configureStore';
import './App.css';
import Countries from './pages/Countries';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" exact element={<Continents />} />
            <Route index path="/countries" element={<Countries />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
