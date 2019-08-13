import axios from 'axios';
import {BASE_URL} from './baseURL';
import {getSessionTokenJson} from './apiHelper';

export const getFavListsByUser = (inputJson) => {
    const getFavListURL = `${BASE_URL}fav-list-service/favlist?userId=${inputJson.userId}`;
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

export const patchFavList = (inputJson) => {
    const patchFavListURL = `${BASE_URL}fav-list-service/favlist/${inputJson.id}?operation=${inputJson.operation}&videoId=${inputJson.videoId}`;
    return axios.patch(patchFavListURL, null, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getSessionTokenJson().userToken
        }
    })
        .then((res) => (res)
            , (err) => {
                throw new Error(err.message);
            });
};

export const postFavList = (inputJson) => {
    const getFavListURL = `${BASE_URL}fav-list-service/favlist`;
    return axios.post(getFavListURL, inputJson, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getSessionTokenJson().userToken
        }
    })
        .then((res) => (res)
            , (err) => {
                throw new Error(err.message);
            });
};
