import React from 'react';
import { MdPlayArrow, MdPause, MdVolumeMute, MdVolumeUp, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import Dan from './Dan';
import ContentMenu from './ContentMenu';
import { getSessionTokenJson } from '../../../utils/api/apiHelper';
import { patchView } from '../../../utils/api/video';
import { getDanList, postDan } from '../../../utils/api/dan';
import "./VidoePlayer.css";

class VideoPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pause: true,              //记录视频是否暂停
			currentTime: '0:00:00',   //记录视频现在展示给用户的时间
			duration: '0:00:00',      //记录视频展现给用户的总时间
			volume: '1.0',            //记录音量大小 （0-1)
			progress: '0',            //记录播放进度
			headPos: '0',              //
			offVolume: false,         //记录是否静音
			volumeProgress: '100%',
			fullscreen: false,
			showPlayBtn: true,
      showControlBar: false,
      isVideoLoading: false,
      displayCursor: "inherit",
      isDisplayDan: true,      //用来关闭弹幕
      danCss: "danmu-canvas-section",
      danList: [],              //储存从后台传过来的该视频的全部弹幕列表
      danHasDisplayed: null,    //储存上一个弹幕ID，防止Interval里重复打印
      currentDanList: [],       //储存video.currentTime的全部弹幕列表，传给Dan组件展示出来
      resetDan: false           //记录Dan组件里当前展示的弹幕是否清空
    };
    this.timer = null;          //储存interval的key，刷新视频
    this.timerTask = null;      //储存timeouot的key，定时controlbar的出现和消失
  }

  //从后台获取全部弹幕list，确定视频是否全屏
	componentDidMount = () => {
    document.getElementById("myVideo").oncontextmenu = (e)=> (false);
    getDanList(this.props.video.video_id).then(res => {
      this.setState(prevState => ({
        ...prevState,
        danList: res.data,
      }));
    }).catch(err => {
      console.log(err);
    });
		window.onresize = () => {
			if (!this.checkFull() && this.state.fullscreen) {
				this.f11Key();
			}
		};
  };
  
  //更新VideoPlayer里的视频，目前还没用过。需要加入dan的相关state
	componentWillReceiveProps = (nextProps) => {
    const myVideo = document.getElementById('myVideo');
		if (this.props.video.video_url !== nextProps.video.video_url) {
			if (!myVideo.paused) {
				myVideo.pause();
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
			if (this.timeTask) {
        clearTimeout(this.timeTask);
				this.timeTask = null;
			}
			myVideo.src = nextProps.video.video_url;
			myVideo.volume = 1.0;
			myVideo.muted = false;
			this.setState({
				pause: true,
				currentTime: '0:00:00',
				duration: '0:00:00',
				volume: '1.0',
				progress: '0',
				headPos: '0',
				offVolume: false,
				volumeProgress: '100%',
				fullscreen: false,
				showPlayBtn: true,
        showControlBar: false,
        danList: [],
        realCurrentTime: 0
			});
		}
  }
  
  //关闭视频页后清空timeout和interval
	componentWillUnmount() {
    if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
    }
		if (this.timeTask) {
			clearTimeout(this.timeTask);
			this.timeTask = null;
		}
  }

  //让Dan组件中的弹幕清零,可用于关闭弹幕功能，被dan组件调用
  setResetDan=(bool) => {
    this.setState({
      resetDan: bool
    });
  }

  //更新时间+更新该时间点的弹幕(详见loadCurrentDanList)
  updateVideoTime=(myVideo) => {
    if (myVideo) {
      const oldCurrentTime = myVideo.currentTime;
      const loadingTimeCase = setTimeout(()=>{
        if(myVideo.currentTime === oldCurrentTime && !this.state.pause) {
          this.setState({ isVideoLoading: true });
        } else {
          clearTimeout(loadingTimeCase);
          this.setState({ isVideoLoading: false });
        }
      }, 100);
      this.loadCurrentDanList(myVideo);
      this.setState({
        currentTime: Math.floor((myVideo.currentTime) / 3600) + ':' + ((Math.floor((myVideo.currentTime) / 60) % 60) / 100).toFixed(2).slice(-2) + ':' + (((myVideo.currentTime) % 60) / 100).toFixed(2).slice(-2),
        progress: ((myVideo.currentTime / myVideo.duration) * 100) + '%',
        headPos: (((myVideo.currentTime / myVideo.duration) * 100) - 0.45) + '%'
      });
    }
  }
  
  //在timer里跑, 过滤danList中不是该时间点的弹幕，将该打印的弹幕放进去
  loadCurrentDanList=(myVideo) => {
    const newDispalyDanList = [];
    if (this.state.danList.length > 0) {
      this.state.danList.forEach((dan) => {
        if (this.state.danHasDisplayed !== dan.danId && dan.danCurrTime === (Math.floor((myVideo.currentTime)))) {
          newDispalyDanList.push(dan);
          this.setState({
            danHasDisplayed: dan.danId
          });
        }
      });
      let isNew = false;
      if (newDispalyDanList.length > 0) {
        if (newDispalyDanList.length === this.state.currentDanList.length) {
          newDispalyDanList.forEach((value, index) => {
            if (value.danId !== this.state.currentDanList[index].danId) {
              isNew = true;
            }
            if (value.userId !== this.state.currentDanList[index].userId) {
              isNew = true;
            }
          });
        } else {
          isNew = true;
        }
        if (isNew) {
          this.setState({
            currentDanList: newDispalyDanList
          });
        }
      }
    }
  }

  //检查是否全屏状态
	checkFull() {
		let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
		if (isFull === undefined) isFull = false;
		return isFull;
  }
  
  /**
   * 视频暂停和视频开始，点击视频时会执行
   * 1. 控制controlbar是否display
   * 2. 不断刷新currentTime state
   * 3. 不断刷新currentDanList state
   */
	playPause=() => {
    const myVideo = document.getElementById('myVideo');
		if (myVideo.paused) {
      //第一次点击时，myvideo已暂停且showPlayBtn还在
      if (this.state.showPlayBtn) {
        patchView(this.props.video.video_id);
      }
      myVideo.play();
			this.setState({
				showPlayBtn: false,
				showControlBar: false,
				pause: false,
				duration: Math.floor((myVideo.duration) / 3600) + ':' + ((Math.floor((myVideo.duration) / 60) % 60) / 100).toFixed(2).slice(-2) + ':' + (((myVideo.duration) % 60) / 100).toFixed(2).slice(-2)
      });
      this.timer = setInterval(() => {
        this.updateVideoTime(myVideo);
      }, 0);
		} else {
      myVideo.pause();
      if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
			this.setState({ 
        pause: true, 
        showControlBar: true
      });
    }
    if(this.state.pause && !this.state.showControlBar) {
      const timer = setTimeout(()=>{
        this.setState({ showControlBar: true });
        clearTimeout(timer);
      }, 100); 
    }
  }
  
  /**
   * 改变currentTime,即当点击controlbar时
   * 清理掉之前的那个timer，添加新的timer
   */
	resetPlay=(event) => {
    const myVideo = document.getElementById('myVideo');
    if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
    }
    const container = document.getElementsByClassName('videos-player')[0];
	  const containerOffsetLeft = container.offsetLeft + container.offsetParent.offsetLeft;
		const totalWidth = event.target.parentNode.offsetWidth;
    const scale = (event.clientX - containerOffsetLeft) / totalWidth;
    myVideo.currentTime = scale * myVideo.duration;
    this.timer = setInterval(() => {
      this.updateVideoTime(myVideo);
    }, 0);
    this.setResetDan(true);
    this.timeTask = setTimeout(() => {
      this.setState({ showControlBar: false });
      clearTimeout(this.timeTask);
      this.timeTask = null;
    }, 3000);
  }
  
  //改变volume条状态
	handleVolume() {
    const myVideo = document.getElementById('myVideo');
		this.setState({
			volumeProgress: this.state.offVolume ? (this.state.volume.indexOf('%') > -1 ? this.state.volume :this.state.volume * 100 + '%') : '0',
			offVolume: !this.state.offVolume
		});
		myVideo.muted = !this.state.offVolume;
		myVideo.volume = this.state.offVolume === false ? '0' : (this.state.volume.indexOf('%') > -1 ? this.state.volume.replace('%', '') / 100 : this.state.volume);
  }
  
  //处理点击音量条事件
	resetVolume(event) {
    const myVideo = document.getElementById('myVideo');
		const containerOffsetLeft = document.getElementsByClassName('vjs-volume-control')[0].offsetLeft;
    const contentLeft = document.getElementsByClassName('videos-player')[0].offsetLeft;
    const containerLeft = document.getElementsByClassName('videos-player')[0].offsetParent.offsetLeft;
    const totalWidth = event.currentTarget.offsetWidth;
    const scale = ((event.clientX - containerOffsetLeft - contentLeft - containerLeft) / totalWidth);
		this.setState({
			offVolume: scale === 0,
			volumeProgress: Math.min(scale * 100, 100) + '%',
			volume: Math.min(scale * 100, 100) + '%'
		});
		myVideo.muted = scale === 0;
    myVideo.volume = Math.min(scale, 1.0);
  }
  
  //点击f11全屏
	f11Key() {
		if (this.state.fullscreen) {
			this.setState({ fullscreen: false });
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
      }
      return;
		}
		const navigatorName = 'Microsoft Internet Explorer';
		if (window.navigator.appName === navigatorName) {
		  const WsShell = new ActiveXObject('WScript.Shell');
			WsShell.SendKeys('{F11}');
		} else {
			const de = document.getElementsByClassName('videos-player')[0];
			if (de.requestFullscreen) {
				de.requestFullscreen();
			} else if (de.mozRequestFullScreen) {
				de.mozRequestFullScreen();
			} else if (de.webkitRequestFullScreen) {
				de.webkitRequestFullScreen();
			} else if (de.msRequestFullscreen) {
				de.msRequestFullscreen();
			}
		}
		this.setState({ fullscreen: !this.state.fullscreen });
  }
  
  //改变controlbar和光标的状态
	switchControlBar = (e, flag) => {
    e.preventDefault();
    if (this.state.pause) {
      this.setState({ displayCursor: "inherit", showControlBar: true,  });
			return;
    }
    this.setState({  displayCursor: "inherit", showControlBar: flag });
    if(flag && this.state.fullscreen) {
      const timer = setTimeout(()=>{
        if(this.state.pause) {
          this.setState({  displayCursor: "inherit", showControlBar: true });
			    return;
        } else {
          this.setState({ displayCursor: "none", showControlBar: false });
        }
        clearTimeout(timer);
      }, 2000);
    }
  }

  /**
   * 提交用户弹幕
   * 把这个dan时间延后1s，加个唯一的假id放到danList里面，
   * 再把正确的post到后端 
   */
  submitDan=(e) => {
    e.preventDefault();
    if (getSessionTokenJson() !== null) {
      const content = this.refs.danContent.value;
      if (!content || content === null || content === '' || (typeof content === 'string' && content.trim().length === 0)) {
          alert('send with something please...');
          return;
      }
      const myVideo = document.getElementById('myVideo');
      //假的，未了让用户看到伪造一个id和currentTIme+1
      const newDanItem = {
        danId: -Math.floor(myVideo.currentTime),
        danContent: this.refs.danContent.value,
        danCurrTime: Math.floor(myVideo.currentTime) + 1,
        danStyle: 'default',
        videoId: this.props.video.video_id
      };
      const newDanList = this.state.danList;
      newDanList.push(newDanItem);
      this.setState({
        danList: newDanList
      });
      //真的
      postDan({
        danContent: this.refs.danContent.value,
        danCurrTime: Math.floor(myVideo.currentTime),
        danStyle: 'default',
        videoId: this.props.video.video_id
      }).then().catch(err=>{
        console.log(err);
      });
      this.refs.danContent.value = '';
    } else {
      alert('please login or sign up first');
    }
  }
  
	render() {
    const { video } = this.props;
    const startControlIcon = this.state.progress === '100%' || this.state.pause ? <MdPlayArrow /> : <MdPause />;
    const volumnControlIcon = this.state.offVolume === true ? <MdVolumeMute /> : <MdVolumeUp />; 
    const fullScreenControlIcon = this.state.fullscreen === true ?  <MdFullscreenExit /> : <MdFullscreen />;
    const danInputDiv = this.state.isDisplayDan ? (
      <div>
        <div className="vjs-control vjs-dan-switch" onClick={(e) => {this.setState({ isDisplayDan: false, danCss: "not-display" })}}>CLOSE</div>
        <div className="vjs-dan-input vjs-control">
          <input 
            className="dan-input"
            type="text" 
            ref="danContent"
            placeholder="leave a comment on the video"
          />
        </div>
        <div className="vjs-dan-btn vjs-control" onClick={(e) => this.submitDan(e)}>go</div>
      </div>
    ) : (
      <div className="vjs-control vjs-dan-switch" onClick={(e) => {this.setState({ isDisplayDan: true, danCss: "danmu-canvas-section" })}}>OPEN</div>
    );
		return (
      <div 
        className={this.state.fullscreen ? 'videos-player asset fullscreen' : 'videos-player asset'} 
        onMouseMove={(e) => this.switchControlBar(e, true)} 
        onMouseLeave={(e) => this.switchControlBar(e, false)} 
      >
        <Dan
          className={this.state.danCss} 
          displayDanList={this.state.currentDanList}
          pause={this.state.pause}
          resetDan={this.state.resetDan}
          setResetDan={this.setResetDan}
          currentTime={!document.getElementById('myVideo') ? 0 : document.getElementById('myVideo').currentTime}
        />
        <ContentMenu rootElement={document.getElementById('myVideo')}/>
        <video 
          width="100%" 
          height="100%" 
          poster="none"
          style={{cursor: this.state.displayCursor}} 
          id="myVideo"
          onClick={(e) => this.playPause(e)}
        >
					<source src={video.video_url} type="video/mp4" />
				</video>
        <div 
          className="vjs-big-play-button" 
          onClick={this.playPause.bind(this)}  
          style={{ display: this.state.showPlayBtn ? 'block' : 'none' }}
        >
					<MdPlayArrow />
				</div>
        <div 
          className="vjs-loading"
          style={{ display: this.state.isVideoLoading ? 'block': 'none'}}
        >
          <ClipLoader color="#FF4500"/>
        </div>
        <div 
          className="vjs-control-bar" 
          style={{ 
            visibility: this.state.progress === '100%' || this.state.showControlBar ? 'visible' : 'hidden', 
            opacity: this.state.progress || this.state.showControlBar ? 1 : 0
          }}
          onMouseMove={(e) => this.switchControlBar(e, true)} 
          onMouseLeave={(e) => this.switchControlBar(e, false)} 
        >
          <div 
            className="vjs-play-control vjs-control vjs-paused" 
            onClick={this.playPause.bind(this)} 
          >
						{startControlIcon}
					</div>
					<div className="vjs-current-time vjs-time-controls vjs-control">
						<span className="vjs-control-text">{this.state.currentTime}</span>
					</div>
					<div className="vjs-time-divider">
						<span>/</span>
					</div>
					<div className="vjs-duration-time vjs-time-controls vjs-control">
						<span>{this.state.duration}</span>
					</div>
          {danInputDiv}
					<div className="vjs-progress-control vjs-control" >
						<div className="vjs-progress-holder vjs-slider" onClick={this.resetPlay.bind(this)}>
							<div className="vjs-play-progress" style={{ width: this.state.progress }} />
						</div>
					</div>
					<div className="vjs-fullscreen-control vjs-control" onClick={this.f11Key.bind(this)}>
						{fullScreenControlIcon}
					</div>
					<div className="vjs-volume-control vjs-control">
						<div className="vjs-volume-bar vjs-slider" onClick={this.resetVolume.bind(this)}>
							<div className="vjs-volume-level" style={{ width: this.state.volumeProgress }} />
						</div>
					</div>
					<div className="vjs-mute-control vjs-control" onClick={this.handleVolume.bind(this)}>
           {volumnControlIcon}
          </div>
				</div>
			</div>
    );
	}
}

export default VideoPlayer;
