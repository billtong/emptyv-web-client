import React from 'react';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { signInAction } from '../../actions/SignInActions.jsx';


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      isLoading: false,
      error: undefined,
    };
  }

  onSubmit(e) {
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
    const loadingIcon = this.props.isLoading ? (
      <div className="loader">
        <RingLoader color={'#d9d9d9'} />
      </div>
    ) : null;
    const errText = (this.props.error === undefined) ?
      null : (
        <div className="error">
          <div className="badge badge-danger">
            {this.props.error}
          </div>
        </div>
      );

    return (
      <div className="sign-section">
        <p className="sign-title">
          welcome home!
        </p>
        <form className="sign-form" onSubmit={this.onSubmit}>
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
  const { isLoading, error } = signInReducer;
  return { isLoading, error };
};

export default connect(
  mapStateToProps, { signInAction }
)(SignIn);
