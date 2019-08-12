import React from 'react';
import history from '../../../utils/history';
import {BounceLoader} from 'react-spinners';
import {getSessionTokenJson, updateUserInfo} from '../../../utils/api/apiHelper';
import {postNewFile} from '../../../utils/api/file';
import {updateUser} from '../../../utils/api/user';
import {BASE_MULTIPARTFILES_URL} from '../../../utils/api/baseURL';
import "./SettingPage.css";
import {withRouter} from "react-router-dom";

class SettingPage extends React.Component {
	state = {
		user: getSessionTokenJson().user,         //原来的用户信息
		isLoading: false,   //等待更新endpoint完成
		userIconImg: null,  //更改的信息
		userBannerImg: null,
		userIconImgURL: '',  //ImgURL用于预览，Img文件用来传送
		userBannerImgURL: '',
		userBio: '',
		userLocation: '',
		userURL: '',
		userName: ''
	};

	//监听用户上传图片的行为，更改state
	fileChangedHandler = (e, userParam) => {
		if (e.target.files[0] === undefined) {
			switch (userParam) {
				case 'userIcon':
					this.setState({
						userIconImg: null,
						userIconImgURL: getSessionTokenJson().user.userIcon
					});
					break;
				case 'userBanner':
					this.setState({
						userBannerImg: null,
						userBannerImgURL: getSessionTokenJson().user.userBanner
					});
					break;
				default:
					break;
			}
			return;
		}
		const newUser = this.state.user;
		const imgFileType = e.target.files[0].type.split('/')[1];
		const imgFile = new File([e.target.files[0]], `images/user/${getSessionTokenJson().user.userId}/${userParam}.${imgFileType}`, {type: e.target.files[0].type});
		switch (userParam) {
			case 'userIcon':
				newUser.userIcon = `${BASE_MULTIPARTFILES_URL}${imgFile.name}`;
				this.setState({
					userIconImg: imgFile,
					userIconImgURL: URL.createObjectURL(imgFile),
					user: newUser
				});
				break;
			case 'userBanner':
				newUser.userBanner = `${BASE_MULTIPARTFILES_URL}${imgFile.name}`;
				this.setState({
					userBannerImg: imgFile,
					userBannerImgURL: URL.createObjectURL(imgFile),
					user: newUser
				});
				break;
			default:
				break;
		}
	};
	//判断用户有没有更改信息
	hasChanged = () => {
		if (this.refs.bio === '' && this.refs.location === '' && this.refs.url === '' && this.refs.name === '') {
			return false;
		}
		return !(this.state.userBannerImg === null && this.state.userBio === '' && this.state.userIconImg === null && this.state.userLocation === '' && this.state.userURL === '' && this.state.userName === '');
	};

	//监听用户输入行为，改变state
	handleKeyDown = (e, inputRefs) => {
		const newUser = this.state.user;
		switch (inputRefs) {
			case 'bio' :
				const timer1 = setInterval(() => {
					if (this.state.userBio !== this.refs.bio.value) {
						newUser.profile.description = this.refs.bio.value;
						this.setState({userBio: this.refs.bio.value, user: newUser});
					} else {
						clearInterval(timer1);
					}
				}, 10);
				break;
			case 'location' :
				const timer2 = setInterval(() => {
					if (this.state.userLocation !== this.refs.location.value) {
						newUser.profile.location = this.refs.location.value;
						this.setState({userLocation: this.refs.location.value, user: newUser});
					} else {
						clearInterval(timer2);
					}
				}, 10);
				break;
			case 'url' :
				const timer3 = setInterval(() => {
					if (this.state.userURL !== this.refs.url.value) {
						newUser.profile.website = this.refs.url.value;
						this.setState({userURL: this.refs.url.value, user: newUser});
					} else {
						clearInterval(timer3);
					}
				}, 10);
				break;
			case 'name':
				const timer4 = setInterval(() => {
					if (this.state.user.profile.name !== this.refs.name.value) {
						newUser.profile.name = this.refs.name.value;
						this.setState({userName: this.refs.name.value, user: newUser})
					} else {
						clearInterval(timer4);
					}
				}, 10);
				break;
			default:
				break;
		}
	};

