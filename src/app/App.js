import React, {Component, Fragment} from "react";
import {Route, IndexRoute, Router, hashHistory} from 'react-router';
import Main from './components/layout/Main';
import SignIn from './components/pages/SignInPage';
import SignUp from './components/pages/SignUpPage';
import Home from './components/pages/HomePage';
import UserPage from './components/pages/UserPage';
import VideoPage from './components/pages/VideoPage/VideoPage';
import AboutPage from './components/pages/AboutPage';

class App extends Component{
  render() {
    return (
      <Fragment>
        <Router history={hashHistory}>
          <Route path="/" component={Main}>
            <IndexRoute component={Home} />
            <Route path="SignIn" component={SignIn} />
            <Route path="SignUp" component={SignUp} />
            <Route path="UserPage" component={UserPage} />
            <Route path="UserPage/:userId" component={UserPage} />
            <Route path="VideoPage" component={VideoPage} />
            <Route path="About" component={AboutPage} />
          </Route>
        </Router>
      </Fragment>
    );
  }
}

export default App;

