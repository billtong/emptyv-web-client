import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from "react-router-dom";
import NotFound from "./Routes/NotFound";
import Home from "./Routes/Home";
import AboutPage from "./Routes/AboutPage/AboutPage";
import SignUpPage from "./Routes/SignUpPage/SignUpPage";
import Header from "../components/layouts/Header/Header";
import LoginForm from "../components/layouts/Header/LoginForm/LoginForm";
import UserRouter from "../containers/Routes/UserPage";

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Header/>
				</header>
				<div className="App-content">
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/login" component={LoginForm}/>
						<Route path="/signup" component={SignUpPage}/>
						<Route path="/about" component={AboutPage}/>

						<Route path="/user" component={UserRouter}/>
						<Route path="/404" component={NotFound}/>
					</Switch>
				</div>
			</div>
		);
	}
}

export default withRouter(App);
