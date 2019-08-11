import axios from 'axios';
import {BASE_URL} from './baseURL';
import {getSessionTokenJson, getTokenParamURL} from './apiHelper';

export const getDanList = (inputJson) => {
	const getDanListURL = `${BASE_URL}dan-service/dan/${inputJson.videoId}`;
	return axios.get(getDanListURL).then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

export const postDan = (inputJson) => {
	const postDanURL = `${BASE_URL}dan-service/dan`;
	return axios.post(postDanURL, inputJson, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getSessionTokenJson().userToken
		}
	}).then((res) => (res)
		, (err) => (err));
};