	handleUpdateClick = (e) => {
		e.preventDefault();
		this.setState({isLoading: true});
		const files = new FormData();
		if (this.state.userIconImg !== null) {
			files.append(
				'files',
				this.state.userIconImg
			);
		}
		if (this.state.userBannerImg !== null) {
			files.append(
				'files',
				this.state.userBannerImg
			);
		}
		if (files !== null && files.getAll('files').length > 0) {
			const filepaths = files.getAll('files').map((value) => {
				return value.name;
			});
			postNewFile(files, filepaths).then(() => {
				updateUser(this.state.user).then(() => {
					updateUserInfo(this.state.user);
					this.setState({isLoading: false});
					history.push("/");
				}).catch((err) => {
					this.setState({isLoading: false});
					alert(err);
				});
			}).catch(err => {
				this.setState({isLoading: false});
				alert(err);
			});
		} else {
			this.setState({isLoading: true});
			updateUser(this.state.user).then(() => {
				updateUserInfo(this.state.user);
				this.setState({isLoading: false});
				history.push("/");
			}).catch((err) => {
				this.setState({isLoading: false});
				alert(err);
			});
		}
	};

	//检查是否登陆，如果没有跳转到登陆界面
	componentWillMount() {
		const localUser = getSessionTokenJson();
		if (localUser === null) {
			history.push('/login');
		}
	}

	//初始化用户的信息
	componentDidMount() {
		const localUser = getSessionTokenJson();
		this.setState({
			userIconImgURL: localUser.user.userIcon,
			userBannerImgURL: localUser.user.userBanner
		});
	}

	render() {
		const updateBtn = this.hasChanged() ? (
			<div className="btn btn-able" onClick={(e) => this.handleUpdateClick(e)}>
				Update Profile
			</div>
		) : (
			<div className="btn btn-disable">
				Update Profile
			</div>
		);
		const loadingLabel = this.state.isLoading ? (
			<BounceLoader color={'#d9d9d9'}/>
		) : null;
		return (
			<div>
				<ul className="setting-ul">
					<li className="setting-li">
						<div>Profile Banner Picture</div>
						<img alt={"user-banner"} src={this.state.userBannerImgURL} id="responsive-userBanner"/>
						<input className="input-img" formEncType="multipart/form-data" id="userBanner" type="file"
						       onChange={(e) => this.fileChangedHandler(e, 'userBanner')}/>
						<label htmlFor="userBanner">Update</label>
					</li>
					<li className="setting-li">
						<div>Profile Picture</div>
						<img alt={"user-avatar"} src={this.state.userIconImgURL} id="responsive-userIcon"/>
						<input className="input-img" formEncType="multipart/form-data" id="userIcon" type="file"
						       onChange={(e) => this.fileChangedHandler(e, 'userIcon')}/>
						<label htmlFor="userIcon">Update</label>
					</li>
					<li className="setting-li">
						<div>name</div>
						<input className={"input-text"} placeholder={getSessionTokenJson().user.profile.name} type={"text"}
						       onKeyDown={(e) => this.handleKeyDown(e, 'name')} ref="name"/>
					</li>
					<li className="setting-li">
						<div>Bio</div>
						<textarea className="bio-text" placeholder={getSessionTokenJson().user.profile.description}
						          onKeyDown={(e) => this.handleKeyDown(e, 'bio')} ref="bio"/>
					</li>
					<li className="setting-li">
						<div>Location</div>
						<input className="input-text" placeholder={getSessionTokenJson().user.profile.location} type="text"
						       onKeyDown={(e) => this.handleKeyDown(e, 'location')} ref="location"/>
					</li>
					<li className="setting-li">
						<div>
							URL
						</div>
						<input className="input-text" placeholder={getSessionTokenJson().user.profile.website} type="text"
						       onKeyDown={(e) => this.handleKeyDown(e, 'url')} ref="url"/>
					</li>
					<li className="setting-li">
						{updateBtn}
						{loadingLabel}
					</li>
				</ul>
			</div>
		);
	}
}

export default withRouter(SettingPage);
