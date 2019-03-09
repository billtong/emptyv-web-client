import {
    START_COMMENTS_FETCH,
    COMPLETE_COMMENTS_FETCH,
    FAILED_COMMENTS_FETCH
} from '../actions/types';


export const getCommentReducer = (state = '', action) => {
  switch (action.type) {
    case START_COMMENTS_FETCH:
      return {
        isGetLoading: true,
        commentList: undefined,
        error: undefined
      };
    case COMPLETE_COMMENTS_FETCH:
      return {
        isGetLoading: false,
        commentList: action.comments,
        error: undefined
      };
    case FAILED_COMMENTS_FETCH:
      return {
        isGetLoading: false,
        commentList: undefined,
        error: action.errorMessage
      };
    default:
      return state;
  }
};
