import axios from 'axios';
import { BASE_URL } from './baseURL.jsx';


module.exports = {
  getVideoList: (inputJson) => {
    const deviceListURL = `${BASE_URL}api/video/random?currPage=${inputJson.currPage}`;
    return axios.get(deviceListURL, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      }
    }).then((res) => (res)
    , (err) => (err)
    );
  }
};

