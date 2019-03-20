import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { MdInput, MdEdit, MdSearch } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';

import logoURL from '../../../asset/empty-video-logo.gif';
import { logout } from '../../api/user';
import { getVideoListAction, startGetVideos } from '../../actions/getVideoListActions';

class Header extends React.Component {
  state = {
    isLoading: false,
    isBlur: true,
    isForcus: false,
    isSearch: false,
  }
  componentWillMount() {
    document.addEventListener('keypress', this.handleEnterKey);
  }

  componentDidMount() {
    document.removeEventListener('keypress', this.handleEenterKey);
  }

  logout = (e, isHome) => {
    this.handleMenuClick(e, isHome);
    const userJSON = JSON.parse(sessionStorage.getItem('empty-video-web-user-session'));
    const inputJson = {
      sessionId: userJSON.userSessionId,
      userName: userJSON.user.userName,
      token: userJSON.userToken
    };
    logout(inputJson).then(() => {
      sessionStorage.removeItem('empty-video-web-user-session');
      this.setState({ isLoading: false });
      hashHistory.push('/');
    }).catch(() => {
      alert('logout failed');
    });
    this.setState({ isLoading: true });
  }

  handleEnterKey=(e) => {
    if (e.keyCode === 13 && this.state.isForcus && !this.state.isBlur) {
      e.preventDefault();
      hashHistory.push('/');
      this.props.getVideoListAction({ 
        currPage: this.props.currPage,
        sizes: this.props.sizes,
        filter: this.props.filter,
        word: this.refs.keyword.value,
      });
    }
  };

  //点击home见刷新videolist
  handleMenuClick=(e, isRemainVideoList) => {
    this.refs.keyword.value = '';
    if (isRemainVideoList) {
      this.forceUpdate();
    } else {
      this.props.startGetVideos(this.props.filter, this.props.currPage, undefined, this.props.sizes);
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
        <Link to="/" className="header-menu" onClick={(e) => this.handleMenuClick(e, true)}>
          Home
        </Link>
      </li>
      <li className="desktop">
        <Link to="About" className="header-menu" onClick={(e) => this.handleMenuClick(e, false)}>About Us</Link>
      </li>
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
            <Link to="SignIn" className="header-menu" onClick={(e) => this.handleMenuClick(e, false)}>
              <MdInput className="usr-icon-action" />Sign In
            </Link>
          </li>
          <li className="desktop">
            <Link to="SignUp" className="header-menu" onClick={(e) => this.handleMenuClick(e, false)}>
              <MdEdit className="usr-icon-action" />Sign Up
            </Link>
          </li>
        </ul>
      ) : 
      (
        <ul className="menu-right">
          <li className="desktop" onClick={(e) => this.handleMenuClick(e, true)}>
            <Link to="UserPage" className="header-menu">
              User Page
            </Link>
          </li>
          <li className="desktop">
            <div to="/" className="header-menu" onClick={(e) => this.logout(e, true)}>
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
          <div className="menu-container">
            {this.renderLeftMenuList()}
            {this.renderRightMenuList()}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ getVideoListReducer }) => {
  const { filter, currPage, sizes } = getVideoListReducer;
  return { filter, currPage, sizes };
};

module.exports = connect(
  mapStateToProps, { getVideoListAction, startGetVideos }
)(Header);
