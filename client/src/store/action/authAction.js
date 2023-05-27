import axios from 'axios';
import jwtDeCode from 'jwt-decode';

import { signup_user, login_user, clear_authstate, logout_user } from '../slice/authSlice';
import sendAuthToken from '../../utils/sendAuthToken';

export const signupUserAction = (user, redirect) => dispatch => { 
  axios.post('http://localhost:9920/api/auth/signup', user).then((res) => {
    dispatch(signup_user(res.data))
    redirect('/login')
  }).catch((err) => {
    console.log(err.response.data);
    dispatch(signup_user(err.response.data))
  })
}

export const loginUserAction = (user, redirect) => dispatch => {
  axios.post('http://localhost:9920/api/auth/login', user).then((res) => {
    const token = res.data.token;
    localStorage.setItem('LoggedIn_user', token)
    sendAuthToken(token)
    const decode = jwtDeCode(token)
    dispatch(login_user({loggedIn: decode}))
    redirect('/publisher')
  }).catch(err => {
    console.log(err.response.data);
    dispatch(login_user(err.response.data))
  })
}

export const logoutUserAction = (redirect) => dispatch => {
  localStorage.removeItem('LoggedIn_user')
  dispatch(logout_user())
  redirect('/login')
}

export const clearAuthStateAction = () => dispatch => {
  dispatch(clear_authstate());
};
