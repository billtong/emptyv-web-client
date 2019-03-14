import * as redux from 'redux';
import thunkMiddleware from 'redux-thunk';
import { signInReducer } from '../reducers/SignInReducer.jsx';
import { signUpReducer } from '../reducers/SignUpReducer.jsx';
import { getVideoListReducer } from '../reducers/GetVideoListReducer';
import { getVideoReducer } from '../reducers/getVideoReducer.jsx';
import { getCommentListReducer } from '../reducers/getCommentListReducer';


export const configure = () => {
  const reducer = redux.combineReducers({
    signIn: signInReducer,
    signUp: signUpReducer,
    videoGrid: getVideoListReducer,
    videoPage: getVideoReducer,
    commentGrid: getCommentListReducer,
  });
  const store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunkMiddleware),
  ));
  return store;
};
