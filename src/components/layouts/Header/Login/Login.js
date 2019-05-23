import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {Dialog} from "../../../accessories/Dialog";
import XHelmet from "../../../accessories/XHelmet";
import {FormattedMessage} from "react-intl";
import Text from "../../../accessories/Text";
import "./Login.css";
import history from "../../../../utils/history";
import {NavItem} from "../Navigation";

const handleCloseClick = (e) => {
	e.preventDefault();
	history.goBack();
};

const handleSignUpClick = (e) => {
	e.preventDefault();
	history.push("/signup");
};

const handleLoginSubmit = (e) => {
	e.preventDefault();
	return undefined;
};

const loginForm = (props) => {
	const loading = props.isLoading ? (
		<div>{""}</div>
	) : (
		<div>{""}</div>
	);
	return (
		<Fragment>
			<XHelmet title={"login"}/>
			<form className="login-form" onSubmit={(e)=>handleLoginSubmit(e)}>
				<Dialog titleTextId={"lgtitle"} event={handleCloseClick}>
					<tr>
						<td colSpan={2}>
							<FormattedMessage id={"lgip_1"}>
								{(text) => <input className={"text-input"} type="text" placeholder={text} />}
							</FormattedMessage>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<FormattedMessage id={"lgip_2"}>
								{(text) => <input className={"text-input"} type="password" placeholder={text} /> }
							</FormattedMessage>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<div className={"checkbox-text"}><Text id={"lgitxt_4"}/></div>
							<input className="keep-login-input" type="checkbox" />
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
						<td>
							<div className={"loading-icon"}>
								{loading}
							</div>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							<div className={"sign-btn-text"}><Text id={"lgi_txt_6"}/></div>
							<div className={"sign-btn"} onClick={e=>handleSignUpClick(e)}><Text id={"lgi_6"}/></div>
						</td>
					</tr>
				</Dialog>
			</form>
		</Fragment>
	);
};

export default withRouter(loginForm)
