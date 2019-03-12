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
        filter: 'date'
      };
    case COMPLETE_VIDEOS_FETCH:
      return {
        isLoading: false,
        videoList: action.videos,
        error: undefined,
        totalPages: action.totalPages,
        word: action.word,
        filter: action.filter
      };
    case FAILED_VIDEOS_FETCH:
      return {
        isLoading: false,
        videoList: undefined,
        error: action.errorMessage,
        totalPages: undefined,
        word: action.word,
        filter: action.filter
      };
    default:
      return state;
  }
};
