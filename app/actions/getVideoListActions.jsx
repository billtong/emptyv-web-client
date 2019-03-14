import {
  START_VIDEOS_FETCH,
  COMPLETE_VIDEOS_FETCH,
  FAILED_VIDEOS_FETCH,
  COMPELETE_UPDATE_VIDEO_PAGES,
} from './types.jsx';
import videoAPI from '../api/video';


export const startGetVideos = (filter, currPage, word, sizes) => ({
  type: START_VIDEOS_FETCH,
  filter,
  currPage,
  word,
  sizes
});

export const completeGetVideos = (videos) => ({
  type: COMPLETE_VIDEOS_FETCH,
  videos
});

export const failedGetVideos = (errorMessage) => ({
  type: FAILED_VIDEOS_FETCH,
  errorMessage,
});

export const updateVideoPageAction = (currPage, sizes) => {
  return (dispatch) => {
    dispatch({
      type: COMPELETE_UPDATE_VIDEO_PAGES,
      currPage,
      sizes
    });
  };
};

export const getVideoListAction = (inputJson) => {
  return (dispatch) => {
    dispatch(startGetVideos(inputJson.filter, inputJson.currPage, inputJson.word, inputJson.sizes));
    if (!inputJson.word) {
      videoAPI.getVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList));
      }).catch((err) => {
        dispatch(failedGetVideos('Sorry...we ain\'t able to serve any videos rn'));
      });
    } else {
      videoAPI.searchVideoList(inputJson).then((res) => {
        dispatch(completeGetVideos(res.data.videoList));
      }).catch((err) => {
        dispatch(failedGetVideos('Emm...I didn\'t find any video for U'));
      });
    }
  };
};
