import axios from 'axios';
import { BASE_URL } from './baseURL';
import { getTokenParamURL, getSessionTokenJson } from './apiHelper';

export const getVideo = (videoId) => {
  const deviceListURL = `${BASE_URL}api/video/getVideo?videoId=${videoId}`;
  return axios.get(deviceListURL, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => {
      throw new Error(err.message);
  });
};

export const getVideoList = (inputJson) => {

  const deviceListURL = !inputJson.word ? `${BASE_URL}api/video/getVideoList?filter=${inputJson.filter}&word=` : `${BASE_URL}api/video/getVideoList?filter=${inputJson.filter}&word=${inputJson.word}`;
  return axios.get(deviceListURL, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => (err)
  );
};

export const patchView = (videoId) => {
  const userJson = getSessionTokenJson();
  const deviceListURL = userJson !== null ? `${BASE_URL}api/video/patchViewNum?videoId=${videoId}&userId=${userJson.user.userId}` : `${BASE_URL}api/video/patchViewNum?videoId=${videoId}&userId=`;
  return axios.patch(deviceListURL, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => (err));
};

export const patchOtherNum = (inputJson) => {
  //这里不可空行，空行会被写入
  const deviceListURL = `${BASE_URL}api/video/patchOtherNum?videoId=${inputJson.videoId}&action=${inputJson.action}&${getTokenParamURL()}`;
  return axios.patch(deviceListURL, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => {
    throw new Error(err.message);
  });
};

export const patchTags = (inputJson) => {
  //这里不可空行，空行会被写入
  const deviceListURL = `${BASE_URL}api/video/patchTags?videoId=${inputJson.videoId}&tagJsonString=${inputJson.tagJsonString}&${getTokenParamURL()}`;
  return axios.patch(deviceListURL, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => {
    throw new Error(err.message);
  });
};
