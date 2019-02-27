import {
    START_VIDEOS_FETCH,
    COMPLETE_VIDEOS_FETCH,
    FAILED_VIDEOS_FETCH
} from '../actions/types.jsx';


export const getVideosReducer = (state = '', action) => {
  switch (action.type) {
    case START_VIDEOS_FETCH:
      return {
        isLoading: true,
        videoList: undefined,
        error: undefined
      };
    case COMPLETE_VIDEOS_FETCH:
      return {
        isLoading: false,
        videoList: action.videos,
        error: undefined
      };
    case FAILED_VIDEOS_FETCH:
      return {
        isLoading: false,
        videoList: undefined,
        error: action.errorMessage
      };
    default:
      return state;
  }
};
