import React from 'react';
import { IoIosHeart } from 'react-icons/io';
import { MdAdd } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';
import { getSessionTokenJson } from '../../api/apiHelper';
import { patchFavList, postFavList, getFavList } from '../../api/fav';

class Fav extends React.Component {
  state = {
    favDialogCss: 'notShowDialog',         //showDialog and notShowDialog
    favList: this.props.favList,           //get from VideoPage
    isNewFavList: false,
    changedFavList: [],
  }

  handleFavClickAction = (e) => {
    if (this.props.handleClickAction(e, 'favourite') === 0) {
      return;
    }

    getFavList({
      userId: getSessionTokenJson().user.userId
    }).then(res => {
      this.setState(prevState => (
        {
          ...prevState,
          favList: res.data,
          favDialogCss: 'showDialog'
        }
      ));
    }).catch((err) => {
      alert(err);
    });
  }

  //提交改变的favlist和新建的favlist
  sendChangedFavList=(e) => {
    e.preventDefault();
    if (this.state.changedFavList.length > 0) {
      this.state.changedFavList.forEach((value, index) => {
        //it is better to combine these patch and post together with one time.
        if (!value.favId) {
          postFavList({
            favList: value.favList,
            favName: value.favName,
            userId: value.userId,
            favIsPublish: true
          }).then(() => {
            if ((index + 1) >= this.state.changedFavList.length) {
              this.setState(prevState => ({
                ...prevState,
                favDialogCss: 'notShowDialog'
              }));
            }
          }).catch();
        } else {
          patchFavList({
            favId: value.favId,
            favList: value.favList,
            favName: value.favName,
            userId: value.userId
          }).then(() => {
            if ((index + 1) >= this.state.changedFavList.length) {
              this.setState(prevState => ({
                ...prevState,
                favDialogCss: 'notShowDialog'
              }));
            }
          }).catch();
        }
      });
    }
  }

  render() {
    const favIcon = this.props.hasFav ? (
      <div className='video-action-action love-action actioned' onClick={e => this.handleFavClickAction(e)}>
        <IoIosHeart />
      </div>
    ) : (
      <div className='video-action-action love-action' onClick={e => this.handleFavClickAction(e)}>
        <IoIosHeart data-toggle="modal" />
      </div>
    );

    //favlist表单，主要是逻辑判断，防止出现不合理的favlist选项s
    const favCheckList = !this.state.favList || this.state.favList.length === 0 ? null : this.state.favList.map((value, index) => {
      const videoIdArr = value.favList.split(',');
      let isCheck = false;
      videoIdArr.forEach(videoId => {
        if (this.props.videoId === videoId) {
          isCheck = true;
        }
      });
      return (
        <tr key={index}>
          <td>
            <input
              className="check-box-section"
              type="checkbox"
              defaultChecked={isCheck}
              ref={`${index}-checkbox`}
              onChange={() => {
                const newChangedFavList = this.state.changedFavList;
                let newFavList = value.favList;
                const localVideoId = this.props.videoId;
                if (this.refs[`${index}-checkbox`].checked) {
                  newFavList = `${newFavList},${localVideoId}`;
                  newChangedFavList.push({
                    favId: value.favId,
                    favList: `${newFavList}`,
                    favName: `${value.favName}`,
                    userId: getSessionTokenJson().user.userId,
                  });
                }
                if (!this.refs[`${index}-checkbox`].checked && !isCheck) {
                  newChangedFavList.forEach((value1, index1) => {
                    if (value1.favName === value.favName) {
                      newChangedFavList.splice(index1, 1);
                      return;
                    }
                  });
                }
                if (!this.refs[`${index}-checkbox`].checked && isCheck) {
                  //需要减去（从ture变成false，且最开始是ture）
                  if (value.favList === localVideoId) {
                    alert('the favlist should at least have one video');
                    this.refs[`${index}-checkbox`].checked = true;
                    return;
                  } else if (value.favList.match(eval(`/^${localVideoId},/g`)) != null) {
                    newFavList = newFavList.replace(eval(`/^${localVideoId},/g`), '');
                  } else if (value.favList.match(eval(`/,${localVideoId}$/g`)) != null) {
                    newFavList = newFavList.replace(eval(`/,${localVideoId}$/g`), '');
                  } else if (value.favList.indexOf(`,${localVideoId},`) !== -1) {
                    newFavList = newFavList.replace(`,${localVideoId},`, ',');
                  }
                  newChangedFavList.push({
                    favId: value.favId,
                    favList: `${newFavList}`,
                    favName: `${value.favName}`,
                    userId: getSessionTokenJson().user.userId,
                  });
                }
                this.setState(prevState => ({
                  ...prevState,
                  changedFavList: newChangedFavList
                }));
              }}
            />
          </td>
        <td>
          <div className="fav-list-name">
            {value.favName}
          </div>
        </td>
        <td>
          <div className="fav-list-num">
            {videoIdArr.length}/100
          </div>
        </td>
      </tr>
      );
    });

    const addNewFavList = this.state.isNewFavList ? (
      <tbody className="add-new-fav-list-section">
        <tr>
          <td>
            <input
              className="new-fav-input"
              type="text"
              autoFocus="true"
              ref="favName"
            />
          </td>
          <td>
            <input
              type="button"
              className="confirm-add-btn"
              value="add"
              onClick={() => {
                //改变favlist的state状态，将name和该videoId放进去
                const newItem = {
                  favList: `${this.props.videoId}`,
                  favName: this.refs.favName.value,
                  userId: getSessionTokenJson().user.userId,
                };
                const newFavList = this.state.favList;
                const newChangedFavList = this.state.changedFavList;
                newFavList.push(newItem);
                newChangedFavList.push(newItem);
                this.setState(prevState => ({
                  ...prevState,
                  favList: newFavList,
                  changedFavList: newChangedFavList,
                  isNewFavList: false
                }));
              }}
            />
          </td>
        </tr>
      </tbody>
    ) : (
      <tbody className="add-new-fav-list-section">
        <tr>
          <td>
            <div className="add-new-fav-list-section">
              <div
              className="add-btn"
              onClick={(e) => {
                e.preventDefault();
                this.setState(prevState => ({
                  ...prevState,
                  isNewFavList: true
                }));
              }}
              >
                <MdAdd className="add-icon" />
              </div>make a new favourite list
            </div>
          </td>
        </tr>
      </tbody>
    );

    const addFavDialog = !this.state.favList ? (
      <div className="favlist-loader">
        <PulseLoader color={'#d9d9d9'} />
      </div>
    ) : (
      <div className="modal-dialog modal-lg fav-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add to Favourite List</h4>
            <button type="button" className="close" data-dismiss="modal" onClick={(e) => {e.preventDefault(); this.setState(prevState => ({ ...prevState, favDialogCss: 'notShowDialog', isNewFavList: false })); }}>
                &times;
            </button>
          </div>
          <div className="modal-body">
            <form role="form">
              <table className="fav-list-table">
                <tbody>
                  {favCheckList}
                </tbody>
                  {addNewFavList}
              </table>
              <input className="form-control" type="button" value="submit" onClick={(e) => this.sendChangedFavList(e)} />
            </form>
          </div>
        </div>
      </div>
    );

    return (
      <React.Fragment>
        {favIcon}
        <div className={this.state.favDialogCss} role="dialog">
          {addFavDialog}
        </div>
      </React.Fragment>
    );
  }
}

export default Fav;
