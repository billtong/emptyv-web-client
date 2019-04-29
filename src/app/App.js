import React, {Component, Fragment} from "react";
import {Route, IndexRoute, Router, hashHistory, Redirect} from 'react-router';
import Main from './components/layout/Main';
import SignIn from './components/pages/SignInPage';
import SignUp from './components/pages/SignUpPage';
import Home from './components/pages/HomePage';
import UserPage from './components/pages/UserPage';
import SettingPage from './components/pages/SettingPage';
import NotificationPage from './components/pages/NotificationPage';
import VideoPage from './components/pages/VideoPage/VideoPage';
import AboutPage from './components/pages/AboutPage';
import NotFoundPage from './components/pages/NotFoundPage';

class App extends Component{
  render() {
    return (
      <Fragment>
        <Router history={hashHistory}>
          <Route path="/" component={Main}>
            <IndexRoute component={Home} />
            .<Route path="SignIn" component={SignIn} />
            <Route path="SignUp" component={SignUp} />
            <Route path="UserPage" component={UserPage} />
            <Route path="UserPage/setting" component={SettingPage} />
            <Route path="UserPage/notification" component={NotificationPage} />
            <Route path="UserPage/:userId" component={UserPage} />
            <Route path="VideoPage" component={VideoPage} />
            <Route path="About" component={AboutPage} />
            <Route path="404" component={NotFoundPage} />
            <Redirect from="*" to="404" />
          </Route>
        </Router>
      </Fragment>
    );
  }
}

export default App;

