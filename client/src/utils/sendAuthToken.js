import axios from 'axios';

const sendAuthToken = (token) => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }
}

export default sendAuthToken;