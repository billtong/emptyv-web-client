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
  inputJson.word = !inputJson.word ? '' : inputJson.word;
  inputJson.filter = !inputJson.filter ? '' : inputJson.filter;
  inputJson.userId = !inputJson.userId ? -1 : inputJson.userId;
  const getVideoListURL = `${BASE_URL}api/video/getVideoList?filter=${inputJson.filter}&word=${inputJson.word}&userId=${inputJson.userId}`;
  return axios.get(getVideoListURL, {
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
