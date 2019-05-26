import axios from 'axios';
import {BASE_URL} from './baseURL';
import {getSessionTokenJson, getTokenParamURL} from './apiHelper';

export const getDanList = (videoId) => {
	const getDanListURL = `${BASE_URL}api/dan/load?videoId=${videoId}`;
	return axios.get(getDanListURL, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

export const postDan = (inputJson) => {
	const postDanURL = `${BASE_URL}api/dan/write?${getTokenParamURL()}`;
	return axios.post(postDanURL, {
		danCurrTime: inputJson.danCurrTime,
		danContent: inputJson.danContent,
		danStyle: inputJson.danStyle,
		videoId: inputJson.videoId,
		userId: getSessionTokenJson().user.userId
	}, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => (err));
};

