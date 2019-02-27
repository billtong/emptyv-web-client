import axios from 'axios';
import { BASE_URL } from './baseURL.jsx';


module.exports = {
  getToken: (inputJson) => {
    const deviceListURL = `${BASE_URL}api/user/login`;
    return axios.post(deviceListURL, {
      userName: inputJson.userName,
      userPassword: inputJson.userPassword
    }, {
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      }
    })
    .then((res) => (res) 
    , (err) => {
      throw new Error(err.message);
    });
  }
};
