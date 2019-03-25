import {
    START_VIDEOS_FETCH,
    COMPLETE_VIDEOS_FETCH,
    FAILED_VIDEOS_FETCH,
    COMPELETE_UPDATE_VIDEO_PAGES,
} from '../actions/types.jsx';

export const getVideoListReducer = (state = '', action) => {
  switch (action.type) {
    case START_VIDEOS_FETCH:
      return {
        isLoading: true,
        error: undefined,
        videoList: undefined,
        word: action.word,
        filter: action.filter,
      };
    case COMPLETE_VIDEOS_FETCH:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        videoList: action.videos,
      };
    case FAILED_VIDEOS_FETCH:
      return {
        ...state,
        isLoading: false,
        videoList: undefined,
        error: action.errorMessage,
      };
    case COMPELETE_UPDATE_VIDEO_PAGES:
      return {
        ...state,
        currPage: action.currPage,
        sizes: action.sizes,
      };
    default:
      return state;
    }
};
