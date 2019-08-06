import axios from 'axios';
import {BASE_URL} from './baseURL';
import {getSessionTokenJson, getTokenParamURL} from './apiHelper';

export const getVideo = (inputJson) => {
	const getVideoURL = `${BASE_URL}video-service/video/${inputJson.videoId}`;
	return axios.get(getVideoURL, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

//userId不用管，以后会被废除，现在也不影响搜索
export const getRandomVideoList = () => {
	const getVideoListURL = `${BASE_URL}video-service/videos/random`;
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
