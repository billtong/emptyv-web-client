import React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
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
    }

    render() {
        const loadingIcon = this.props.isLoading ? <BarLoader color={'#000000'} /> : null;
        const errText = (this.props.error === undefined) ?
            null : (
                <div className="badge badge-danger">
                    {this.props.error}
                </div>
            );

        return (
                <div className="sign-in-section">
                    <div>
                        <form className="sign-in-form" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="user-name-section">Username</div>
                                <div>
                                    <input
                                        className="form-control"
                                        id="exampleInputUsername1"
                                        aria-describedby="usernameHelp"
                                        placeholder="Enter Username"
                                        ref="username"
                                    />
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
                                        ref="password"
                                    />
                                </div>
                            </div>

                            <div className="signin-btn-section">
                                <button type="submit" className="btn btn-primary signin-btn">Sign In</button>
                            </div>

                            <div className="loader" > {loadingIcon} </div>

                        </form>
                    </div>
                    {errText}
                </div>
        );
    }

}

const mapStateToProps = ({ signIn }) => {
    const { isLoading, error } = signIn;
    return { isLoading, error };
};

module.exports = connect(
    mapStateToProps, { signInAction }
)(SignIn);
