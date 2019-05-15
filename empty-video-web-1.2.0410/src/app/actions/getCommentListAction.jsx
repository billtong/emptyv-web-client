import {
	START_COMMENTS_FETCH,
	COMPLETE_COMMENTS_FETCH,
  FAILED_COMMENTS_FETCH,
  COMPELETE_UPDATE_COMMENT_PAGES
} from './types';
import { getComemtList } from '../api/comment';

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

export const updateCommentPageAction = (currPage, sizes) => {
  return (dispatch) => {
    dispatch({
      type: COMPELETE_UPDATE_COMMENT_PAGES,
      currPage,
      sizes
    });
  };
};

export const getCommentListAction = (inputJson) => {
	return (dispatch) => {
		dispatch(startGetComment);
		getComemtList(inputJson).then((res) => {
			dispatch(completeGetComment(res.data));
		}).catch((err) => {
			dispatch(failedGetComment(`Sorry...${err.message}`));
		});
	};
};
