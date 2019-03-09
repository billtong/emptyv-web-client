import axios from 'axios';
import { BASE_URL } from './baseURL.jsx';


module.exports = {
  getVideo: (videoId) => {
    const deviceListURL = `${BASE_URL}api/video/getVideo?videoId=${videoId}`;
    return axios.get(deviceListURL, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      }
    }).then((res) => (res)
    , (err) => {
        throw new Error(err.message);
    });
  },

  getVideoList: (inputJson) => {
    const deviceListURL = `${BASE_URL}api/video/getVideoList?currPage=${inputJson.currPage}&filter=${inputJson.filter}&sizes=${inputJson.sizes}&word=`;
    return axios.get(deviceListURL, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      }
    }).then((res) => (res)
    , (err) => (err)
    );
  },

  searchVideoList: (inputJson) => {
    const deviceListURL = `${BASE_URL}api/video/getVideoList?currPage=${inputJson.currPage}&filter=${inputJson.filter}&sizes=${inputJson.filter}&word=${inputJson.word}`;
    return axios.get(deviceListURL, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      }
    }).then((res) => (res)
    , (err) => (err)
    );
  },

  patchView: (videoId) => {
    const deviceListURL = `${BASE_URL}api/video/patchViewNum?videoId=${videoId}`;
    return axios.patch(deviceListURL, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
      }
    }).then((res) => (res)
    , (err) => {
        throw new Error(err.message);
    });
  },

  patchOtherNum: (inputJson) => {
    //这里不可空行，空行会被写入
    const deviceListURL = `${BASE_URL}api/video/patchOtherNum?videoId=${inputJson.videoId}&action=${inputJson.action}&userId=${inputJson.userId}&token=${inputJson.token}&sessionId=${inputJson.sessionId}`;
    return axios.patch(deviceListURL, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => (res)
    , (err) => {
      throw new Error(err.message);
    });
  }
};

