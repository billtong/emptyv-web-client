import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import * as configureStore from './store/configureStore.jsx';
import Main from './components/layout/Main';
import SignIn from './components/pages/SignInPage';
import SignUp from './components/pages/SignUpPage';
import Home from './components/pages/HomePage';
import UserPage from './components/pages/UserPage';
import VideoPage from './components/pages/VideoPage/VideoPage';
import AboutPage from './components/pages/AboutPage';

require('style-loader!css-loader!sass-loader!applicationStyles');

const store = configureStore.configure();
store.subscribe(() => {
    console.log('New state', store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="SignIn" component={SignIn} />
        <Route path="SignUp" component={SignUp} />
        <Route path="UserPage" component={UserPage} />
        <Route path="VideoPage" component={VideoPage} />
        <Route path="About" component={AboutPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
