import axios from 'axios';
import {BASE_URL} from './baseURL';
import {getTokenParamURL} from './apiHelper';

export const getFavList = (inputJson) => {
	const getFavListURL = `${BASE_URL}api/fav/getFavsByUserId?userId=${inputJson.userId}`;
	return axios.get(getFavListURL, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

export const patchFavList = (newFav) => {
	const patchFavListURL = `${BASE_URL}api/fav/patchFav?${getTokenParamURL()}`;
	return axios.patch(patchFavListURL, newFav, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

export const postFavList = (newFav) => {
	const getFavListURL = `${BASE_URL}api/fav/postNewFav?${getTokenParamURL()}`;
	return axios.post(getFavListURL, newFav, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};
