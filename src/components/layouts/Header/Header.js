import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { NavItem } from "../../accessories/Navigation";
import history from "../../../utils/history";
import actions from "../../../store/actions/ChangeLanguageAction";
import connect from "react-redux/es/connect/connect";
import Selector from "../../accessories/Selector";
import "./Header.css";
import { logout } from "../../../utils/api/user"
import {getSessionTokenJson, userTokenSessionKey, userTokenCookieKey} from "../../../utils/api/apiHelper";
import { deleteCookie } from "../../../utils/cookieTools";
const rightUserMenus = ["dashboard", "message", "setting", "logout"];

class Header extends Component{
	handleNavClick=(route) => {
		history.push(route);
	};

	switchLanguage=() => {
		let lang = this.props.locale;
		lang = lang === 'zh' ? 'en' : 'zh';
		this.props.changeLanguage(lang);
	};

	handleUserMenuClick = (value) => {
		switch(value){
			case rightUserMenus[0]:
				this.handleNavClick(`/user/dashboard/${getSessionTokenJson().user.userId}`);
				break;
			case rightUserMenus[1]:
				this.handleNavClick("/user/message");
				break;
			case rightUserMenus[2]:
				this.handleNavClick("/user/setting");
				break;
			case rightUserMenus[3]:
				const userJSON = getSessionTokenJson();
				logout({
					sessionId: userJSON.userSessionId,
					userName: userJSON.user.userName,
					token: userJSON.userToken
				}).finally(()=>{
					deleteCookie(userTokenCookieKey);
					sessionStorage.removeItem(userTokenSessionKey);
					this.handleNavClick("/");
				});
				break;
		}
	}

	render() {
		const rightMenu = getSessionTokenJson() !== null ? (
			<Fragment>
				<NavItem event={() => this.handleNavClick("/user/notification")} id={"notification"} />
				<div className={"selector-contaienr"}>
					<Selector
						title={(
							<div className="userMenuButton">
								<img width="30" heigh="30" src={getSessionTokenJson().user.userIcon}/>
								<div className="user-name">{getSessionTokenJson().user.userName}</div>
							</div>
						)} 
						options={rightUserMenus} 
						passFatherState={this.handleUserMenuClick}
					/>
				</div>
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
			</Fragment>
		)
	}
}

const mapStateToProps = (state, ...ownProps) => ({
	locale: state.changeLanguageReducer.language,
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
