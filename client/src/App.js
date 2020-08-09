import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';

// pages
import Login from './pages/Login/Login';
import Browse from './pages/Browse/Browse';

function App() {
  const location = useLocation();
  const history = useHistory();

  // to check if token exist or not and send to the correct page
  useEffect(() => {
    // if on not login page and no token
    if (
      location.pathname !== '/login' &&
      !JSON.parse(localStorage.getItem('token'))
    ) {
      localStorage.remove('token');
      history.push('/login');
    }

    // if on login page and has token
    else if (
      location.pathname === '/login' &&
      JSON.parse(localStorage.getItem('token'))
    ) {
      history.push('/browse');
    }
  }, [location, history]);

  // check if the auth token is valid
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem('token')) &&
      location.pathname !== '/login'
    ) {
      const res = fetch('http://localhost:5000/api/', {
        headers: { authorization: JSON.parse(localStorage.getItem('token')) },
      });
      // if a error
      if (res.status !== 200) {
        localStorage.remove('token');
        history.push('/login');
      }
    }
  }, [location, history]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        margin: '0',
        padding: '0',
      }}>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/browse">
          <Browse />
        </Route>
        <Redirect to="/login"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
