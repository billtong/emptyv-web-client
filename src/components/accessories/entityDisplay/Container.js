import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {VideoBlock} from "./blocks/videoBlock/VideoBlock";
import {Layout} from './Layout';
import CommentBlock from "./blocks/commentBlock/CommentBlock";

export const Container = (props) => {
	const isLoading = props.isLoading ? (
		<div>loading ...</div>
	) : null;
	const error = (props.errMsg && true) ? (
		<div>{props.errMsg}</div>
	) : null;
	const getList = (entityType) => {
		switch (entityType) {
			case "video":
				return props.list.length > 0 ? (
					props.list.map((video, index) => {
						return (
							<VideoBlock videoInfo={video}/>
						);
					})
				) : null;
			case "comment":
				return props.list.length > 0 ? props.list.map((comment, index) => {
					return (
						<CommentBlock key={index} floor={props.totalLength - index} commentInfo={comment}/>
					)
				}) : null;
			default:
				break;
		}
	};
	return (
		<Fragment>
			{isLoading}
			{error}
			<Layout layout={props.layout}>
				{getList(props.entityType)}
			</Layout>
		</Fragment>
	);
};

Container.propTypes = {
	list: PropTypes.arrayOf(PropTypes.object),   //展示的数组
	totalLength: PropTypes.number,              //从后端传来的总长度，用来算评论floor
	isLoading: PropTypes.bool,                  //是否加载
	errMsg: PropTypes.string,                    //错误
	layout: PropTypes.string,                     //布局，grid和list
	entityType: PropTypes.string,                 //video和comment
};

Container.defaultProps = {
	list: [],
	totalLength: 0,
	isLoading: false,
	errMsg: "",
	layout: "grid",
	entityType: "",
};
