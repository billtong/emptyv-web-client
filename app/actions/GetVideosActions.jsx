import {
  START_VIDEOS_FETCH,
  COMPLETE_VIDEOS_FETCH,
  FAILED_VIDEOS_FETCH
} from './types.jsx';
import videoAPI from '../api/video';

export const startGetVideos = () => ({
  type: START_VIDEOS_FETCH
});

export const completeGetVideos = (videos, totalPages, word) => ({
  type: COMPLETE_VIDEOS_FETCH,
  videos,
  totalPages,
  word
});

export const failedGetVideos = (errorMessage, word) => ({
  type: FAILED_VIDEOS_FETCH,
  errorMessage,
  word
});

export default function getVideosAction(inputJson) {
  return (dispatch) => {
    dispatch(startGetVideos());
    if (!inputJson.word) {
      videoAPI.getVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList, res.data.totalPages, undefined));
      }).catch((err) => {
        dispatch(failedGetVideos(`Sorry...${err.statusCode}`, undefined));
      });
    } else {
      videoAPI.searchVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList, res.data.totalPages, inputJson.word));
      }).catch((err) => {
        dispatch(failedGetVideos(`Sorry...${err.statusCode}`, inputJson.word));
      });
    }
  };
};
