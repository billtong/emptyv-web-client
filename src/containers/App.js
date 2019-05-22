import React, { Component } from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import NotFound from "./Routes/NotFound";
import Home from "./Routes/Home";
import AboutPage from "./Routes/AboutPage/AboutPage";
import SignUpPage from "./Routes/SignUpPage/SignUpPage";
import Header from "../components/layouts/Header/Header";
import NotificationPage from "./Routes/UserPage/NotificationPage/NotificationPage";

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
            <Route path="/about" exact component={AboutPage}/>
			      <Route path="/signup" exact component={SignUpPage}/>
			      <Route path="/user/notification" exact component={NotificationPage} />
			      <Route path="/404" exact component={NotFound} />
		      </Switch>
	      </div>
      </div>
    );
  }
}

export default withRouter(App);
