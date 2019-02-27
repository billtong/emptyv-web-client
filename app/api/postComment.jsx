import axios from 'axios';
import { BASE_URL } from './baseURL.jsx';


module.exports = {
  postComment: (inputJson, userToken, sessionId) => {
    //这里不可空行，空行会被写入
    const deviceListURL = `${BASE_URL}api/comment/write?userId=${inputJson.userId}&token=${userToken}&sessionId=${sessionId}`;
    return axios.post(deviceListURL, {
      commentContent: inputJson.commentContent,
      videoId: inputJson.videoId,
      userId: inputJson.userId
    }, {
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((res) => (res)
    , (err) => {
      throw new Error(err.message);
    });
  }
};
