import axios from 'axios';
import {BASE_URL} from './baseURL';
import {getSessionTokenJson} from './apiHelper';
import operation from '../../assets/operations';

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

export const getVideoByIds = (inputJson) => {
    const getVideosURL = `${BASE_URL}video-service/videos?ids=${inputJson.ids}`;
    return axios.get(getVideosURL).then(res => res, err => {
        throw new Error(err.message);
    })
};


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

export const patchVideoView = (inputJson) => {
    const userJson = getSessionTokenJson();
    const patchViewURL = `${BASE_URL}video-service/video/${inputJson.videoId}?operation=${operation.VIEW_A_VIDEO}`;
    if (userJson) {
        return axios.patch(patchViewURL, null, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getSessionTokenJson().userToken
            }
        }).then(res => res, err => err);
    } else {
        return axios.patch(patchViewURL, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res, err => err);
    }
};

export const patchVideoCount = (inputJson) => {
    const patchCountURL = `${BASE_URL}video-service/video/${inputJson.videoId}?operation=${inputJson.operation}`;
    return axios.patch(patchCountURL, null, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getSessionTokenJson().userToken
        }
    }).then(res => res, err => err);
};

export const patchVideoTag = (inputJson) => {
    const patchTagURL = `${BASE_URL}video-service/video/${inputJson.videoId}?operation=${operation.TAG_A_VIDEO}&tag=${inputJson.tag}`;
    return axios.patch(patchTagURL, null, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getSessionTokenJson().userToken
        }
    }).then(res => res, err => err);
};
