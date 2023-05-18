import axios from 'axios';
import jwtDeCode from 'jwt-decode';

import { signup_user, login_user } from '../slice/authSlice';

export const signupUserAction = (user, redirect) => dispatch => {
  axios.post('http://localhost:9920/api/auth/signup', user).then((res) => {
    dispatch(signup_user(res.data))
  }).catch((err) => {
    console.log(err.response.data);
    dispatch(signup_user(err.response.data))
  })
}

export const loginUserAction = (user, redirect) => dispatch => {
  axios.post('http://localhost:9920/api/auth/login', user).then((res) => {
    const token = res.data.token;
    localStorage.setItem('LoggedIn_user', token)
    const decode = jwtDeCode(token)
    dispatch(login_user({loggedIn: decode}))
    redirect('/signup')
  }).catch(err => {
    console.log(err.response.data);
    dispatch(login_user(err.response.data))
  })
}
