import axios from 'axios';
import {BASE_URL} from './baseURL';
import {getTokenParamURL} from './apiHelper';

//用户登陆获取token，sessionId和user全部信息
export const getToken = (inputJson) => {
	const deviceListURL = `${BASE_URL}api/user/login`;
	return axios.post(deviceListURL, {
		userName: inputJson.userName,
		userPassword: inputJson.userPassword
	}, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

//用户登出delete后端token
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

//注册新用户
export const postRegister = (inputJson) => {
	const deviceListURL = `${BASE_URL}api/user/signUp`;
	return axios.post(deviceListURL, {
		userName: inputJson.userName,
		userPassword: inputJson.userPassword,
		userEmail: inputJson.userEmail
	}, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

//获取用户记录
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

//更新用户信息
export const updateUser = (user) => {
	const updateUserURL = `${BASE_URL}api/user/update?${getTokenParamURL()}`;
	return axios.patch(updateUserURL, user, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res), (err) => {
		throw new Error(err.message);
	});
};

//获取用户的公开信息
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
