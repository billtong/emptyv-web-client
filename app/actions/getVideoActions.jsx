import {
  START_VIDEO_FETCH,
  COMPLETE_VIDEO_FETCH,
  FAILED_VIDEO_FETCH
} from './types.jsx';
import videoAPI from '../api/video.jsx';


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
    videoAPI.getVideo(videoId).then((res) => {
      dispatch(completeGetVideo(res.data));
    }).catch((err) => {
      dispatch(failedGetVideo(`Sorry...${err.statusCode}`));
    });
  };
};
