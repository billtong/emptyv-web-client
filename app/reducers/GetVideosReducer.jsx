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
        videoList: state.videoList,
        error: undefined,
        totalPages: state.totalPages
      };
    case COMPLETE_VIDEOS_FETCH:
      return {
        isLoading: false,
        videoList: action.videos,
        error: undefined,
        totalPages: action.totalPages
      };
    case FAILED_VIDEOS_FETCH:
      return {
        isLoading: false,
        videoList: undefined,
        error: action.errorMessage,
        totalPages: state.totalPages
      };
    default:
      return state;
  }
};
