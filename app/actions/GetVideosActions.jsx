import {
  START_VIDEOS_FETCH,
  COMPLETE_VIDEOS_FETCH,
  FAILED_VIDEOS_FETCH
} from './types.jsx';
import videoAPI from '../api/video';

export const startGetVideos = () => ({
  type: START_VIDEOS_FETCH
});

export const completeGetVideos = (videos, totalPages) => ({
  type: COMPLETE_VIDEOS_FETCH,
  videos,
  totalPages
});

export const failedGetVideos = (errorMessage) => ({
  type: FAILED_VIDEOS_FETCH,
  errorMessage
});

export const getVideosAction = (inputJson) => {
  return (dispatch) => {
    dispatch(startGetVideos());
    if (!inputJson.word) {
      console.log(!inputJson.word);
      videoAPI.getVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList, res.data.totalPages));
      }).catch((err) => {
        dispatch(failedGetVideos(`Sorry...${err.statusCode}`));
      });
    } else {
      videoAPI.searchVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList, res.data.totalPages));
      }).catch((err) => {
        dispatch(failedGetVideos(`Sorry...${err.statusCode}`));
      });
    }
  };
};
