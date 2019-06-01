import axios from 'axios';
import {BASE_URL} from './baseURL';
import {getTokenParamURL} from './apiHelper';

export const getMsgList = () => {
	const getMsgListURL = `${BASE_URL}/api/message/get?${getTokenParamURL()}`;
	return axios.get(getMsgListURL, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((res) => (res)
		, (err) => {
			throw new Error(err.message);
		});
};

export const postMsg = (inputJson) => {
	const postMsgURL = `${BASE_URL}/api/message/write?${getTokenParamURL()}`;
	return axios.post(postMsgURL, {
		msgContent: inputJson.msgContent,
		msgType: inputJson.msgType,
		senderId: inputJson.senderId,
		listenerId: inputJson.listenerId
	}, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => (err));
};

export const patchMsg = (inputJson) => {
	const patchMsgURL = `${BASE_URL}/api/message/edit?${getTokenParamURL()}`;
	return axios.patch(patchMsgURL, {
		msgId: inputJson.msgId,
		msgContent: inputJson.msgContent,
		senderId: inputJson.senderId,
	}, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => (err));
};

export const deleteMsg = (inputJson) => {
	const deleteMsgURL = `${BASE_URL}/api/message/delete?${getTokenParamURL()}&msgId=${inputJson.msgId}`;
	return axios.delete(deleteMsgURL, {
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => (res)
		, (err) => (err));
};
