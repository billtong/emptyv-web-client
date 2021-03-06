import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {NavItem} from "../../accessories/Navigation";
import history from "../../../utils/history";
import actions from "../../../store/actions/ChangeLanguageAction";
import connect from "react-redux/es/connect/connect";
import Selector from "../../accessories/Selector";
import "./Header.css";
import {logout} from "../../../utils/api/user"
import {getSessionTokenJson, userTokenCookieKey, userTokenSessionKey} from "../../../utils/api/apiHelper";
import {deleteCookie} from "../../../utils/cookieTools";

const rightUserMenus = ["dashboard", "message", "setting", "logout"];

class Header extends Component {
    handleNavClick = (route) => {
        history.push(route);
    };

    switchLanguage = () => {
        let lang = this.props.locale;
        lang = lang === 'zh' ? 'en' : 'zh';
        this.props.changeLanguage(lang);
    };

    handleUserMenuClick = (value) => {
        switch (value) {
            case rightUserMenus[0]:
                this.handleNavClick(`/user/dashboard/${getSessionTokenJson().user.id}`);
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
                }).finally(() => {
                    deleteCookie(userTokenCookieKey);
                    sessionStorage.removeItem(userTokenSessionKey);
                    //delete all the redux
                    window.location.reload();
                    this.handleNavClick("/");
                });
                break;
            default:
                break;
        }
    }

    render() {
        const rightMenu = getSessionTokenJson() !== null ? (
            <Fragment>
                <NavItem event={() => this.handleNavClick("/user/notification")} id={"notification"}/>
                <Selector
                    title={(
                        <div className="userMenuButton">
                            <div className="user-name">{getSessionTokenJson().user.profile.name}</div>
                        </div>
                    )}
                    options={rightUserMenus}
                    passFatherState={this.handleUserMenuClick}
                />
            </Fragment>
        ) : (
            <Fragment>
                <NavItem event={() => this.handleNavClick("/login")} id={"login"}/>
                <NavItem event={() => this.handleNavClick("/signup")} id={"signup"}/>
            </Fragment>
        );

        return (
            <Fragment>
                <div className="App-header-left">
                    <NavItem event={() => this.handleNavClick("/")} id={"home"}/>
                </div>
                <div className="App-header-right">
                    <NavItem event={() => this.switchLanguage()} id={"language"}/>
                    <NavItem event={() => this.handleNavClick("/about")} id={"about"}/>
                    {rightMenu}
                </div>
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
