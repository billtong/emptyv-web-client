
import {
    START_VIDEOS_FETCH,
    COMPLETE_VIDEOS_FETCH,
    FAILED_VIDEOS_FETCH
} from './types.jsx';
import getVideoList from '../api/getVideos.jsx';



export const startGetVideos = () => {
    return {
        type: START_VIDEOS_FETCH
    };
};


export const completeGetVideos = (videos) => {
    return {
        type: COMPLETE_VIDEOS_FETCH,
        videos
    };
};


export const failedGetVideos = (errorMessage) => {
    return {
        type: FAILED_VIDEOS_FETCH,
        errorMessage
    };
};

export const getVideosAction = (inputJson) => {
    return (dispatch) => {
        dispatch(startGetVideos());
        getVideoList.getVideoList(inputJson).then((res)=>{
            dispatch(completeGetVideos(res.data));
        }).catch((err)=>{
            dispatch(failedGetVideos(`Sorry...${err.message}`));
        });

    };
};
