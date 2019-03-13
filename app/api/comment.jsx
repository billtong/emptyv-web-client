import axios from 'axios';
import { BASE_URL } from './baseURL.jsx';
import { getTokenParamURL } from './apiHelper';


module.exports = {
  getComemtList: (inputJson) => {
    const deviceListURL = `${BASE_URL}api/comment/load?videoId=${inputJson.videoId}`;
    return axios.get(deviceListURL, {
      headers: { 
        'Content-Type': 'application/json'
      }
    }).then((res) => (res)
    , (err) => {
      throw new Error(err.message);
    });
  },

  postComment: (inputJson) => {
    const deviceListURL = `${BASE_URL}api/comment/write?${getTokenParamURL()}`;
    return axios.post(deviceListURL, {
      commentContent: inputJson.commentContent,
      videoId: inputJson.videoId,
      userId: inputJson.userId
    }, {
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res) => (res)
    , (err) => (err));
  }
};

