import axios from 'axios';

import { signup_user } from '../slice/authSlice';

export const signupUserAction = (user, redirect) => dispatch => {
  axios.post('http://localhost:9920/api/auth/signup', user).then((res) => {
    console.log(res.data);
    dispatch(signup_user(res.data))
    redirect('/')
  }).catch((err) => {
    console.log(err.response.data);
    dispatch(signup_user(err.response.data))
  })
}