import React from 'react';
import { MdAdd } from 'react-icons/md';
import { patchTags } from '../../api/video';
import { getSessionTokenJson } from '../../api/apiHelper';
import {connect} from "react-redux";

class Tag extends React.Component {
  state = {
    tagList: this.props.tagList,  //用于记录改变的tagList
    isTagAdd: false,              //用于记录btn和input的状态改变
    isTagBlur: true,              //blur和focus是防止被其他input的enter提交给影响
    isTagForcus: false            //blur和focus是防止被其他input的enter提交给影响
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

  //在退出这个页面的时候将改变的tag提交上去，（这个tagJsonString仅仅是个string而已不是json）
  componentWillUnmount = () => {
    if (this.state.hasChanged) {
      patchTags({
        videoId: this.props.videoId,
        tagJsonString: this.state.tagList
      });
    }
  }

  //点击Enter键提交这个tag
  handleEnterKey=(e) => {
    if (e.keyCode === 13 && this.state.isTagForcus && !this.state.isTagBlur) {
      const content = this.refs.addTag.value;
      if (!content || content === null || content === '' || (typeof content === 'string' && content.trim().length === 0)) {
          alert('fill with something please...');
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

  //点击tag按钮
  handleClick=(e) => {
    const userJSON = getSessionTokenJson();
    if (!userJSON) {
      alert('please login or sign up a new account');
      return 0;
    }
    e.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      isTagAdd: true,
      isTagForcus: true,
      isTagBlur: false
    }));
  }

  //监听tag输入筐的focus状态
  ifTagForcus=() => {
    this.setState(prevState => ({
      ...prevState,
      isTagForcus: true,
      isTagBlur: false
    }));
  }

  //监听tag输入框的blur状态
  ifTagBlur=() => {
    this.setState(prevState => ({
      ...prevState,
      isTagForcus: false,
      isTagBlur: true,
      isTagAdd: false
    }));
  }
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
      <div>
        <div className="add-btn" onClick={e => this.handleClick(e)}>
          <MdAdd className="add-icon" />
        </div>
        Add New Tags
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

export default Tag;

/*get的video tag string形式
  "xx,xxx,xxx,xxx"
*/
