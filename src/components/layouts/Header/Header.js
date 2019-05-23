import React, { Component, Fragment } from 'react';
import { NavLink, withRouter, Switch, Route } from "react-router-dom";
import { NavItem } from "./Navigation";
import history from "../../../utils/history";
import actions from "../../../store/actions/root";
import connect from "react-redux/es/connect/connect";
import "./Header.css";
import {getSessionTokenJson} from "../../../utils/api/apiHelper";
import loginForm from "./Login/Login";

class Header extends Component{
	handleNavClick=(route) => {
		history.push(route);
	};

	switchLanguage=() => {
		let lang = this.props.locale;
		lang = lang === 'zh' ? 'en' : 'zh';
		this.props.changeLanguage(lang);
	};

	render() {
		const rightMenu = getSessionTokenJson() !== null ? (
			<Fragment>
				<NavItem event={() => this.handleNavClick("/user/notification")} id={"notification"} />
			</Fragment>
		) : (
			<Fragment>
				<NavItem event={() => this.handleNavClick("/login")} id={"login"} />
				<NavItem event={() => this.handleNavClick("/signup")} id={"signup"} />
			</Fragment>
		);

		return(
			<Fragment>
				<table className="App-header-left">
					<tbody>
					<tr>
						<NavItem event={() => this.handleNavClick("/")} id={"home"} />
						<NavItem event={()=> this.handleNavClick("/about") } id={"about"} />
					</tr>
					</tbody>
				</table>
				<table className="App-header-right">
					<tbody>
						<tr>
							<NavItem event={() => this.switchLanguage() } id={"language"}/>
							{rightMenu}
						</tr>
					</tbody>
				</table>
				<Switch>
					<Route path="/login" exact component={loginForm} />
				</Switch>
			</Fragment>
		)
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
)(Header));
