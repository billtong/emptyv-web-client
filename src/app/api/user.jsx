import axios from 'axios';
import { BASE_URL } from './baseURL';
import { getTokenParamURL } from './apiHelper';

export const getToken = (inputJson) => {
  const deviceListURL = `${BASE_URL}api/user/login`;
  return axios.post(deviceListURL, {
    userName: inputJson.userName,
    userPassword: inputJson.userPassword
  }, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then((res) => (res) 
  , (err) => {
    throw new Error(err.message);
  });
};

export const logout = (inputJson) => {
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
};

export const postRegister = (inputJson) => {
  const deviceListURL = `${BASE_URL}api/user/signUp`;
  return axios.post(deviceListURL, {
    userName: inputJson.userName,
    userPassword: inputJson.userPassword,
    userEmail: inputJson.userEmail
  }, {
    headers:{
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => {
    throw new Error(err.message);
  });
};

//要判断token使用
export const getUserHistory = () => {
  const deviceListURL = `${BASE_URL}api/history/getHistory?${getTokenParamURL()}`;
  return axios.get(deviceListURL, {
    headers: { 
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => {
    throw new Error(err.message);
  });
};

//public use
export const getUserPublic = (inputJson) => {
  const deviceListURL = `${BASE_URL}api/user/getUser?userId=${inputJson.userId}`;
  return axios.get(deviceListURL, {
    headers: { 
      'Content-Type': 'application/json'
    }
  }).then((res) => (res)
  , (err) => {
    throw new Error(err.message);
  });
};
