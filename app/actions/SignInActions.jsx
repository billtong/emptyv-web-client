import { hashHistory } from 'react-router';
import {
    START_SIGN_IN_ERR_FETCH,
    COMPLETE_SIGN_IN_ERR_FETCH
} from './types.jsx';
import { checkRedirect } from '../api/errorHandling.jsx';
import getLoginToken from '../api/getLoginToken.jsx';



export const startSignIn = () => {
    return {
        type: START_SIGN_IN_ERR_FETCH
    };
};


//这action都是登陆失败的情况

export const completeSignIn = (error) => {
    return {
        type: COMPLETE_SIGN_IN_ERR_FETCH,
        error
    };
};

export const signInAction = (inputJson) => {
    return (dispatch) => {
        dispatch(startSignIn());
        getLoginToken.getToken(inputJson)
            .then((res) => {
                sessionStorage.setItem('emptyVideoLoginToken', res.data.token);
                sessionStorage.setItem('emptyVideoLoginSessionId', res.data.sessionId);
                hashHistory.push('/');
                dispatch(completeSignIn(undefined));
            })
            .catch((err) => {
                dispatch(completeSignIn(`Sign in Failed: ${err.message}`));
                checkRedirect(err);
            });
    };
};
