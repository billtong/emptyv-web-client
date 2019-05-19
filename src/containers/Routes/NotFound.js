import React, {Component, Fragment} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import Text from "../../components/accessories/Text";
import XHelmet from "../../components/accessories/XHelmet";

class NotFound extends Component{
    render() {
        return(
            <Fragment>
                <XHelmet title={"Not Found"} />
                <h3><Text id={"notfound"}/></h3>
                <NavLink to={"/"}>Go Home</NavLink>
                <br/>
            </Fragment>
        )
    }
}

export default withRouter(NotFound)
