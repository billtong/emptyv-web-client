import React, {Component, Fragment} from "react";
import XHelmet from "../../../components/accessories/XHelmet";
import {withRouter} from "react-router-dom";

class NotificationPage extends Component {
    render() {
        return (
            <Fragment>
                <XHelmet title={"Notification"}/>
                <div>Notification</div>
            </Fragment>
        )
    }
}

export default withRouter(NotificationPage)
