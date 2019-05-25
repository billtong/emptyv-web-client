import React, { Component } from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import NotFound from "./Routes/NotFound";
import Home from "./Routes/Home";
import AboutPage from "./Routes/AboutPage/AboutPage";
import SignUpPage from "./Routes/SignUpPage/SignUpPage";
import Header from "../components/layouts/Header/Header";
import NotificationPage from "./Routes/NotificationPage/NotificationPage";
import LoginForm from "../components/layouts/Header/LoginForm/LoginForm";
import MessagePage from "./Routes/MessagePage";
import UserRouter from "../containers/Routes/UserPage";
import UserPage from "./Routes/UserPage/UserPage";
import SettingPage from "./Routes/SettingPage/SettingPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
	        <Header />
        </header>
	      <div className="App-content">
		      <Switch>
			      <Route path="/" exact component={Home} />
			      <Route path="/login" component={LoginForm} />
			      <Route path="/signup" component={SignUpPage} />
            <Route path="/about" component={AboutPage} />
			      <Route path="/user" component={UserRouter} />
			      <Route path="/404" component={NotFound} />
		      </Switch>
	      </div>
      </div>
    );
  }
}

export default withRouter(App);
