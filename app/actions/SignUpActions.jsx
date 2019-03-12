import {
	START_SIGN_UP_RSLT_FETCH,
	COMPLETE_SIGN_UP_RSLT_FETCH
} from './types.jsx';
import postRegister from '../api/postRegister.jsx';


export const startSignUp = () => ({
	type: START_SIGN_UP_RSLT_FETCH
});

export const completeSignUp = (rslt) => ({
  type: COMPLETE_SIGN_UP_RSLT_FETCH,
  rslt
});

export const signUpAction = (inputJson) => {
	return (dispatch) => {
		dispatch(startSignUp());
		postRegister.postRegister(inputJson)
			.then((res) => {
				dispatch(completeSignUp(`${res.data.message}`));
			})
			.catch((err) => {
				dispatch(completeSignUp(`${err.message}`));
			});
	};
};
