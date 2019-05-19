import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Text from "../components/accessories/Text";
import {connect} from "react-redux";
import actions from "../store/actions/root";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import NotFound from "./Routes/NotFound";
import Home from "./Routes/Home";
import Navigation, {NavItem} from "../components/layouts/Navigation"
import history from "../utils/history";

class App extends Component {
  changeLanguage() {
    let lang = this.props.locale;
    lang = lang === 'zh' ? 'en' : 'zh';
    this.props.changeLanguage(lang);
  }
  render() {
    const { locale } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <Navigation>
            <NavItem event={() => {history.push("/")}} name={"Home"} />
            <NavItem />
            <NavItem event={() => this.changeLanguage()} name={locale === 'zh' ? '英文' : 'Chinese'}/>
          </Navigation>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <h1 className="App-title">
              <Text
                  id="hello"
              />
            </h1>
            <p className="App-intro">
              <Text
                  id="name"
                  values={{ name: <b>{'estKey'}</b> }}
              />
            </p>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/404" exact component={NotFound} />
              <Redirect from="*" to="/404" />
            </Switch>
          </div>
        </header>
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
