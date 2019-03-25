import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { MdInput, MdEdit, MdSearch } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import { logout } from '../../api/user';
import { getVideoListAction } from '../../actions/getVideoListActions';
import { getUserHistoryAction } from '../../actions/getUserHistoryAction';

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

  logout = (e) => {
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

  //handle restart conditions
  handleMenuClick=(e, to) => {
    const url = document.location.toString().split('#')[1];
    if (url === to && to === '/') {
      this.props.getVideoListAction({
        currPage: 1,
        sizes: this.props.sizes,
        filter: 'date',
      });
    }
    if (url === `/${to}`) {
      if (to === 'UserPage') {
        location.reload();
      }
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
      isBlur: true,
      isSearch: false
    }));
  }

  renderLeftMenuList = () => {
    const searchSec = !this.state.isSearch ? (
      <div
        className="search-btn"
        onClick={e => {
          e.preventDefault();
          this.setState(prevState => ({
            ...prevState,
            isSearch: true
          }));
        }}
      >
        <MdSearch color={'#d9d9d9'} />
      </div>
    ) : (
      <form className="searchBar">
        <input
          className="search-input"
          placeholder="press <ENTER> to search"
          ref="keyword"
          onKeyPress={e => (this.handleEnterKey(e))}
          autoFocus="true"
          onFocus={this.ifForcus}
          onBlur={this.ifBlur}
        />
      </form>
    );
    return (
    <ul className="menu-left">
      <li className="desktop">
        <Link to="/" className="header-menu" onClick={(e) => this.handleMenuClick(e, '/')}>
          Home
        </Link>
      </li>
      <li className="desktop">
        <Link to="About" className="header-menu" onClick={(e) => this.handleMenuClick(e, 'About')}>About Us</Link>
      </li>
      <li className="desktop">
       {searchSec}
      </li>
    </ul>
  );
  }

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
            <Link to="SignIn" className="header-menu" onClick={(e) => this.handleMenuClick(e, 'SignIn')}>
              <MdInput className="usr-icon-action" />Sign In
            </Link>
          </li>
          <li className="desktop">
            <Link to="SignUp" className="header-menu" onClick={(e) => this.handleMenuClick(e, 'SignUp')}>
              <MdEdit className="usr-icon-action" />Sign Up
            </Link>
          </li>
        </ul>
      ) :
      (
        <ul className="menu-right">
          <li className="desktop">
            <Link to="UserPage" className="header-menu" onClick={(e) => this.handleMenuClick(e, 'UserPage')}>
              User Page
            </Link>
          </li>
          <li className="desktop">
            <div to="/" className="header-menu" onClick={(e) => this.logout(e)}>
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

export default connect(
  mapStateToProps, { getVideoListAction, getUserHistoryAction }
)(Header);
