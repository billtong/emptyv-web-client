import {
    START_VIDEOS_FETCH,
    COMPLETE_VIDEOS_FETCH,
    FAILED_VIDEOS_FETCH
} from '../actions/types.jsx';


export const getVideoListReducer = (state = '', action) => {
  switch (action.type) {
    case START_VIDEOS_FETCH:
      return {
        isLoading: true,
        videoList: undefined,
        error: undefined,
        totalPages: undefined,
        word: undefined,
        filter: action.filter,
        currPage: action.currPage
      };
    case COMPLETE_VIDEOS_FETCH:
      return {
        isLoading: false,
        videoList: action.videos,
        error: undefined,
        totalPages: action.totalPages,
        word: action.word,
        filter: action.filter,
        currPage: action.currPage
      };
    case FAILED_VIDEOS_FETCH:
      return {
        isLoading: false,
        videoList: undefined,
        error: action.errorMessage,
        totalPages: undefined,
        word: action.word,
        filter: action.filter,
        currPage: action.currPage
      };
    default:
      return state;
  }
};
