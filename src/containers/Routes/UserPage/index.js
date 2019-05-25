import React, { Fragment, Component } from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import UserPage from "./UserPage";
import NotificationPage from "../NotificationPage/NotificationPage";
import SettingPage from "../SettingPage/SettingPage";
import MessagePage from "../MessagePage";
import NotFound from "../NotFound";

/*
这里有一个react-router的问题，如果把/user/：id 会被默认当成indexrouter
 */

class  UserRouter extends Component {
	render = () => {
		return (
			<Fragment>
				<Switch>
					<Route path="/user/dashboard/:id" component={UserPage}/>
					<Route path="/user/notification" component={NotificationPage} />
					<Route path="/user/setting" component={SettingPage} />
					<Route path="/user/message" component={MessagePage} />
				</Switch>
			</Fragment>
		);
	}
}

export default withRouter(UserRouter);
