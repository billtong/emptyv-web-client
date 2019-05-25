import React, {Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { TalkerOption } from './TalkerOption';
import {grey, height, widthLeft} from "./style";

const Wrapper = styled.div`
  border: 1px ${grey} solid;
  word-wrap: break-word;
  width: ${widthLeft};
  height: ${height};
  overflow-y: auto;
  overflow-x: hide;
`;

const MYul = styled.ul`
	list-style: none;
	padding-inline-start: 0;
`;

export const TalkerTab = (props) => {
	const talkOptionList = (!props.talkerInfoList || props.talkerInfoList.length === 0) ? ( null ) : (
		props.talkerInfoList.map((talker, index) => {
			const handleClick = (e) => {
				e.preventDefault();
				props.changeTalkerSelectedState(index);
			};
			return (
				<li onClick = {e => handleClick(e)}>
					<TalkerOption
						isSelected = {props.talkerSelected === index}
						userInfo = {talker}
					/>
				</li>
			);
		})
	);
	return (
		<Wrapper id ="style-scroll">
			<MYul>{talkOptionList}</MYul>
    </Wrapper>
	);
};

TalkerTab.propTypes = {
	talkerInfoList: PropTypes.arrayOf(PropTypes.object),
	talkerSelected: PropTypes.number,
	changeTalkerSelectedState: PropTypes.func,
};

TalkerTab.defaultProps = {
	talkerInfoList: [],
	talkerSelected: -1,
	changeTalkerSelectedState: undefined,
};
