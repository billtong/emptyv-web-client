import {
    START_SIGN_UP_RSLT_FETCH,
    COMPLETE_SIGN_UP_RSLT_FETCH,
    FAIL_SIGN_UP_FETCH
} from '../actions/types.jsx';


export const signUpReducer = (state = '', action) => {
  switch (action.type) {
    case START_SIGN_UP_RSLT_FETCH:
      return {
        isLoading: true,
        rslt: undefined,
        error: undefined
      };
    case COMPLETE_SIGN_UP_RSLT_FETCH:
      return {
        isLoading: false,
        rslt: action.rslt,
        error: undefined
      };
    case FAIL_SIGN_UP_FETCH:
      return {
        isLoading: false,
        error: action.err
      };
    default:
      return state;
  }
};
