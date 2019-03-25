import React from 'react';
import {connect} from "react-redux";

class Dan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numArrT: [],
      numArrL: [],
      colorArr: [],
      speedArr: [],
      displayDanList: [],
    };
    this.myCanvas = React.createRef();
  }

   //打印传进来的这部分displayDanList
  componentWillReceiveProps=(nextProps) => {
    if (nextProps.resetDan === true) {
      this.setState({
        numArrT: [],
        numArrL: [],
        colorArr: [],
        speedArr: [],
        displayDanList: [],
      });
      this.props.setResetDan(false);
      const canvas = this.myCanvas.current;
      const ctx = this.myCanvas.current.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    let isNew = false;
    if (this.props.displayDanList.length !== nextProps.displayDanList.length) {
      isNew = true;
    } else if (nextProps.displayDanList.length > 0) {
      nextProps.displayDanList.forEach((value, index) => {
        if (value.danId !== this.props.displayDanList[index].danId) {
          isNew = true;
          return;
        }
        if (value.currentTime !== this.props.displayDanList[index].currentTime) {
          isNew = true;
          return;
        }
        if (value.userId !== this.props.displayDanList[index].userId) {
          isNew = true;
          return;
        }
      });
    }

    if (isNew) {
      const canvas = this.myCanvas.current;
      const displayDanList = nextProps.displayDanList;
      const newNumArrT1 = this.state.numArrT;
      let newNumArrT2 = Array(displayDanList.length).fill(1);
      newNumArrT2 = newNumArrT2.map((value, index) => {
        return (canvas.height * (index / 15)) + 20;
      });
      Array.prototype.push.apply(newNumArrT1, newNumArrT2);
      const newNumArrL = this.state.numArrL;
      Array.prototype.push.apply(newNumArrL, Array(displayDanList.length).fill(canvas.width));
      const newColorArr = this.state.colorArr;
      Array.prototype.push.apply(newColorArr, Array(displayDanList.length).fill('#FFFFFF'));
      const newSpeedArr = this.state.speedArr;
      const newSpeedArr2 = displayDanList.map((value) => {
        return (value.danContent.length / 10);
      });
      Array.prototype.push.apply(newSpeedArr, newSpeedArr2);
      const newDisplayDanList = this.state.displayDanList;
      Array.prototype.push.apply(newDisplayDanList, displayDanList);
      console.log(newDisplayDanList);
      this.setState({
        numArrT: newNumArrT1,
        numArrL: newNumArrL,
        colorArr: newColorArr,
        speedArr: newSpeedArr,
        displayDanList: newDisplayDanList
      });
    }
    if (this.props.currentTime !== nextProps.currentTime && this.state.displayDanList.length > 0) {
      this.drawDanList();
    }
  }

  drawDanList=() => {
    const canvas = this.myCanvas.current;
    const ctx = this.myCanvas.current.getContext('2d');
    ctx.font = '25px Georgia';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      this.state.displayDanList.forEach((dan, index) => {
        ctx.fillStyle = this.state.colorArr[index];
        ctx.fillText(dan.danContent, this.state.numArrL[index], this.state.numArrT[index]);
        if (this.state.numArrL[index] <= -canvas.width) {
          const newNumArrL = this.state.numArrL;
          const newNumArrT = this.state.numArrT;
          const newColorArr = this.state.colorArr;
          const newSpeedArr = this.state.speedArr;
          const newDisplayDanList = this.state.displayDanList;
          newNumArrL.splice(index, 1);
          newNumArrT.splice(index, 1);
          newColorArr.splice(index, 1);
          newSpeedArr.splice(index, 1);
          newDisplayDanList.splice(index, 1);
          this.setState({
            numArrT: newNumArrT,
            numArrL: newNumArrL,
            colorArr: newColorArr,
            speedArr: newSpeedArr,
            displayDanList: newDisplayDanList
          });
        } else {
          const newArrL = this.state.numArrL;
          newArrL[index] = this.state.numArrL[index] - this.state.speedArr[index];
          this.setState({
            numArrL: newArrL,
          });
        }
      });
      ctx.restore();
  }

  render = () => {
    return (
      <div className="danmu-canvas-section">
        <canvas className="danmu-canvas" ref={this.myCanvas} width="1250" height="625" />
      </div>
    );
  }
}

export default Dan;
