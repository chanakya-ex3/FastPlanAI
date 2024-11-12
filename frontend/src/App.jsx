import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
import { useEffect } from 'react';
import RoutesComponent from './routes/routesComponent';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  var token = localStorage.getItem('token');
  useEffect(() => {
    fetch(BASE_URL + 'check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json',
        Authorization: token,
      },
    }).then((response) => {
      if (!response.ok) {
        localStorage.removeItem('token');
      }
    });
  }, [token]);
  token = localStorage.getItem('token');
  if (!token) {
    return (
      <div>
        <Router>
          <RoutesComponent isAuthenticated={false} />
        </Router>
      </div>
    );
  }

  return (
    <div className=''>
      <Router>
      <Navbar />
        <RoutesComponent isAuthenticated={true} />
      </Router>
    </div>
  );
};

export default App;
