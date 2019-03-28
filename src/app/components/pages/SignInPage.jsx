import React from 'react';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { signInAction } from '../../actions/SignInActions.jsx';


class SignIn extends React.Component {
  state = {
    signInError: undefined
  }

  componentWillReceiveProps=(nextProps) => {
    if(nextProps.signInError !== this.props.signInError) {
      this.setState({ signInError: nextProps.signInError });
    }
  }

  onSubmit = (e) => {
    const {username, password } = this.refs;
    const checkNull = (item, itemName) => {
      if (!item || item === null || item === '' || (typeof item === 'string' && item.trim().length === 0)) {
        this.setState({
          signInError: `${itemName} can't be null`
        });  
        return true;
      }
      return false;
    };
    if (checkNull(username.value, 'username')) {
      return;
    } 
    if (checkNull(password.value, 'password')) {
      return;
    }

    const inputJson = {
      userName: this.refs.username.value,
      userPassword: this.refs.password.value
    };
    e.preventDefault();
    this.props.signInAction(inputJson);
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {
    const loadingIcon = this.props.isSignInLoading ? (
      <div className="loader">
        <RingLoader color={'#d9d9d9'} />
      </div>
    ) : null;
    const errText = (this.state.signInError === undefined) ?
      null : (
      <div className="error">
        <div className="badge badge-danger">
          {this.state.signInError}
        </div>
      </div>
    );

    return (
      <div className="sign-section">
        <p className="sign-title">
          welcome home!
        </p>
        <form className="sign-form" onSubmit={e => this.onSubmit(e)}>
          <input
            id="exampleInputUsername1"
            aria-describedby="usernameHelp"
            placeholder="Enter Username"
            ref="username"
          />
          <input
            type="password"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            ref="password"
          />
          <div className="sign-btn-section">
            <input type="submit" className="btn btn-primary" value="Sign In" />
          </div>
          {loadingIcon}
          {errText}
        </form>
      </div>
    );
  }

}

const mapStateToProps = ({ signInReducer }) => {
  const { isSignInLoading, signInError } = signInReducer;
  return { isSignInLoading, signInError };
};

export default connect(
  mapStateToProps, { signInAction }
)(SignIn);
