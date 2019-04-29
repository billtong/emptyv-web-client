import React from 'react';
import { hashHistory } from 'react-router';
import { BounceLoader } from 'react-spinners';
import { getSessionTokenJson, updateUserInfo } from '../../api/apiHelper';
import { postNewFile } from '../../api/file';
import { updateUser } from '../../api/user';
import { BASE_MULTIPARTFILES_URL } from '../../api/BaseURL';

class SettingPage extends React.Component {
  state = {
    user: getSessionTokenJson().user,         //原来的用户信息
    isLoading: false,   //等待更新endpoint完成
    userIconImg: null,  //更改的信息
    userBannerImg: null,
    userIconImgURL: '',
    userBannerImgURL: '',
    userBio: '',
    userLocation: '',
    userURL: ''
  }

  componentWillMount() {
    const localUser = getSessionTokenJson();
    if(localUser === null) {
      hashHistory.push('SignIn');
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

  fileChangedHandler = (e, userParam) => {
    if(e.target.files[0] === undefined) {
      switch(userParam) {
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
        default: break;
      };
      return;
    }
    const newUser = this.state.user;
    const imgFileType = e.target.files[0].type.split('/')[1];
    const imgFile = new File([e.target.files[0]], `images/user/${getSessionTokenJson().user.userId}/${userParam}.${imgFileType}`, {type: e.target.files[0].type});
    switch(userParam) {
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
      default: break;
    };
  }

  //判断是否改变了用户信息
  hasChanged=() => {
    if(this.refs.bio === '' && this.refs.location === '' && this.refs.url === '') {
      return false;
    }
    if(this.state.userBannerImg === null && this.state.userBio === '' && this.state.userIconImg === null && this.state.userLocation === '' && this.state.userURL === '') {
      return false;
    } 
    console.log(this.state);
    return true;
  }

  //实时监听输入框改变state
  handleKeyPress=(e, inputRefs) => {
    const newUser = this.state.user;
    switch(inputRefs) {
      case 'bio' :
        const timer1 = setInterval(() => {
          if(this.state.userBio !== this.refs.bio.value) {
            newUser.userDesc = this.refs.bio.value
            this.setState({ userBio: this.refs.bio.value, user: newUser });
          } else {
            clearInterval(timer1);
          }
        }, 10);
        break;
      case 'location' :
        const timer2 = setInterval(() => {
          if(this.state.userLocation !== this.refs.location.value) {
            newUser.userLoc = this.refs.location.value;
            this.setState({ userLocation: this.refs.location.value, user: newUser });
          } else {
            clearInterval(timer2);
          }
        }, 10);
        break;
      case 'url' :
        const timer3 = setInterval(() => {
          if(this.state.userURL !== this.refs.url.value) { 
            newUser.userSite = this.refs.url.value;
            this.setState({ userURL: this.refs.url.value, user: newUser });
          } else {
            clearInterval(timer3);
          }
        }, 10);
        break;
      default:
        break;
    }
    console.log(this.state);
  }

  handleUpdateClick=(e) => {
    e.preventDefault();
    this.setState({isLoading: true});
    const files = new FormData();
    if(this.state.userIconImg !== null) {
      files.append(
        'files',
        this.state.userIconImg
      );
    }
    if(this.state.userBannerImg !== null) {
      files.append(
        'files',
        this.state.userBannerImg
      );
    }
    if(files !== null && files.getAll('files').length > 0) {
      const filepaths = files.getAll('files').map((value) => {
        return value.name;
      });
      postNewFile(files, filepaths).then(() => {
        updateUser(this.state.user).then(() => {
          updateUserInfo(this.state.user);
          this.setState({isLoading: false});
          location.reload();
        }).catch((err) => {
          this.setState({isLoading: false});
          alert(err);
        });
      }).catch(err=>{
        this.setState({isLoading: false});
        alert(err);
      });
    } else {
      this.setState({isLoading: true});
      updateUser(this.state.user).then(() => {
        updateUserInfo(this.state.user);
        this.setState({isLoading: false});
        location.reload();
      }).catch((err) => {
        this.setState({isLoading: false});
        alert(err);
      });
    }

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
            <img src={this.state.userBannerImgURL} id="responsive-userBanner"/>
            <input className="input-img" enctype="multipart/form-data" id="userBanner" type="file" onChange={(e)=>this.fileChangedHandler(e, 'userBanner')} />
            <label for="userBanner">Update</label>
          </li>
          <li className="setting-li">
            <div>Profile Picture</div>
            <img src={this.state.userIconImgURL} id="responsive-userIcon"/>
            <input className="input-img" enctype="multipart/form-data" id="userIcon" type="file" onChange={(e)=>this.fileChangedHandler(e, 'userIcon')} />
            <label for="userIcon">Update</label>
          </li>
          <li className="setting-li">
            <div>
              Bio
            </div>
            <textarea className="bio-text" placeholder={getSessionTokenJson().user.userDesc} onKeyPress={(e)=>this.handleKeyPress(e, 'bio')} ref="bio"/>
          </li>
          <li className="setting-li">
            <div>
              Location
            </div>
            <input className="input-text" placeholder={getSessionTokenJson().user.userLoc} type="text" onKeyPress={(e)=>this.handleKeyPress(e, 'location')} ref="location" />
          </li>
          <li className="setting-li">
            <div>
              URL
            </div>
            <input className="input-text" placeholder={getSessionTokenJson().user.userSite} type="url" onKeyPress={(e)=>this.handleKeyPress(e, 'url')} ref="url" />
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

export default SettingPage;