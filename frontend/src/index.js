import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setAuthToken, preAuth } from './util/session_api_util';
import { logout, admin } from './actions/session_actions';
import configureStore from './store/store'

let store

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedUser = jwt_decode(localStorage.jwtToken);
  
  preAuth().then(data =>{ 
    localStorage.setItem("username", data.data.username)
    store.dispatch(admin(data.data.admin, data.data.username))
  })
  .catch(err => console.log(err))
    const preloadedState = { api: { user: {username: localStorage.getItem("username") }, isAuthenticated: true }, game: {info: {track: localStorage.getItem("track")}} };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
  if (decodedUser.exp < currentTime) {
    store.dispatch(logout());
  }
  
} else {
  store = configureStore({})
}





ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
