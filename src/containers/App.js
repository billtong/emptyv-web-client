import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from "react-router-dom";
import NotFound from "./Routes/NotFound";
import Home from "./Routes/HomePage/Home";
import AboutPage from "./Routes/AboutPage/AboutPage";
import SignUpForm from "../components/layouts/Header/SignUpForm/SignUpForm";
import Header from "../components/layouts/Header/Header";
import LoginForm from "../components/layouts/Header/LoginForm/LoginForm";
import UserRouter from "../containers/Routes/UserPage";
import VideoPage from "./Routes/VideoPage/VideoPage";

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
                        <Route path="/signup" component={SignUpForm}/>
                        <Route path="/about" component={AboutPage}/>
                        <Route path="/user" component={UserRouter}/>
                        <Route path="/video/:id" component={VideoPage}/>
                        <Route path="/404" component={NotFound}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
