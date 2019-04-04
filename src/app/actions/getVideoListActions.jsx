import {
  START_VIDEOS_FETCH,
  COMPLETE_VIDEOS_FETCH,
  FAILED_VIDEOS_FETCH,
  COMPELETE_UPDATE_VIDEO_PAGES,
  COMPELETE_UPDATE_VIDEO_LIST
} from './types.jsx';
import { getVideoList } from '../api/video';


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

export const getVideoListAction = (inputJson) => {
  return (dispatch) => {
    dispatch(startGetVideos(inputJson.filter, inputJson.currPage, inputJson.word, inputJson.sizes));
    getVideoList(inputJson).then((res) => {
      dispatch(completeGetVideos(res.data.videoList));
    }).catch(() => {
      dispatch(failedGetVideos('Sorry...we ain\'t able to serve any videos rn'));
    });
  };
};

export const updateVideoListAction = (videoList) => {
  return (dispatch) => {
    dispatch({
      type: COMPELETE_UPDATE_VIDEO_LIST,
      videoList
    });
  };
};


export const updateVideoPageAction = (currPage, sizes) => {
  return (dispatch) => {
    dispatch({
      type: COMPELETE_UPDATE_VIDEO_PAGES,
      currPage,
      sizes
    });
  };
};
