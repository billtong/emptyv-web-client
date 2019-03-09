import {
  START_VIDEO_FETCH,
  COMPLETE_VIDEO_FETCH,
  FAILED_VIDEO_FETCH
} from '../actions/types.jsx';


export const getVideoReducer = (state = '', action) => {
  switch (action.type) {
    case START_VIDEO_FETCH:
      return {
        videoData: undefined,
        isLoading: true,
        error: undefined
      };
    case COMPLETE_VIDEO_FETCH:
      return {
        videoData: action.video,
        isLoading: false,
        error: undefined
      };
    case FAILED_VIDEO_FETCH:
      return {
        videoData: undefined,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};
