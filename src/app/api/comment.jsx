import axios from 'axios';
import { BASE_URL } from './baseURL';
import { getTokenParamURL } from './apiHelper';


export const getComemtList = (inputJson) => {
  const deviceListURL = `${BASE_URL}api/comment/load?videoId=${inputJson.videoId}`;
  return axios.get(deviceListURL, {
    headers: { 
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => {
    throw new Error(err.message);
  });
};

export const postComment = (inputJson) => {
  const deviceListURL = `${BASE_URL}api/comment/write?${getTokenParamURL()}`;
  return axios.post(deviceListURL, {
    commentContent: inputJson.commentContent,
    videoId: inputJson.videoId,
    userId: inputJson.userId,
    commentParentId: inputJson.commentParentId
  }, {
    headers:{
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => (err));
};

export const postCommentA = (inputJson) => {
  const deviceListURL = `${BASE_URL}api/comment/writeA`;
  return axios.post(deviceListURL, {
    commentContent: inputJson.commentContent,
    commentParentId: inputJson.commentParentId
  }, {
    headers:{
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => (err));
};

