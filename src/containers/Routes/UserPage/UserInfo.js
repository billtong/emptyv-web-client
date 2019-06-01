import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import "./UserInfo.css";

class UserInfo extends Component{
	render = () => {
		return (
			<Fragment>
				<table className="userInfo-table" border="1">
					<tr>
						<td className="title-td">Bio</td>
						<td className="text-td">
							<p className="bio-text">
								{this.props.user.userDesc}
							</p>
						</td>
					</tr>
					<tr>
						<td className="title-td">Location</td>
						<td className="text-td">{this.props.user.userLoc}</td>
					</tr>
					<tr>
						<td className="title-td">Website</td>
						<td className="text-td">{this.props.user.userSite}</td>
					</tr>
				</table>
			</Fragment>
		);
	}
}

export default UserInfo;

UserInfo.propsTypes = {
	user: PropTypes.object,
};

UserInfo.defaultProps = {
	user: {}
};
