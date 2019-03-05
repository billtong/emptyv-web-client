import { hashHistory } from 'react-router';
import { START_SIGN_IN_ERR_FETCH, COMPLETE_SIGN_IN_ERR_FETCH } from './types.jsx';
import { checkRedirect } from '../api/errorHandling.jsx';
import getLoginToken from '../api/getLoginToken.jsx';


export const startSignIn = () => ({
  type: START_SIGN_IN_ERR_FETCH
});

export const completeSignIn = (error) => ({
  type: COMPLETE_SIGN_IN_ERR_FETCH,
  error
});

export const signInAction = (inputJson) => {
  return (dispatch) => {
    dispatch(startSignIn());
    getLoginToken.getToken(inputJson)
    .then((res) => {
      const userJson = {
        user: res.data.user,
        userToken: res.data.token,
        userSessionId: res.data.sessionId
      };
      sessionStorage.setItem('empty-video-web-user-session', JSON.stringify(userJson));
      hashHistory.push('/');
      dispatch(completeSignIn(undefined));
    })
    .catch((err) => {
      dispatch(completeSignIn(`Sign in Failed: ${err.message}`));
      checkRedirect(err);
    });
  };
};
