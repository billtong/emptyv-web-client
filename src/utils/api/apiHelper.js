import {getCookie, setCookie} from '../cookieTools';
import zh_CN from "../../assets/languages/zh_CN";

export const userTokenSessionKey = 'empty-video-web-user-session';
export const userTokenCookieKey = 'empty-video-web-user-cookie';

//Update cookie or session userInfo.
export const updateUserInfo = (newUser) => {
	let userJson = JSON.parse(sessionStorage.getItem(userTokenSessionKey));
	const cookie = getCookie(userTokenCookieKey);
	if (userJson !== null) {
		userJson.user = newUser;
		sessionStorage.setItem(userTokenSessionKey, JSON.stringify(userJson));
	}
	else if (cookie && cookie !== '') {
		userJson = JSON.parse(cookie);
		userJson.user = newUser;
		setCookie(userTokenCookieKey, JSON.stringify(userJson));
	}
};

/**
 * return userJson =
 * {
 *  user: res.data
 *  userToken: bearer token
 *  userSessionId: not yet
 * }
 **/
export const getSessionTokenJson = () => {
	let userJson = JSON.parse(sessionStorage.getItem(userTokenSessionKey));
	const cookie = getCookie(userTokenCookieKey);
	if (!userJson && cookie && cookie !== '') {
		userJson = JSON.parse(cookie);
	}
	return !userJson || userJson === null ? null : userJson;
};



//append it to the url for user auth
export const getTokenParamURL = () => {
	let userJson = JSON.parse(sessionStorage.getItem(userTokenSessionKey));
	const cookie = getCookie(userTokenCookieKey);
	if (!userJson && cookie && cookie !== '') {
		userJson = JSON.parse(cookie);
	}
	return (!userJson || !userJson.user || !userJson.userToken || !userJson.userSessionId) ? null : `userId=${userJson.user.userId}&token=${userJson.userToken}&sessionId=${userJson.userSessionId}`;
};
