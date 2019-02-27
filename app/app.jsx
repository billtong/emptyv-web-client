import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import * as configureStore from './store/configureStore.jsx';
import Main from './components/Main.jsx';
import SignIn from './components/userSign/SignIn.jsx';
import SignUp from './components/userSign/SignUp.jsx';
import Home from './components/Home.jsx'
import UserPage from './components/userPage/UserPage.jsx'
import VideoPage from './components/videoPage/VideoPage.jsx'
import DonatePage from './components/donatePage/DonatePage.jsx';

//这里通过redux将所有的state打包成了一个json
const store = configureStore.configure();
store.subscribe(() => {
    console.log('New state', store.getState());
});

//App css
require('style-loader!css-loader!sass-loader!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Home} />
                <Route path="SignIn" component={SignIn} />
                <Route path="SignUp" component={SignUp} />
                <Route path="UserPage" component={UserPage}/>
                <Route path="VideoPage" component={VideoPage}/>
                <Route path="Donate" component={DonatePage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
