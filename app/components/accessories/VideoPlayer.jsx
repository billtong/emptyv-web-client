/* eslint-disable max-len */
import React from 'react';
import { MdPlayArrow, MdPause, MdVolumeMute, MdVolumeUp, MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { patchView } from '../../api/video.jsx';


class VideoPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pause: true,
			currentTime: '0:00',
			duration: '0:00',
			volume: '1.0',
			progress: '0',
			headPos: '0',
			offVolume: false,
			volumeProgress: '100%',
			fullscreen: false,
			showPlayBtn: true,
			showControlBar: false
		};
  }
  
	componentDidMount() {
		let self = this;
		self.timer = null;
		window.onresize = () => {
			if (!self.checkFull() && self.state.fullscreen) {
				self.f11Key();
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
				currentTime:'0:00',
				duration: '0:00',
				volume: '1.0',
				progress: '0',
				headPos: '0',
				offVolume: false,
				volumeProgress: '100%',
				fullscreen: false,
				showPlayBtn: true,
				showControlBar: false
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
  
	checkFull() {
		let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
		if (isFull === undefined) isFull = false;
		return isFull;
  }
  
	playPause() {
    const myVideo = document.getElementById('myVideo');
		const self = this;
		if (myVideo.paused) {
      if (this.state.showPlayBtn) {
        patchView(this.props.video.video_id);
      }
      myVideo.play();
			self.setState({
				showPlayBtn: false,
				showControlBar: true,
				pause: false,
				duration: Math.floor((myVideo.duration)/60)+":"+((myVideo.duration)%60/100).toFixed(2).slice(-2)
			});
			self.timeTask = setTimeout(() => {
				self.setState({ showControlBar: false });
				clearTimeout(self.timeTask);
				self.timeTask = null;
			}, 3000);
			self.timer = setInterval(() => {
				if (myVideo) {
					self.setState({
						currentTime: Math.floor((myVideo.currentTime)/60)+":"+((myVideo.currentTime)%60/100).toFixed(2).slice(-2),
						progress: (myVideo.currentTime / myVideo.duration) * 100 + '%',
						headPos: (myVideo.currentTime / myVideo.duration) * 100 - 0.45 + '%'
					});
				}
			}, 50);

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
  
	resetPlay(event) {
    const myVideo = document.getElementById('myVideo');
		const self = this;
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
			self.setState({
				currentTime: Math.floor((myVideo.currentTime) / 60) + ':' + ((myVideo.currentTime) % 60 / 100).toFixed(2).slice(-2),
				progress: Math.min((myVideo.currentTime / myVideo.duration) * 100 , 100) + '%',
				headPos: (myVideo.currentTime / myVideo.duration) * 100 - 0.45 + '%'
			});
    }, 50);
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
  
	render() {
    const { video } = this.props;
    const startControlIcon = this.state.progress === '100%' || this.state.pause ? <MdPlayArrow /> : <MdPause />;
    const volumnControlIcon = this.state.offVolume === true ? <MdVolumeMute /> : <MdVolumeUp />; 
    const fullScreenControlIcon = this.state.fullscreen === true ?  <MdFullscreenExit /> : <MdFullscreen />;
		return (
			<div className={this.state.fullscreen ? 'videos-player asset fullscreen' : 'videos-player asset'}>
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
