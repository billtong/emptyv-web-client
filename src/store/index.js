import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import transforms from "./transform";
import history from "../utils/history"
import {connectRouter, routerMiddleware} from "connected-react-router";
import changeLanguageReducer from "./reducers/ChangeLanguageReducer";
import {signUpReducer} from "./reducers/SignUpReducer";

const initialState = {
};
const middleware = [thunk];

const persistConfig = {
     key: 'root',
     storage: storage,
     //stateReconciler: hardSet,
     transforms: [transforms],
     whitelist: ['root']
};

const rootReducer = (history) => combineReducers({
	changeLanguageReducer,
	signUpReducer,
	router: connectRouter(history)
});

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export const store = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            ...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    )
);

export const persistor = persistStore(store);
