import React from 'react';
import {connect} from 'react-redux';
import {BarLoader} from 'react-spinners';
import {signUpAction} from '../../actions/SignUpActions.jsx';

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
        const inputJson = {
            userName: this.refs.username.value,
            userPassword: this.refs.password.value,
            userEmail: this.refs.email.value
        };
        e.preventDefault();

        this.props.signUpAction(inputJson);
    }

    render() {
        const loadingIcon = this.props.isLoading ? <BarLoader color={'#000000'}/> : null;
        const rsltMessage = (this.props.rslt === undefined) ?
            null : (
                <div className="badge">
                    {this.props.rslt}
                </div>
            );

        return (
                <div className="sign-up-section">
                    <form className="sign-up-form" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <div className="user-mail-section">Email</div>
                            <div>
                                <input
                                    className="form-control"
                                    id="exampleInputname1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    ref="email"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="user-name-section">Username</div>
                            <div>
                                <input
                                    className="form-control"
                                    id="exampleInputUsername1"
                                    aria-describedby="usernameHelp"
                                    placeholder="Enter Username"
                                    ref="username"/>
                            </div>

                        </div>

                        <div className="form-group">
                            <div className="user-password-section">Password</div>
                            <div>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Enter Password"
                                    ref="password"/>
                            </div>
                        </div>
                        <div className="signup-btn-section">
                            <button type="submit" className="btn btn-primary signin-btn">Sign In</button>
                        </div>

                        <div className="loader"> {loadingIcon} </div>
                        {rsltMessage}
                    </form>
                </div>

        );
    }

}

const mapStateToProps = ({signUp}) => {
    const {isLoading, rslt} = signUp;
    return {isLoading, rslt};
};

module.exports = connect(
    mapStateToProps, {signUpAction}
)(SignUp);
