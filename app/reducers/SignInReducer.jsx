import {
    START_SIGN_IN_ERR_FETCH,
    COMPLETE_SIGN_IN_ERR_FETCH,
} from '../actions/types.jsx';


export const signInReducer = (state = '', action) => {
  switch (action.type) {
    case START_SIGN_IN_ERR_FETCH:
      return {
        isLoading: true,
        error: undefined
      };
    case COMPLETE_SIGN_IN_ERR_FETCH:
      return {
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};
