import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import Text from "../../components/accessories/Text";
import XHelmet from "../../components/accessories/XHelmet";

class Home extends Component{
    render() {
        return(
            <Fragment>
                <XHelmet title={"Empty Video"} />
                <div>Home</div>
            </Fragment>
        )
    }
}

export default withRouter(Home)
