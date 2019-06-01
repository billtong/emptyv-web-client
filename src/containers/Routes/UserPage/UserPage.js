import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import {getFavList} from "../../../utils/api/fav";
import {getSessionTokenJson} from "../../../utils/api/apiHelper";
import {getUserPublic} from "../../../utils/api/user";
import history from "../../../utils/history";
import UserHeadBar from "./UserHeadBar";
import UserInfo from "./UserInfo";
import UserUploadVideo from "./UserUploadVideo";
import UserFavVideo from "./UserFavVideo";
import UserHistoryVideo from "./UserHistoryVideo";

const UserWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 3rem;
`;

class UserPage extends Component {
	state = {
		user: {},
		isHostUser: false,
	};

	componentWillMount = () => {
		const userId = this.props.match.params.id;
		const isUserA =  !getSessionTokenJson() || getSessionTokenJson() === null;
		if(!isUserA) {
			this.setState({
				user: getSessionTokenJson().user,
				isHostUser: true,
			});
		} else {
			getUserPublic({
				userId: userId
			}).then((res) => {
				this.setState({
					user: res.data,
					isHostUser: false,
				});
			}).catch((err)=>{
				history.push("/404");
			});
		}
	};

	render = () => {
		const userId = this.props.match.params.id;
		return (
			<Fragment>
				<UserHeadBar user={this.state.user} />
				<UserWrapper>
					<div>
						<UserUploadVideo userId={userId} />
						<UserFavVideo userId={userId} />
						{this.state.isHostUser && <UserHistoryVideo userId={userId} />}
					</div>
					<UserInfo user={this.state.user} />
				</UserWrapper>
			</Fragment>
		);
	}
}

export default withRouter(UserPage);
