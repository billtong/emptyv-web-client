import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { MdInput, MdEdit } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

import logoURL from '../../../asset/empty-video-logo.gif';
import logoutApi from '../../api/postLogout';
import { getVideoListAction } from '../../actions/getVideoListActions';

class Header extends React.Component {
  state = {
    isLoading: false,
    isBlur: true,
    isForcus: false
  }
  componentWillMount() {
    document.addEventListener('keypress', this.handleEnterKey);
  }

  componentDidMount() {
    document.removeEventListener('keypress', this.handleEenterKey);
  }

  logout = (e) => {
    e.preventDefault();
    const userJSON = JSON.parse(sessionStorage.getItem('empty-video-web-user-session'));
    const inputJson = {
      sessionId: userJSON.userSessionId,
      userName: userJSON.user.userName,
      token: userJSON.userToken
    };
    logoutApi.logout(inputJson).then(() => {
      sessionStorage.removeItem('empty-video-web-user-session');
      this.setState({ isLoading: false });
      hashHistory.push('/');
    });
    this.setState({ isLoading: true });
  }

  handleEnterKey=(e) => {
    if (e.keyCode === 13 && this.state.isForcus && !this.state.isBlur) {
      e.preventDefault();
      hashHistory.push('/');
      const inputJson = { 
        currPage: 1,
        sizes: 5,
        filter: 'date',
        word: this.refs.keyword.value
      };
      this.props.getVideoListAction(inputJson);
    }
  };

  handleClick=() => {
    const searchInputElement = document.getElementsByClassName('search-input')[0];
    if (searchInputElement.value !== '') {
      const inputJson = { 
        currPage: 1,
        sizes: 5,
        filter: 'date',
        word: undefined
      };
      this.props.getVideoListAction(inputJson);
      document.getElementsByClassName('search-input')[0].value = '';
    }
  }

  ifForcus=() => {
    this.setState(prevState => ({
      ...prevState,
      isForcus: true,
      isBlur: false
    }));
  }

  ifBlur=() => {
    this.setState(prevState => ({
      ...prevState,
      isForcus: false,
      isBlur: true
    }));
  }

  renderLeftMenuList = () => (
    <ul className="menu-left">
      <li className="desktop">
        <form className="searchBar">
          <input
            className="search-input"
            placeholder="press <ENTER> to search"
            ref="keyword"
            onKeyPress={e => (this.handleEnterKey(e))}
            onFocus={this.ifForcus}
            onBlur={this.ifBlur}
          />
        </form>
      </li>
      <li className="desktop">
        <Link to="/" className="header-menu" onClick={() => this.handleClick()}>
          Home
        </Link>
      </li>
      <li className="desktop">
        <Link to="Donate" className="header-menu">Donate Us</Link>
      </li>
    </ul>
  );

  renderRightMenuList = () => {
    const token = sessionStorage.getItem('empty-video-web-user-session');
    const loadingIcon = this.state.isLoading ? (
      <li className="desktop">
        <ClipLoader color={'#d9d9d9'} />
      </li>
    ) : null;
    return (!token || token.length <= 0) ?
      (
        <ul className="menu-right">
          <li className="desktop">
            <Link to="SignIn" className="header-menu">
              <MdInput className="usr-icon-action" />Sign In
            </Link>
          </li>
          <li className="desktop">
            <Link to="SignUp" className="header-menu">
              <MdEdit className="usr-icon-action" />Sign Up
            </Link>
          </li>
        </ul>
      ) : 
      (
        <ul className="menu-right">
          <li className="desktop">
            <Link to="UserPage" className="header-menu">
              User Page
            </Link>
          </li>
          <li className="desktop">
            <div to="/" className="header-menu" onClick={e => this.logout(e)}>
              Logout
            </div>
          </li>
          {loadingIcon}
        </ul>
      );
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

const mapStateToProps = (state) => (state);

module.exports = connect(
  mapStateToProps, { getVideoListAction }
)(Header);
