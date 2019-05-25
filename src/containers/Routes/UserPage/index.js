import React, { Fragment, Component } from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import UserPage from "./UserPage";
import NotificationPage from "../NotificationPage/NotificationPage";
import SettingPage from "../SettingPage/SettingPage";
import MessagePage from "../MessagePage";
import NotFound from "../NotFound";

class  UserRouter extends Component {
	render = () => {
		return (
			<Fragment>
				<switch>
					<Route path="/user" exact/>
					<Route path="/user/:id" component={UserPage}/>
					<Route path="/user/notification" component={NotificationPage} />
					<Route path="/user/setting" component={SettingPage} />
					<Route path="/user/message" component={MessagePage} />
				</switch>
			</Fragment>
		);
	}
}

export default withRouter(UserRouter);
