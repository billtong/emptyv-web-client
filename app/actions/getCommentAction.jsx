import {
    START_COMMENTS_FETCH,
    COMPLETE_COMMENTS_FETCH,
    FAILED_COMMENTS_FETCH
} from '../actions/types'
import getComments from '../api/getComments.jsx';

export const startGetComment = ()=>{
    return {
        type : START_COMMENTS_FETCH
    }
};

export const completeGetComment = (comments)=>{
    return {
        type : COMPLETE_COMMENTS_FETCH,
        comments
    }
};

export const failedGetComment =(errorMessage)=>{
    return {
        type : FAILED_COMMENTS_FETCH,
        errorMessage
    }
};

export const getCommentAction = (inputJson)=>{
    return (dispatch) =>{
        dispatch(startGetComment);
        getComments.getComemtList(inputJson).then((res)=>{
            dispatch(completeGetComment(res.data));
        }).catch((err)=>{
            dispatch(failedGetComment( `Sorry...${err.message}`));
        });
    };
};
