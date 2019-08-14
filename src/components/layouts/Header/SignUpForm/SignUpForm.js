import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import history from "../../../../utils/history";
import XHelmet from "../../../accessories/XHelmet";
import {getToken, postRegister} from "../../../../utils/api/user";
import {userTokenSessionKey} from "../../../../utils/api/apiHelper";
import {Dialog} from "../../../accessories/Dialog";

import '../LoginForm/LoginForm.css';

class SignUpForm extends Component {

    state = {
        isLoading: false,
        resMessage: null,
        error: null,
    };

    handleCloseClick = (e) => {
        e.preventDefault();
        history.push("/");
    };

    handleSignupSubmit = (e) => {
        e.preventDefault();
        const {email, username, password1, password2} = this.refs;
        const checkNull = (item, itemName) => {
            if (!item || item === '' || (typeof item === 'string' && item.trim().length === 0)) {
                this.setState({
                    error: `${itemName} can't be null`
                });
                return true;
            }
            return false;
        };
        if (password1.value !== password2.value) {
            this.setState({
                error: 'password not the same'
            });
            return;
        }
        if (!checkNull(email.value, 'email') && !checkNull(username.value, 'username') && !checkNull(password1.value, 'password')) {
            this.setState({
                isLoading: true,
            });
            postRegister({
                userName: username.value,
                userPassword: password1.value,
                userEmail: email.value
            }).then((res) => {
                this.setState({
                    resMessage: `${res.data.message}, auto login...`,
                });
                const timer = setTimeout(() => {
                    getToken({
                        email: email.value,
                        password: password1.value,
                    }).then((res) => {
                        const userJson = {
                            user: res.data,
                            userToken: res.headers.authorization,
                            userSessionId: ""
                        };
                        sessionStorage.setItem(userTokenSessionKey, JSON.stringify(userJson));
                        history.push("/");
                    }).catch((err) => {
                        this.setState({
                            error: `Sign in Failed: ${err.message}`,
                        });
                    });
                    clearTimeout(timer);
                }, 500);
            }).catch((err) => {
                this.setState({
                    error: err.message,
                });
            }).finally(() => {
                this.setState({
                    isLoading: false,
                });
            })
        }
    };

    render = () => {
        const loadingIcon = this.state.isLoading ? (
            <div className="loader">
                loading ...
            </div>
        ) : null;
        const errorMessage = this.state.error ? (
            <div>{this.state.error}</div>
        ) : null;
        const rsltMessage = this.state.resMessage ? (
            <div>{this.state.resMessage}</div>
        ) : null;
        return (
            <Fragment>
                <XHelmet title={"join us today!"}/>
                <form className="sign-form" onSubmit={e => this.handleSignupSubmit(e)}>
                    <Dialog titleTextId={"sutitle"} event={this.handleCloseClick}>
                        <tr>
                            <td colSpan={2}>
                                <input
                                    className={"text-input"}
                                    type="email"
                                    id="exampleInputname1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    ref="email"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input
                                    className={"text-input"}
                                    type="text"
                                    id="exampleInputUsername1"
                                    placeholder="Enter Username"
                                    ref="username"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input
                                    className={"text-input"}
                                    type="password"
                                    id="exampleInputPassword1"
                                    placeholder="Enter Password"
                                    ref="password1"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input
                                    className={"text-input"}
                                    type="password"
                                    id="exampleInputPassword2"
                                    placeholder="Confirm Password"
                                    ref="password2"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className={"loading-icon"}>
                                    {loadingIcon}
                                    {errorMessage}
                                    {rsltMessage}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="sign-btn-section">
                                    <input
                                        type="submit"
                                        className={"submit-input"}
                                        value="Sign Up"/>
                                </div>
                            </td>
                        </tr>
                    </Dialog>
                </form>
            </Fragment>
        );
    }

}

export default withRouter(SignUpForm);