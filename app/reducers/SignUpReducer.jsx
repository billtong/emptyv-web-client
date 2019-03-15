import {
    START_SIGN_UP_RSLT_FETCH,
    COMPLETE_SIGN_UP_RSLT_FETCH
} from '../actions/types.jsx';


export const signUpReducer = (state = '', action) => {
  switch (action.type) {
    case START_SIGN_UP_RSLT_FETCH:
      return {
        isLoading: true,
        rslt: undefined,
      };
    case COMPLETE_SIGN_UP_RSLT_FETCH:
      return {
        isLoading: false,
        rslt: action.rslt
      };
    default:
      return state;
  }
};
