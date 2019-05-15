import { getCookie, setCookie } from '../utils/cookieTools';

export const userTokenSessionKey = 'empty-video-web-user-session';
export const userTokenCookieKey = 'empty-video-web-user-cookie';

//登入状态下，更新cookie或session的用户信息
export const updateUserInfo = (newUser) => {
  let userJson = JSON.parse(sessionStorage.getItem(userTokenSessionKey));
  const cookie = getCookie(userTokenCookieKey);
  if(userJson !== null) {
    userJson.user = newUser;
    sessionStorage.setItem(userTokenSessionKey, JSON.stringify(userJson));
  } 
  else if ((!userJson || userJson === null) && cookie && cookie !== null && cookie !== '')  {
    userJson = JSON.parse(cookie);
    userJson.user = newUser;
    setCookie(userTokenCookieKey, JSON.stringify(userJson));
  }
};

/**
 * 返回的userJson = 
 * {
 *  user: res.data.user,
 *  userToken: res.data.token,
 *  userSessionId: res.data.sessionId
 * }
 **/
export const getSessionTokenJson = () => {
  let userJson = JSON.parse(sessionStorage.getItem(userTokenSessionKey));
  const cookie = getCookie(userTokenCookieKey);
  if ((!userJson || userJson === null) && cookie && cookie !== null && cookie !== '')  {
    userJson = JSON.parse(cookie);
  }
  return !userJson || userJson === null ? null : userJson; 
};

//将它加在url的最后就能完成用户身份检验了
export const getTokenParamURL = () => {
  let userJson = JSON.parse(sessionStorage.getItem(userTokenSessionKey));
  const cookie = getCookie(userTokenCookieKey);
  if ((!userJson || userJson === null) && cookie && cookie !== null && cookie !== '')  {
    userJson = JSON.parse(cookie);
  }
  return (!userJson || !userJson.user || !userJson.userToken || !userJson.userSessionId) ? null : `userId=${userJson.user.userId}&token=${userJson.userToken}&sessionId=${userJson.userSessionId}`;
};
