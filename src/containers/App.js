import React, { Component } from 'react';
import './App.css';
import {connect} from "react-redux";
import actions from "../store/actions/root";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import NotFound from "./Routes/NotFound";
import Home from "./Routes/Home";
import {NavItem} from "../components/layouts/Navigation"
import history from "../utils/history";
import AboutPage from "./Routes/AboutPage/AboutPage";

class App extends Component {
  handleNavClick = (route) => {
	  history.push(route);
  }

	switchLanguage() {
    let lang = this.props.locale;
    lang = lang === 'zh' ? 'en' : 'zh';
    this.props.changeLanguage(lang);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-left">
	          <NavItem event={() => this.handleNavClick("/")} id={"home"} />
	          <NavItem event={()=> this.handleNavClick("/about") } id={"about"} />
          </div>
          <div className="App-header-right">
	          <NavItem event={() => this.switchLanguage() } id={"language"}/>
          </div>
        </header>
	      <div className="App-content">
		      <Switch>
			      <Route path="/" exact component={Home} />
            <Route path="/about" exact component={AboutPage}/>
			      <Route path="/404" exact component={NotFound} />
			      <Redirect from="*" to="/404" />
		      </Switch>
	      </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ...ownProps) => ({
  locale: state.root.language,
});
const mapDispatchToProps = (dispatch, ...ownProps) => ({
  changeLanguage: (val) => dispatch(actions.changeLanguage(val))
});
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
    undefined,
    {pure: false}
)(App));
