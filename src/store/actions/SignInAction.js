import { START_SIGN_IN_ERR_FETCH,
  COMPLETE_SIGN_IN_ERR_FETCH,
  FAIL_SIGN_IN_ERR_FETCH
} from './types';
import { getToken } from '../../utils/api/user';
import { userTokenCookieKey, userTokenSessionKey } from '../../utils/api/apiHelper';
import { setCookie } from '../../utils/cookieTools';
import history from "../../utils/history";

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
      if (inputJson.isKeepLogin) {
        setCookie(userTokenCookieKey, JSON.stringify(userJson));
      } else {
        sessionStorage.setItem(userTokenSessionKey, JSON.stringify(userJson));
      }
      dispatch(completeSignIn(res.data.user));
      history.push("/");
    })
    .catch((err) => {
      dispatch(faileSignIn(`Sign in Failed: ${err.message}`));
    });
  };
};
