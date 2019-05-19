import React, {Component, Fragment} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import Text from "../../components/accessories/Text";
import XHelmet from "../../components/accessories/XHelmet";

class Home extends Component{
    render() {
        return(
            <Fragment>
                <XHelmet title={"Home"} />
                <h3><Text id={"home"}/></h3>
                <NavLink to={"/404"}>Go NotFound</NavLink>
                <br/>
            </Fragment>
        )
    }
}

export default withRouter(Home)
