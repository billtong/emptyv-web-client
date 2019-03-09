import React from 'react';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { signUpAction } from '../../actions/SignUpActions.jsx';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        isLoading: false,
        rslt: undefined,
    };
  }

  componentWillMount() {
  }

  onSubmit(e) {
    const { email, username, password1, password2 } = this.refs;
    const inputJson = {
      userName: username.value,
      userPassword: password1.value,
      userEmail: email.value
    };
    e.preventDefault();
    this.props.signUpAction(inputJson);
    email.value = '';
    username.value = '';
    password1.value = '';
    password2.value = '';
  }

  render() {
      const loadingIcon = this.props.isLoading ? (
        <div className="loader">
          <RingLoader color={'#d9d9d9'} /> 
        </div>
      ) : null;
      const rsltMessage = (this.props.rslt === undefined) ? null : 
        (
          <div className="error">
            <div className="badge badge-danger">
              {this.props.rslt}
            </div>
          </div>
        );

    return (
      <div className="sign-section">
        <p className="sign-title">
          Start your journey at Empty Video Today!
        </p>
        <form className="sign-form" onSubmit={this.onSubmit}>
          <input
            id="exampleInputname1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref="email" 
          />
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
            ref="password1" 
          />
           <input
            type="password"
            id="exampleInputPassword1"
            placeholder="Confirm Password"
            ref="password2" 
          />
          <div className="sign-btn-section">
            <input type="submit" className="btn btn-primary" value="Sign Up" />
          </div>
          {loadingIcon} 
          {rsltMessage}
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ signUp }) => {
    const { isLoading, rslt } = signUp;
    return { isLoading, rslt };
};

module.exports = connect(
    mapStateToProps, { signUpAction }
)(SignUp);
