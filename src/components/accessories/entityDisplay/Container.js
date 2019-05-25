import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {VideoBlock} from "./blocks/VideoBlock";
import { Layout } from './Layout';
import CommentBlock from "./blocks/CommentBlock";

export const Container = (props) => {
	const isLoading = props.isLoading ? (
		<div>loading ...</div>
	) : null;
	const error = (props.errMsg && props.errMsg !== null) ? (
		<div>{props.errMsg}</div>
	) : null;

	const getList = (entityType) => {
		switch (entityType) {
			case "video":
				return props.list.length > 0 ? (
					props.list.map((video, index)=>{
						return (
							<VideoBlock videoInfo={video} />
						);
					})
				) : null;
			case "comment":
				return props.list.length > 0 ? props.list.map((comment, index) => {
					return (
						<CommentBlock key={index} floor={props.totalLength - index} commentInfo={comment} />
					)}) : null;
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
	list: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	errMsg: PropTypes.string,
	layout: PropTypes.string,
	entityType: PropTypes.string,
};

Container.defaultProps = {
	list: [],
	isLoading: false,
	errMsg: "",
	layout: "grid",
	entityType: "",
};
