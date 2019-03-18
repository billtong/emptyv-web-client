import {
  START_GET_USER_HISTORY,
  COMPELETE_GET_USER_HISTORY,
  FAILED_GET_USER_HISTORY 
} from '../actions/types.jsx';

export const getUserHistoryReducer = (state = '', action) => {
  switch (action.type) {
    case START_GET_USER_HISTORY:
      return {
        ...state,
        isHistoryLoading: true,
        historyError: undefined,
        history: undefined,
      };
    case COMPELETE_GET_USER_HISTORY:
      return {
        ...state,
        isHistoryLoading: false,
        history: action.history
      };
    case FAILED_GET_USER_HISTORY:
      return {
        ...state,
        isHistoryLoading: false,
        historyError: action.error
      };
    default:
      return state;
  }
};
