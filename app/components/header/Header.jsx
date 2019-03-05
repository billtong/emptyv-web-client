import React from 'react';
import { Link } from 'react-router';
import { MdInput, MdEdit } from 'react-icons/md';
import logoURL from '../../../asset/empty-video-logo.gif';
import logoutApi from '../../api/postLogout';

class Header extends React.Component {
  renderRightMenuList = () => {
    const token = sessionStorage.getItem('empty-video-web-user-session');
    //console.log(token);
    //console.log(!token || token.length <= 0);
    return (!token || token.length <= 0) ?
      (
        <ul className="menu-right">
          <li className="desktop">
            <Link to="SignIn" activeClassName="active">
              <MdInput className="usr-icon-action" />Sign In
            </Link>
          </li>
          <li className="desktop">
            <Link to="SignUp" activeClassName="active">
              <MdEdit className="usr-icon-action" />Sign Up
            </Link>
          </li>
        </ul>
      ) : 
      (
        <ul className="menu-right">
          <li className="desktop">
            <Link to="UserPage" activeClassName="active">User Page</Link>
          </li>
          <li className="desktop">
            <Link to="/" activeClassName="active" onClick={this.logout.bind(this)}>Logout</Link>
          </li>
        </ul>
      );
  }

  renderLeftMenuList = () => (
    <ul className="menu-left">
      <li className="desktop">
        <Link to="/" activeClassName="active">Home</Link>
      </li>
      <li className="desktop">
        <Link to="Donate" activeClassName="active">Donate Us</Link>
      </li>
    </ul>
  );

  //这里如果改成es6的lamda格式，react会自己自动执行
  logout() {
    const userJSON = JSON.parse(sessionStorage.getItem('empty-video-web-user-session'));
    const inputJson = {
      sessionId: userJSON.userSessionId,
      userName: userJSON.user.userName,
      token: userJSON.userToken
    };
    logoutApi.logout(inputJson);
    sessionStorage.removeItem('empty-video-web-user-session');
  }

  render() {
    return (
      <div className="header-section">
        <nav role="navigation">
          <div className="logo-container">
            <Link to="/" activeClassName="active">
              <img width="20px" height="23px" src={logoURL} alt="logo" />
            </Link>
          </div>
          <div className="menu-container">
            {this.renderLeftMenuList()}
            {this.renderRightMenuList()}
          </div>
        </nav>
      </div>
    );
  }
}

module.exports = Header;
