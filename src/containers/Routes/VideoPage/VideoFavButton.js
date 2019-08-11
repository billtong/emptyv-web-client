import React from 'react';
import {IoIosHeart} from 'react-icons/io';
import {MdAdd} from 'react-icons/md';
import {PulseLoader} from 'react-spinners';
import {getFavListsByUser, patchFavList, postFavList} from "../../../utils/api/fav";
import {getSessionTokenJson} from "../../../utils/api/apiHelper";
import history from "../../../utils/history";

import "./VideoFavButton.css";
import operation from "../../../assets/operations";

class VideoFavButton extends React.Component {
	state = {
		favDialogCss: 'notShowDialog',         //showDialog and notShowDialog
		userFavLists: [],
		isNewFavList: false,
		changedFavList: [],
		addListIds: [],
		cancelListIds: [],
	};

	handleFavClickAction = (e) => {
		const isUserA = !getSessionTokenJson() || getSessionTokenJson() === null;
		e.preventDefault();
		if (!isUserA) {
			getFavListsByUser({
				userId: getSessionTokenJson().user.id
			}).then(res => {
				this.setState({
					userFavLists: res.data,
					favDialogCss: 'showDialog'
				});
			}).catch((err) => {
				alert(err);
			});
		} else {
			history.push('/login');
		}
	};

	//提交改变的favlist和新建的favlist
	sendChangedFavList = (e) => {
		e.preventDefault();
		this.state.cancelListIds.length > 0 && this.state.cancelListIds.forEach(value => {
			patchFavList({
				id: value,
				videoId: this.props.videoId,
				operation:  operation.CANCEL_FAV_A_VIDEO
			}).then(() => {
				this.props.handleClickAction(e, operation.CANCEL_FAV_A_VIDEO);
				this.setState({
					favDialogCss: 'notShowDialog',
					userFavLists: [],
					isNewFavList: false,
					changedFavList: [],
					addListIds: [],
					cancelListIds: [],
				});
			});
		});
		this.state.addListIds.length > 0 && this.state.addListIds.forEach(value => {
			patchFavList({
				id: value,
				videoId: this.props.videoId,
				operation: operation.FAV_A_VIDEO
			}).then(() => {
				this.props.handleClickAction(e, operation.FAV_A_VIDEO);
				this.setState({
					favDialogCss: 'notShowDialog',
					userFavLists: [],
					isNewFavList: false,
					changedFavList: [],
					addListIds: [],
					cancelListIds: [],
				});
			});
		});
		this.state.changedFavList.length > 0 && this.state.changedFavList.forEach((value, index) => {
			postFavList({
				videoIds: value.videoIds,
				name: value.name,
				isPublic: true
			}).then(() => {
				this.props.handleClickAction(e, operation.FAV_A_VIDEO);
				this.setState({
					favDialogCss: 'notShowDialog',
					userFavLists: [],
					isNewFavList: false,
					changedFavList: [],
					addListIds: [],
					cancelListIds: [],
				});
			});
		});
	};

