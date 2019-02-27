import {
	START_COMMENTS_FETCH,
	COMPLETE_COMMENTS_FETCH,
	FAILED_COMMENTS_FETCH
} from '../actions/types';
import getComments from '../api/getComments.jsx';

export const startGetComment = () => ({
	type: START_COMMENTS_FETCH
});

export const completeGetComment = (comments) => ({
	type: COMPLETE_COMMENTS_FETCH,
	comments
});

export const failedGetComment = (errorMessage) => ({
  type: FAILED_COMMENTS_FETCH,
  errorMessage 
});

export const getCommentAction = (inputJson) => {
	return (dispatch) => {
		dispatch(startGetComment);
		getComments.getComemtList(inputJson).then((res) => {
			dispatch(completeGetComment(res.data));
		}).catch((err) => {
			dispatch(failedGetComment(`Sorry...${err.message}`));
		});
	};
};
