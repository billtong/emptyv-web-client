import {
	START_SIGN_UP_RSLT_FETCH,
  COMPLETE_SIGN_UP_RSLT_FETCH,
  FAIL_SIGN_UP_FETCH
} from './types';
import { postRegister } from '../../utils/api/user';

export const startSignUp = () => ({
	type: START_SIGN_UP_RSLT_FETCH
});

export const completeSignUp = (rslt) => ({
  type: COMPLETE_SIGN_UP_RSLT_FETCH,
  rslt
});

export const failSignUp = (err) => ({
  type: FAIL_SIGN_UP_FETCH,
  err
});

export const signUpAction = (inputJson) => {
	return (dispatch) => {
		dispatch(startSignUp());
		postRegister(inputJson)
			.then((res) => {
				dispatch(completeSignUp(`${res.data.message}`));
			})
			.catch((err) => {
				dispatch(failSignUp(`${err.message}`));
			});
	};
};
