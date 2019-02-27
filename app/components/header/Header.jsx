import React from 'react';
import {hashHistory, Link} from 'react-router';

import logoURL from '../../../asset/test-logo.jpg'

class Header extends React.Component {

    render() {

        //check cookie
        const token = sessionStorage.getItem('emptyVideoLoginToken');
        //判断token字符串是否为空
        const userSection = (token === undefined || token == null || token.length <= 0) ?
            <div className="before-user-section">
                <div className="sign-in-btn-section">
                    <Link to="SignIn">Sign In</Link>
                </div>
                <div className="sign-up-btn-section">
                    <Link to="SignUp">Sign Up</Link>
                </div>
            </div>
            :
            <div className="after-user-section">
                <div className="user-page-btn-section">
                    <button className="user-page-btn" onClick={() => {
                        hashHistory.push('UserPage');
                    }}>user page
                    </button>
                </div>
                <div className="log-out-btn-section">
                    <button className="log-out-btn" onClick={() => {
                        sessionStorage.removeItem('emptyVideoLoginToken');
                        location.reload();
                    }}>log out
                    </button>
                </div>

            </div>;

        return (
            <div className="header-section">
                <div className="logo-section" onClick={() => {
                    hashHistory.push('/');
                }}>
                    <img className="logo-img" width="100" height="100" src={logoURL}/>
                    <div className="logo-text">EMPTY VIDEO</div>
                </div>

                <div className="donate-section" onClick={()=>{
                    hashHistory.push("Donate");
                }}>
                   Donate Us!
                </div>


                <div className="user-section">
                    {userSection}
                </div>
            </div>
        );
    }
}

module.exports = Header;
