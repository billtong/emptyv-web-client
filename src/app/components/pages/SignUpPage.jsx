import React from 'react';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { signUpAction } from '../../actions/SignUpActions.jsx';


class SignUp extends React.Component {
  state = {
    rslt: this.props.rslt,
    isError: true
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      rslt: nextProps.rslt
    });  
  }


  onSubmit(e) {
    const { email, username, password1, password2 } = this.refs;
    const checkNull = (item, itemName) => {
      console.log(item);
      if (!item || item === null || item === '' || (typeof item === 'string' && item.trim().length === 0)) {
        this.setState({
          rslt: `${itemName} can't be null`,
          isError: false
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
        rslt: 'confirm password is not same as the password',
        isError: false
      });  
      return;
    }
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

    let rsltMessage = null;
    if(this.state.rslt !== undefined) {
      if(this.state.isError) {
        rsltMessage =  (
          <div className="error">
            <div className="badge badge-danger">
              {this.state.rslt}
            </div>
          </div>
        );
      } else {
        rsltMessage =  (
          <div className="error">
            <div className="badge">`
              {this.state.rslt}
            </div>
          </div>
        );
      }
    }
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
            id="exampleInputPassword2"
            placeholder="Confirm Password"n
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
    const { isLoading, rslt } = signUpReducer;
    return { isLoading, rslt };
};

export default connect(
    mapStateToProps, { signUpAction }
)(SignUp);
