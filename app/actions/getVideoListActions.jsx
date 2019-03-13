import {
  START_VIDEOS_FETCH,
  COMPLETE_VIDEOS_FETCH,
  FAILED_VIDEOS_FETCH
} from './types.jsx';
import videoAPI from '../api/video';


export const startGetVideos = (filter, currPage) => ({
  type: START_VIDEOS_FETCH,
  filter,
  currPage
});

export const completeGetVideos = (videos, totalPages, word, filter, currPage) => ({
  type: COMPLETE_VIDEOS_FETCH,
  videos,
  totalPages,
  word,
  filter,
  currPage
});

export const failedGetVideos = (errorMessage, word, filter, currPage) => ({
  type: FAILED_VIDEOS_FETCH,
  errorMessage,
  word,
  filter,
  currPage
});

export const getVideoListAction = (inputJson) => {
  return (dispatch) => {
    dispatch(startGetVideos(inputJson.filter, inputJson.currPage));
    if (!inputJson.word) {
      videoAPI.getVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList, res.data.totalPages, undefined, inputJson.filter, inputJson.currPage));
      }).catch((err) => {
        dispatch(failedGetVideos('Sorry...we ain\'t able to serve any videos rn', undefined, inputJson.filter, inputJson.currPage));
      });
    } else {
      videoAPI.searchVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList, res.data.totalPages, inputJson.word, inputJson.filter, inputJson.currPage));
      }).catch((err) => {
        console.log(err.response);
        dispatch(failedGetVideos('Emm...I didn\'t find any video for U', inputJson.word, inputJson.filter, inputJson.currPage));
      });
    }
  };
};
