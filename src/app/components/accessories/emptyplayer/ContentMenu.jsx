import React from 'react';

class ContextMenu extends React.Component {
  state = {
    visible: false,
  };
  
  componentDidMount() {
    document.addEventListener('contextmenu', this._handleContextMenu);
    document.addEventListener('click', this._handleClick);
  };

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu);
    document.removeEventListener('click', this._handleClick);
  }
  
  _handleContextMenu = (event) => {
    event.preventDefault();
    const $rootElement = this.props.rootElement;
    const clickX = event.clientX;
    const clickY = event.clientY;
    const screenW = $rootElement.getBoundingClientRect().left;
    const screenH = $rootElement.getBoundingClientRect().top;
    const rootW = $rootElement.offsetWidth;
    const rootH = $rootElement.offsetHeight;
    if(clickX-screenW > 0 && clickX-screenW < rootW && clickY-screenH > 0 && clickY -screenH < rootH) {
      this.setState({ visible: true });
      if(clickX-screenW > rootW-this.ContentMenuRoot.offsetWidth && clickY-screenH > rootH-this.ContentMenuRoot.offsetHeight) {
        this.ContentMenuRoot.style.left = `${rootW-this.ContentMenuRoot.offsetWidth}px`;
        this.ContentMenuRoot.style.top = `${rootH-this.ContentMenuRoot.offsetHeight}px`;
      } else if(clickX-screenW > rootW-this.ContentMenuRoot.offsetWidth) {
        this.ContentMenuRoot.style.left = `${rootW-this.ContentMenuRoot.offsetWidth}px`;
        this.ContentMenuRoot.style.top = `${clickY-screenH}px`;
      } else if (clickY-screenH > rootH-this.ContentMenuRoot.offsetHeight) {
        this.ContentMenuRoot.style.left = `${clickX - screenW}px`;
        this.ContentMenuRoot.style.top = `${rootH-this.ContentMenuRoot.offsetHeight}px`;
      } else {
        this.ContentMenuRoot.style.left = `${clickX - screenW}px`;
        this.ContentMenuRoot.style.top = `${clickY - screenH}px`;
      }
    }
  };

  _handleClick = (event) => {
    this.setState({ visible: false, });
  };
  
  render() {
    const { visible } = this.state;
    return(visible || null) && 
      <div ref={ref => {this.ContentMenuRoot = ref}} className="contextMenu">
        <div className="contextMenu--title">EmptyVideo Player v1.1</div>
        <div className="contextMenu--separator" />
        <div className="contextMenu--content">A video player trys to satisfy all your needs</div>
        <div className="contextMenu--content">more features on the way...</div>
        <div className="contextMenu--content">Author Bill Tong</div>
      </div>
  };
}

export default ContextMenu;