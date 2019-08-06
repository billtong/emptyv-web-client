import axios from 'axios';
import { BASE_URL } from './baseURL';
import { getTokenParamURL, getSessionTokenJson } from './apiHelper';

export const getToken = (inputJson) => {
	const loginUrl = `${BASE_URL}user-service/auth/login`;
	//const loginUrl = "http://localhost:8001/auth/login"
	return axios.post(loginUrl, {
		headers: {
			'Content-Type': 'application/json'
		}
	}, {
		auth: {
			username: inputJson.email,
			password: inputJson.password
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
			'Accept': 'application/json'
		}
	})
	.then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

export const postRegister = (inputJson) => {
	const registerURL = `${BASE_URL}user-service/user`;
	return axios.post(registerURL, {
		name: inputJson.userName,
		pwd: inputJson.userPassword,
		email: inputJson.userEmail
	}, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

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

export const updateUser = (user) => {
	const updateUserURL = `${BASE_URL}user-service/user`;
	return axios.patch(updateUserURL, user, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getSessionTokenJson().userToken
		}
	}).then((res) => (res), (err) => {
		throw new Error(err.message);
	});
};

export const getUserPublic = (inputJson) => {
	const deviceListURL = `${BASE_URL}user-service/user/${inputJson.userId}`;
	return axios.get(deviceListURL, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

export const getUsersByIds = (inputJson) => {
	const getUsersURL = `${BASE_URL}user-service/users/?ids=${inputJson.ids}`;
	return axios.get(getUsersURL).then(res => res, err => {
		throw new Error(err.message);
	})
};
