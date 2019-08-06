import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import {Dialog} from "../../../accessories/Dialog.js";
import XHelmet from "../../../accessories/XHelmet.js";
import Text from "../../../accessories/Text.js";
import "./LoginForm.css";
import history from "../../../../utils/history.js";
import {getToken} from "../../../../utils/api/user.js";
import {setCookie} from "../../../../utils/cookieTools.js";
import {userTokenCookieKey, userTokenSessionKey} from "../../../../utils/api/apiHelper.js";

class LoginForm extends Component {
	state = {
		signInError: undefined
	};

	handleCloseClick = (e) => {
		e.preventDefault();
		history.go(-1);
	};

	handleSignUpClick = (e) => {
		e.preventDefault();
		history.push("/signup");
	};

	handleLoginSubmit = (e) => {
		e.preventDefault();
		let email = document.getElementById("login-email").value;
		let password = document.getElementById("login-password").value;
		let checked = this.refs['isKeepLogin'].checked;
		const checkNull = (item, itemName) => {
			if (!item || item === '' || (typeof item === 'string' && item.trim().length === 0)) {
				this.setState({
					signInError: `${itemName} can't be null`
				});
				return true;
			}
			return false;
		};
		if (!checkNull(email, 'email') && !checkNull(password, 'password')) {
			getToken({
				email: email,
				password: password,
			}).then((res) => {
				const userJson = {
					user: res.data,
					userToken: res.headers.authorization,
					userSessionId: ""
				};
				if (checked) {
					setCookie(userTokenCookieKey, JSON.stringify(userJson));
				} else {
					sessionStorage.setItem(userTokenSessionKey, JSON.stringify(userJson));
				}
				history.go(-1);
			}).catch((err) => {
				this.setState({
					signInError: `Sign in Failed: ${err.message}`,
				});
			});
		}
		email = '';
		password = '';
		checked = false;
	};

	render = () => {
		const loading = this.props.isSignInLoading ? (
			<div>loading...</div>
		) : null;
		const errMsg = this.state.signInError ? (
			<div>{this.state.signInError}</div>
		) : null;
		return (
			<Fragment>
				<XHelmet title={"login"}/>
				<form className="login-form" onSubmit={(e) => this.handleLoginSubmit(e)}>
					<Dialog titleTextId={"lgtitle"} event={this.handleCloseClick}>
						<tr>
							<td colSpan={2}>
								<Text id={"lgip_1"} children={(text) => <input className={"text-input"} type="text" placeholder={text}
								                                               id={"login-email"}/>}/>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<Text id={"lgip_2"}
								      children={(text) => <input className={"text-input"} type="password" placeholder={text}
								                                 id={"login-password"}/>}/>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<div className={"checkbox-text"}><Text id={"lgitxt_4"}/></div>
								<input className="keep-login-input" type="checkbox" ref={"isKeepLogin"}/>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<div className={"warning-info"}><Text id={"lgitxt_5"}/></div>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<Text id={"lgi_3"} children={(text) => <input className={"submit-input"} type="submit" value={text}/>}/>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<div className={"loading-icon"}>
									{loading}
									{errMsg}
								</div>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<div className={"sign-btn-text"}><Text id={"lgi_txt_6"}/></div>
								<div className={"sign-btn"} onClick={e => this.handleSignUpClick(e)}><Text id={"lgi_6"}/></div>
							</td>
						</tr>
					</Dialog>
				</form>
			</Fragment>
		);
	};
}

export default withRouter(LoginForm);
