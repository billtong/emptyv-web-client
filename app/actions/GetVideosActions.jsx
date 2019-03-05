import {
  START_VIDEOS_FETCH,
  COMPLETE_VIDEOS_FETCH,
  FAILED_VIDEOS_FETCH
} from './types.jsx';
import getVideoList from '../api/getVideos.jsx';

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
    getVideoList.getVideoList(inputJson).then((res) => {
      dispatch(completeGetVideos(res.data.videoList, res.data.totalPages));
    }).catch((err) => {
      dispatch(failedGetVideos(`Sorry...${err.message}`));
    });
  };
};
