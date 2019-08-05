import axios from 'axios';
import {BASE_URL} from './baseURL';
import {getSessionTokenJson, getTokenParamURL} from './apiHelper';

export const getComemtList = (inputJson) => {
	const deviceListURL = `${BASE_URL}comment-service/comment/video/${inputJson.videoId}`;
	return axios.get(deviceListURL, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

export const postComment = (inputJson) => {
	const postCommentURL = `${BASE_URL}comment-service/comment`;
	return axios.post(postCommentURL, inputJson, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getSessionTokenJson().userToken
		}
	}).then((res) => (res)
		, (err) => (err));
};

export const postCommentA = (inputJson) => {
	const postCommentAnonyURL = `${BASE_URL}api/comment/writeA`;
	return axios.post(postCommentAnonyURL, {
		commentContent: inputJson.commentContent,
		commentParentId: inputJson.commentParentId
	}, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => (err));
};

export const deleteComment = (inputJson) => {
	const deleteCommentURL = `${BASE_URL}comment-service/comment/${inputJson.commentId}`;
	return axios.delete(deleteCommentURL, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getSessionTokenJson().userToken
		}
	}).then((res) => (res)
		, (err) => (err));
};
