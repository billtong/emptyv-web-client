import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import Text from "../../../components/accessories/Text";
import XHelmet from "../../../components/accessories/XHelmet";

class SignUpPage extends Component{
	render() {
		return(
			<Fragment>
				<XHelmet title={"Sign Up"} />
				<div>SignUp</div>
			</Fragment>
		)
	}
}

export default withRouter(SignUpPage)
