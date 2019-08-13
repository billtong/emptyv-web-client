import {COMPLETE_COMMENTS_FETCH, FAILED_COMMENTS_FETCH, START_COMMENTS_FETCH} from './types';
import {getComemtList} from '../../utils/api/comment';
import {getCommentUserIds, handleCommentList} from "../../utils/commentListUtil";
import {getUsersByIds} from "../../utils/api/user";

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

export const getCommentListAction = (inputJson) => {
    return (dispatch) => {
        dispatch(startGetComment);
        getComemtList(inputJson).then((res) => {
            const ids = getCommentUserIds(res.data);
            getUsersByIds({
                ids: ids
            }).then((res1) => {
                const rslt = handleCommentList(res.data, res1.data);
                dispatch(completeGetComment(rslt));
            });
        }).catch((err) => {
            dispatch(failedGetComment(`Sorry...${err.message}`));
        });
    };
};
