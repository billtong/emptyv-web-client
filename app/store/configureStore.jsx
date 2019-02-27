import * as redux from 'redux';
import thunkMiddleware from 'redux-thunk';

import { signInReducer} from '../reducers/SignInReducer.jsx';
import { signUpReducer} from '../reducers/SignUpReducer.jsx';
import { getVideosReducer} from '../reducers/GetVideosReducer.jsx';
import { getCommentReducer } from '../reducers/getCommentReducer.jsx';

export const configure = () => {
    const reducer = redux.combineReducers({
        signIn: signInReducer,
        signUp: signUpReducer,
        VideoGrid: getVideosReducer,
        CommentGrid : getCommentReducer
    });

    const store = redux.createStore(reducer, redux.compose(
        redux.applyMiddleware(thunkMiddleware),
    ));

    return store;
};
