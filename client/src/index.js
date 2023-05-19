import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import store from './store/store';
import sendAuthToken from './utils/sendAuthToken';
import { login_user } from './store/slice/authSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
const token = localStorage.getItem('LoggedIn_user')
sendAuthToken(token)
if(token) {
  const token_decode = jwtDecode(token)
  store.dispatch(login_user({loggedIn: token_decode}))
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
