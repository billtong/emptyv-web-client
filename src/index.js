import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './utils/serviceWorker';
import {ConnectedRouter as Router} from "connected-react-router";
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from "react-redux";
import Intl from "./utils/Intl";
import {persistor, store} from './store';
import history from "./utils/history";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
                <Intl>
                    <App/>
                </Intl>
            </Router>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
serviceWorker.register();
