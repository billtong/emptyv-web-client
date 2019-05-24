import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {VideoBlock} from "./blocks/VideoBlock";

export const Container = (props) => {
	const isLoading = props.isLoading ? (
		<div>loading ...</div>
	) : null;
	const error = (props.errMsg && props.errMsg !== null) ? (
		<div>{props.errMsg}</div>
	) : null;
	const list = props.list.length > 0 ? (
		props.list.map((video, index)=>{
			return (
				<VideoBlock videoInfo={video} />
			);
		})
	) : null;

	return (
		<Fragment>
			{isLoading}
			{error}
			{list}
		</Fragment>
	);
};

Container.propTypes = {
	list: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	errMsg: PropTypes.string,
};

Container.defaultProps = {
	list: [],
	isLoading: false,
	errMsg: "",
};
