import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./app/utils/serviceWorker";
import App from "./app/App";
import * as configureStore from "./app/store/configureStore";
import {Provider} from "react-redux";

require('style-loader!css-loader!sass-loader!applicationStyles');
const store = configureStore.configure();
store.subscribe(() => {
    //console.log('New state', store.getState());
});
const root = document.getElementById('app');
if(root !== null){
  ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider>
    , root);
}
serviceWorker.register();
