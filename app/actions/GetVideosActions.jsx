import {
  START_VIDEOS_FETCH,
  COMPLETE_VIDEOS_FETCH,
  FAILED_VIDEOS_FETCH
} from './types.jsx';
import videoAPI from '../api/video';

export const startGetVideos = (filter) => ({
  type: START_VIDEOS_FETCH,
  filter
});

export const completeGetVideos = (videos, totalPages, word, filter) => ({
  type: COMPLETE_VIDEOS_FETCH,
  videos,
  totalPages,
  word,
  filter
});

export const failedGetVideos = (errorMessage, word, filter) => ({
  type: FAILED_VIDEOS_FETCH,
  errorMessage,
  word,
  filter
});

export default function getVideosAction(inputJson) {
  return (dispatch) => {
    dispatch(startGetVideos());
    if (!inputJson.word) {
      videoAPI.getVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList, res.data.totalPages, undefined, inputJson.filter));
      }).catch((err) => {
        dispatch(failedGetVideos('Sorry...we ain\'t able to serve any videos rn', undefined, inputJson.filter));
      });
    } else {
      videoAPI.searchVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList, res.data.totalPages, inputJson.word, inputJson.filter));
      }).catch((err) => {
        console.log(err.response);
        dispatch(failedGetVideos('Emm...I didn\'t find any video for U', inputJson.word, inputJson.filter));
      });
    }
  };
};
