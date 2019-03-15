import React from 'react';
import { MdAdd } from 'react-icons/md';
import { patchTags } from '../../api/video';
import { getSessionTokenJson } from '../../api/apiHelper';

class Tag extends React.Component {
  state = {
    tagList: this.props.tagList,
    isTagAdd: false,
    isTagBlur: true,
    isTagForcus: false
  }

  componentWillMount=() => {
    document.addEventListener('keypress', this.handleEnterKey);
  }

  componentDidMount=() => {
    document.removeEventListener('keypress', this.handleEenterKey);
    this.setState({
      tagList: this.props.tagList,
      isTagAdd: false,
      isTagBlur: true,
      isTagForcus: false,
      hasChanged: false
    });
  }

  componentWillUnmount = () => {
    if (this.state.hasChanged) {
      patchTags({
        videoId: this.props.videoId,
        tagJsonString: this.state.tagList
      });
    } 
  }

  handleEnterKey=(e) => {
    if (e.keyCode === 13 && this.state.isTagForcus && !this.state.isTagBlur) {
      if (getSessionTokenJson === null) {
        alert('please login first!');
        return;
      }
      const { tagList } = this.state;
      const tag = this.refs.addTag.value;
      this.refs.addTag.value = '';
      e.preventDefault();
      const newTagList = (!tagList || typeof tagList !== 'string' || tagList.constructor !== String) ? [] : tagList.split(',');
      newTagList.push(tag);
      this.setState(prevState => ({
        ...prevState,
        isTagAdd: false,
        isTagForcus: false,
        isTagBlur: true,
        hasChanged: true,
        tagList: newTagList.join(',')
      }));
    }
  };

  handleClick=(e) => {
    e.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      isTagAdd: true,
      isTagForcus: true,
      isTagBlur: false
    }));
  }

  ifTagForcus=() => {
    this.setState(prevState => ({
      ...prevState,
      isTagForcus: true,
      isTagBlur: false
    }));
  }

  ifTagBlur=() => {
    this.setState(prevState => ({
      ...prevState,
      isTagForcus: false,
      isTagBlur: true,
      isTagAdd: false
    }));
  }
//(typeof str=='string')&&str.constructor==String; 
  render() {
    const { tagList } = this.state;
    const solvedTageList = (!tagList || typeof tagList !== 'string' || tagList.constructor !== String) ? [] : tagList.split(',');
    const tagListSec = (typeof solvedTageList !== 'object' || solvedTageList.constructor !== Array || solvedTageList.length === 0) ? (
      <li key={-1}>no tags yet</li>
    ) : (
      solvedTageList.map((value, index) => {
        return (
          <li className="tag-li" key={index}>
            {value}
          </li>
        );
      })
    ); 

    const addTag = (this.state.isTagAdd) ? (
      <div>
        <input
          className="add-input"
          id="add-tag-input"
          autoFocus="true"
          placeholder="Press <Enter> to Add"
          onKeyPress={e => this.handleEnterKey(e)}
          onFocus={this.ifTagForcus}
          onBlur={this.ifTagBlur}
          type="text"
          ref="addTag"
        />
      </div>
    ) : (
      <div className="add-btn" onClick={e => this.handleClick(e)}>
        <MdAdd className="add-icon" />
      </div>
    );

    return (
      <div className="tag-section">
        <ul className="tag-ul">
          {tagListSec}
        </ul>
        {addTag}
      </div>
    );
  }
}

module.exports = Tag;

/*
tagList: {
  data: [
    {name: xxx},
    {name: xxx},
    {name: xxx},
    {name: xxx}
  ]
}
*/
