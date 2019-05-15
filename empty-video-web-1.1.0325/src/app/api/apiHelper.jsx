//返回jsonconst 
//userJson = {
//  user: res.data.user,
//  userToken: res.data.token,
//  userSessionId: res.data.sessionId
//};
export const getSessionTokenJson = () => {
  const userJson = JSON.parse(sessionStorage.getItem('empty-video-web-user-session'));
  return userJson === undefined ? null : userJson; 
};

//将它加在url的最后就能完成用户身份检验了
export const getTokenParamURL = () => {
  const userJson = JSON.parse(sessionStorage.getItem('empty-video-web-user-session'));
  return (!userJson || !userJson.user || !userJson.userToken || !userJson.userSessionId) ? null : `userId=${userJson.user.userId}&token=${userJson.userToken}&sessionId=${userJson.userSessionId}`;
};
