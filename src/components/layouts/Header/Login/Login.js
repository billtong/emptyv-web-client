import React, {Fragment, Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Dialog} from "../../../accessories/Dialog";
import XHelmet from "../../../accessories/XHelmet";
import {FormattedMessage} from "react-intl";
import Text from "../../../accessories/Text";
import "./Login.css";
import history from "../../../../utils/history";
import {connect} from "react-redux";
import {signInAction} from "../../../../store/actions/SignInAction";

class LoginForm extends Component{
	state = {
		signInError: undefined
	};

	componentWillReceiveProps=(nextProps) => {
		if(nextProps.signInError !== this.props.signInError) {
			this.setState({ signInError: nextProps.signInError });
		}
	}

	handleCloseClick = (e) => {
		e.preventDefault();
		history.goBack();
	};

	handleSignUpClick = (e) => {
		e.preventDefault();
		history.push("/signup");
	};

	handleLoginSubmit = (e) => {
		e.preventDefault();
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;
		let checked = this.refs['isKeepLogin'].checked;
		const checkNull = (item, itemName) => {
			if (!item || item === null || item === '' || (typeof item === 'string' && item.trim().length === 0)) {
				this.setState({
					signInError: `${itemName} can't be null`
				});
				return true;
			}
			return false;
		};
		if (checkNull(username, 'username')) {
			return;
		} else if (checkNull(password, 'password')) {
			return;
		} else {
			const inputJson = {
				userName: username,
				userPassword: password,
				isKeepLogin: checked
			};
			this.props.signInAction(inputJson);
			username = '';
			password = '';
			checked = false;
		}
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
				<form className="login-form" onSubmit={(e)=>this.handleLoginSubmit(e)}>
					<Dialog titleTextId={"lgtitle"} event={this.handleCloseClick}>
						<tr>
							<td colSpan={2}>
								<FormattedMessage id={"lgip_1"}>
									{(text) => <input className={"text-input"} type="text" placeholder={text} id={"username"} />}
								</FormattedMessage>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<FormattedMessage id={"lgip_2"}>
									{(text) => <input className={"text-input"} type="password" placeholder={text} id={"password"} /> }
								</FormattedMessage>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<div className={"checkbox-text"}><Text id={"lgitxt_4"}/></div>
								<input className="keep-login-input" type="checkbox" ref={"isKeepLogin"} />
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<div className={"warning-info"}><Text id={"lgitxt_5"}/></div>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>
								<FormattedMessage id={"lgi_3"}>
									{(text) => <input className={"submit-input"} type="submit" value={text}/>}
								</FormattedMessage>
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
								<div className={"sign-btn"} onClick={e=>this.handleSignUpClick(e)}><Text id={"lgi_6"}/></div>
							</td>
						</tr>
					</Dialog>
				</form>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ signInReducer }) => {
	const { isSignInLoading, signInError } = signInReducer;
	return { isSignInLoading, signInError };
};

export default  withRouter(connect(
	mapStateToProps, { signInAction }
)(LoginForm));

