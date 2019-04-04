import { hashHistory } from 'react-router';
import {
  START_VIDEO_FETCH,
  COMPLETE_VIDEO_FETCH,
  FAILED_VIDEO_FETCH
} from './types.jsx';
import { getVideo } from '../api/video.jsx';


export const startGetVideo = () => ({
  type: START_VIDEO_FETCH
});

export const completeGetVideo = (video) => ({
  type: COMPLETE_VIDEO_FETCH,
  video,
});

export const failedGetVideo = (error) => ({
  type: FAILED_VIDEO_FETCH,
  error
});

export const getVideoActions = (videoId) => {
  return (dispatch) => {
    dispatch(startGetVideo());
    getVideo(videoId).then((res) => {
      dispatch(completeGetVideo(res.data));
    }).catch((err) => {
      hashHistory.push('404');
      dispatch(failedGetVideo(`Sorry...${err.statusCode}`));
    });
  };
};
