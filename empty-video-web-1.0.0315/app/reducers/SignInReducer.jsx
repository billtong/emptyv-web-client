import {
    START_SIGN_IN_ERR_FETCH,
    COMPLETE_SIGN_IN_ERR_FETCH,
    FAIL_SIGN_IN_ERR_FETCH,
} from '../actions/types.jsx';


export const signInReducer = (state = '', action) => {
  switch (action.type) {
    case START_SIGN_IN_ERR_FETCH:
      return {
        ...state,
        isSignInLoading: true,
        signInError: undefined
      };
    case COMPLETE_SIGN_IN_ERR_FETCH:
      return {
        ...state,
        isSignInLoading: false,
        user: action.user
      };
    case FAIL_SIGN_IN_ERR_FETCH:
      return {
        ...state,
        isSignInLoading: false,
        signInError: action.error
      };
    default:
      return state;
  }
};
