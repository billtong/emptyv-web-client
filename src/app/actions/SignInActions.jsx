import { hashHistory } from 'react-router';
import { START_SIGN_IN_ERR_FETCH, 
  COMPLETE_SIGN_IN_ERR_FETCH,
  FAIL_SIGN_IN_ERR_FETCH
} from './types.jsx';
import { getToken } from '../api/user';
import { userTokenCookieKey, userTokenSessionKey } from '../api/apiHelper';
import { setCookie } from '../utils/cookieTools';

export const startSignIn = () => ({
  type: START_SIGN_IN_ERR_FETCH
});

export const completeSignIn = (user) => ({
  type: COMPLETE_SIGN_IN_ERR_FETCH,
  user
});

export const faileSignIn = (error) => ({
  type: FAIL_SIGN_IN_ERR_FETCH,
  error
});

export const signInAction = (inputJson) => {
  return (dispatch) => {
    dispatch(startSignIn());
    getToken(inputJson)
    .then((res) => {
      const userJson = {
        user: res.data.user,
        userToken: res.data.token,
        userSessionId: res.data.sessionId
      };
      console.log(inputJson);
      if (inputJson.isKeepLogin) {
        setCookie(userTokenCookieKey, JSON.stringify(userJson));
      } else {
        sessionStorage.setItem(userTokenSessionKey, JSON.stringify(userJson));
      }
      dispatch(completeSignIn(res.data.user));
      hashHistory.push('/');
    })
    .catch((err) => {
      dispatch(faileSignIn(`Sign in Failed: ${err.message}`));
    });
  };
};
