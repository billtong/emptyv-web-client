import axios from 'axios';
import { BASE_URL } from './baseURL.jsx';


module.exports = {
  logout: (inputJson) => {
    const userLogoutUrl = `${BASE_URL}api/user/logout`;
    return axios.post(userLogoutUrl, {
      sessionId: inputJson.sessionId,
      userName: inputJson.userName,
      token: inputJson.token
    }, {
      headers: {
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