	//checkbox变换监听
	handleCheckboxOnChange(isCheck, value, index) {
		const newChangedFavList = this.state.changedFavList;
		const newFavList = this.state.userFavLists;
		const addFavListIds = this.state.addListIds;
		const cancelFavListIds = this.state.cancelListIds;
		const localVideoId = this.props.videoId;
		if (this.refs[`${index}-checkbox`].checked) {
			if (!value.id) {
				console.log("1");
				const newVideoIds = value.videoIds;
				newVideoIds.push(localVideoId);
				newChangedFavList.push({
					id: value.id,
					videoIds: newVideoIds,
					name: `${value.name}`,
					userId: getSessionTokenJson().user.id,
				});
				this.setState({
					changedFavList: newChangedFavList,
				});
			} else {
				console.log("2");
				newFavList.forEach((value1, index1) => {
					if (value1.id === value.id) {
						value1.videoIds.push(localVideoId);
						const cancelIndex = cancelFavListIds.indexOf(value.id);
						if (cancelIndex >= 0) {
							cancelFavListIds.splice(cancelIndex, 1);
						} else {
							addFavListIds.push(value1.id);
						}
					}
				});
				this.setState({
					userFavLists: newFavList,
					addListIds: addFavListIds,
				});
			}
		} else {
			if (!value.id) {
				console.log("3");
				newChangedFavList.forEach((value1, index1) => {
					if (value1.name === value.name) {
						newChangedFavList.splice(index1, 1);
					}
				});
				newFavList.forEach((value1, index1) => {
					if (value1.name === value.name) {
						newFavList.splice(index1, 1);
					}
				});
				this.setState({
					userFavLists: newFavList,
					changedFavList: newChangedFavList,
				});
			} else {
				console.log("4");
				newFavList.forEach((value1, index1) => {
					if (value1.id === value.id) {
						value1.videoIds = value1.videoIds.filter(id => id !== localVideoId);
						const addIndex = addFavListIds.indexOf(value1.id)
						if (addIndex >= 0) {
							addFavListIds.splice(addIndex, 1);
						} else {
							cancelFavListIds.push(value1.id);
						}
					}
				});
				this.setState({
					userFavLists: newFavList,
					cancelListIds: cancelFavListIds,
				});
			}
		}
		console.log(newChangedFavList);
		console.log(newFavList);
		console.log(addFavListIds);
		console.log(cancelFavListIds)
	}

	render() {
		//favlist表单，主要是逻辑判断，防止出现不合理的favlist选项
		const favCheckList = !this.state.userFavLists || this.state.userFavLists.length === 0 ? null : this.state.userFavLists.map((value, index) => {
			const videoIdArr = value.videoIds;
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
								this.handleCheckboxOnChange(isCheck, value, index);
							}}
						/>
					</td>
					<td>
						<div className="fav-list-name">
							{value.name}
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
								videoIds: [`${this.props.videoId}`],
								name: this.refs.favName.value,
								userId: getSessionTokenJson().user.id,
							};
							const newFavList = this.state.userFavLists;
							const newChangedFavList = this.state.changedFavList;
							newFavList.push(newItem);
							newChangedFavList.push(newItem);
							this.setState({
								userFavLists: newFavList,
								changedFavList: newChangedFavList,
								isNewFavList: false
							});
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
								this.setState({
									isNewFavList: true
								});
							}}
						>
							<MdAdd className="add-icon"/>
						</div>
						make a new favourite list
					</div>
				</td>
			</tr>
			</tbody>
		);

		const addFavDialog = !this.state.userFavLists ? (
			<div className="favlist-loader">
				<PulseLoader color={'#d9d9d9'}/>
			</div>
		) : (
			<div className="modal-dialog modal-lg fav-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title">Add to Favourite List</h4>
						<button type="button" className="close" data-dismiss="modal" onClick={(e) => {
							e.preventDefault();
							this.setState({
								favDialogCss: 'notShowDialog',
								isNewFavList: false
							});
						}}>
							&times;
						</button>
					</div>
					<div className="modal-body">
						<form>
							<table className="fav-list-table">
								<tbody>
								{favCheckList}
								</tbody>
								{addNewFavList}
							</table>
							<input className="form-control" type="button" value="submit" onClick={(e) => this.sendChangedFavList(e)}/>
						</form>
					</div>
				</div>
			</div>
		);

		return (
			<React.Fragment>
				<div
					style={{color: this.props.hasFav ? 'orange' : 'white'}}
					onClick={e => this.handleFavClickAction(e)}
				>
					<IoIosHeart data-toggle="modal"/>
				</div>
				<div className={this.state.favDialogCss} role="dialog">
					{addFavDialog}
				</div>
			</React.Fragment>
		);
	}
}

export default VideoFavButton;
