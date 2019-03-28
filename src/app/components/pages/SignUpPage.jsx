import React from 'react';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { signUpAction } from '../../actions/SignUpActions.jsx';


class SignUp extends React.Component {
  state = {
    error: undefined
  };

  componentWillReceiveProps = (nextProps) => {
   if(!nextProps.error) {
      this.setState({
        error: nextProps.error
      });
    }
  }

  componentWillUnmount=() => {
    const { email, username, password1, password2 } = this.refs;
    email.value = '';
    username.value = '';
    password1.value = '';
    password2.value = '';
  }

  onSubmit=(e) => {
    e.preventDefault();
    const { email, username, password1, password2 } = this.refs;
    const checkNull = (item, itemName) => {
      if (!item || item === null || item === '' || (typeof item === 'string' && item.trim().length === 0)) {
        this.setState({
          error: `${itemName} can't be null`
        });  
        return true;
      }
      return false;
    };
    if (checkNull(email.value, 'email')) {
      return;
    }
    if (checkNull(username.value, 'username')) {
      return;
    } 
    if (checkNull(password1.value, 'password')) {
      return;
    }
    if(password1.value !== password2.value) {
      this.setState({
        error: 'confirm password is not same as the password'
      });  
      return;
    }
    const inputJson = {
      userName: username.value,
      userPassword: password1.value,
      userEmail: email.value
    };
    this.props.signUpAction(inputJson);
  }

  render() {
    const loadingIcon = this.props.isLoading ? (
      <div className="loader">
        <RingLoader color={'#d9d9d9'} />
      </div>
    ) : null;

    let rsltMessage = null;
    if(this.props.rslt) {
      rsltMessage =  (
        <div className="error">
          <div className="badge">
            {this.props.rslt}
          </div>
        </div>
      );
    } else if(this.state.error) {
      rsltMessage =  (
        <div className="error">
          <div className="badge badge-danger">
            {this.state.error}
          </div>
        </div>
      );
    }
    return (
      <div className="sign-section">
        <p className="sign-title">
          Start your journey at Empty Video Today!
        </p>
        <form className="sign-form" onSubmit={e => this.onSubmit(e)}>
          <input
            id="exampleInputname1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref="email"
          />
          <input
            id="exampleInputUsername1"
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
            id="exampleInputPassword2"
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

const mapStateToProps = ({ signUpReducer }) => {
    const { isLoading, rslt, error } = signUpReducer;
    return { isLoading, rslt, error };
};

export default connect(
    mapStateToProps, { signUpAction }
)(SignUp);
