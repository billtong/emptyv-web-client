/* eslint-disable max-len */
import React from 'react';
import { MdPlayArrow, MdPause, MdVolumeMute, MdVolumeUp, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import Dan from '../accessories/Dan';
import { getSessionTokenJson } from '../../api/apiHelper';
import { patchView } from '../../api/video.jsx';
import { getDanList, postDan } from '../../api/dan';


class VideoPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
      danHasDisplayed: null, //储存上一个弹幕ID，防止重复打印
      currentDanList: [],   //当前这个时间的弹幕list
      resetDan: false
    };
    this.timer = null;
    this.timerArr = [];
  }
  
	componentDidMount=() => {
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
  }
  
	componentWillReceiveProps(nextProps) {
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
			// reset the player
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

  //让Dan组件中的弹幕清零,可用于关闭弹幕功能
  setResetDan=(bool) => {
    this.setState({
      resetDan: bool
    });
  }

  //更新时间+更新该时间点的弹幕
  updateVideoTime=(myVideo) => {
    if (myVideo) {
      this.loadCurrentDanList(myVideo);
      this.setState({
        currentTime: Math.floor((myVideo.currentTime) / 3600) + ':' + ((Math.floor((myVideo.currentTime) / 60) % 60) / 100).toFixed(2).slice(-2) + ':' + (((myVideo.currentTime) % 60) / 100).toFixed(2).slice(-2),
        progress: ((myVideo.currentTime / myVideo.duration) * 100) + '%',
        headPos: (((myVideo.currentTime / myVideo.duration) * 100) - 0.45) + '%'
      });
    }
  }
  
  //在timer里跑,将该打印的弹幕放进去
  loadCurrentDanList=(myVideo) => {
    const newDispalyDanList = [];
    if (this.state.danList.length > 0) {
      //把要展示的给放进去
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

	checkFull() {
		let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
		if (isFull === undefined) isFull = false;
		return isFull;
  }
  
	playPause() {
    const myVideo = document.getElementById('myVideo');
    const self = this;
		if (myVideo.paused) {
      //第一次点击时，myvideo已暂停且showPlayBtn还在
      if (this.state.showPlayBtn) {
        patchView(this.props.video.video_id);
      }
      myVideo.play();
			self.setState({
				showPlayBtn: false,
				showControlBar: true,
				pause: false,
				duration: Math.floor((myVideo.duration) / 3600) + ':' + ((Math.floor((myVideo.duration) / 60) % 60) / 100).toFixed(2).slice(-2) + ':' + (((myVideo.duration) % 60) / 100).toFixed(2).slice(-2)
			});
			self.timeTask = setTimeout(() => {
				self.setState({ showControlBar: false });
        clearTimeout(self.timeTask);
				self.timeTask = null;
      }, 3000);
      self.timer = setInterval(() => {
        this.updateVideoTime(myVideo);
      }, 0);
		} else {
      myVideo.pause();
      if (self.timer) {
				clearInterval(self.timer);
				self.timer = null;
			}
			this.setState({ 
        pause: true, 
        showControlBar: true
      });
		}
  }
  
	resetPlay=(event) => {
    const myVideo = document.getElementById('myVideo');
    if (self.timer) {
			clearInterval(self.timer);
			self.timer = null;
    }
    const container = document.getElementsByClassName('videos-player')[0];
	  const containerOffsetLeft = container.offsetLeft + container.offsetParent.offsetLeft;
		const totalWidth = event.target.parentNode.offsetWidth;
    const scale = (event.clientX - containerOffsetLeft) / totalWidth;
    myVideo.currentTime = scale * myVideo.duration;
    self.timer = setInterval(() => {
      this.updateVideoTime(myVideo);
    }, 50);
    this.setResetDan(true);
    this.timeTask = setTimeout(() => {
      this.setState({ showControlBar: false });
      clearTimeout(this.timeTask);
      this.timeTask = null;
    }, 3000);
  }
  
	handleVolume() {
    const myVideo = document.getElementById('myVideo');
		this.setState({
			volumeProgress: this.state.offVolume ? (this.state.volume.indexOf('%') > -1 ? this.state.volume :this.state.volume * 100 + '%') : '0',
			offVolume: !this.state.offVolume
		});
		myVideo.muted = !this.state.offVolume;
		myVideo.volume = this.state.offVolume === false ? '0' : (this.state.volume.indexOf('%') > -1 ? this.state.volume.replace('%', '') / 100 : this.state.volume);
  }
  
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
  
	toggleControlBar = () => {
		if (this.state.showPlayBtn) {
			this.setState({ showControlBar: false });
			return;
		}
		if (this.state.pause) {
			return;
		}
		if (!this.state.showControlBar) {
			this.setState({ showControlBar: true });
			return;
		}
  }

  submitDan=(e) => {
    e.preventDefault();
    if (getSessionTokenJson() !== null) {
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
    } else {
      alert('please login or sign up first');
    }
  }
  
	render() {
    const { video } = this.props;
    const startControlIcon = this.state.progress === '100%' || this.state.pause ? <MdPlayArrow /> : <MdPause />;
    const volumnControlIcon = this.state.offVolume === true ? <MdVolumeMute /> : <MdVolumeUp />; 
    const fullScreenControlIcon = this.state.fullscreen === true ?  <MdFullscreenExit /> : <MdFullscreen />;
		return (
			<div className={this.state.fullscreen ? 'videos-player asset fullscreen' : 'videos-player asset'}>
        <Dan 
          displayDanList={this.state.currentDanList}
          pause={this.state.pause}
          resetDan={this.state.resetDan}
          setResetDan={this.setResetDan}
          currentTime={!document.getElementById('myVideo') ? 0 : document.getElementById('myVideo').currentTime}
        />
        <video 
          width="100%" 
          height="100%" 
          poster="none" 
          id="myVideo" 
          onClick={this.playPause.bind(this)} 
          onMouseMove={this.toggleControlBar.bind(this)} 
          onMouseLeave={this.toggleControlBar.bind(this)}
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
          className="vjs-control-bar" 
          style={{ 
            visibility: this.state.progress === '100%' || this.state.showControlBar ? 'visible' : 'hidden', 
            opacity: this.state.progress || this.state.showControlBar ? 1 : 0
          }}
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
          <div className="vjs-dan-input vjs-control">
          <input 
            className="dan-input"
            type="text" 
            ref="danContent"
            placeholder="leave a comment on the video"
          />
          </div>
          <div className="vjs-dan-btn vjs-control" onClick={(e) => this.submitDan(e)}>go</div>

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
