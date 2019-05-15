import {
  START_GET_USER_HISTORY,
  COMPELETE_GET_USER_HISTORY,
  FAILED_GET_USER_HISTORY 
} from './types.jsx';
import { getUserHistory } from '../api/user';

export const startGetUserHistory = () => ({
  type: START_GET_USER_HISTORY,
});

export const compeleteGetUserHistory = (history) => ({
  type: COMPELETE_GET_USER_HISTORY,
  history
});

export const failedGetUserHistory = (err) => ({
  type: FAILED_GET_USER_HISTORY,
  err
});


export const getUserHistoryAction = () => {
  return (dispatch) => {
    getUserHistory()
    .then((res) => {
      dispatch(compeleteGetUserHistory(res.data));
    }).catch((err) => {
        dispatch(failedGetUserHistory(`failed get${err.message}`));
    });
  };
};
